import { Link } from "react-router-dom";
import { isActiveLink } from "../../utils/linkActiveChecker";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const menuList = [
  { name: "DASHBOARD", url: "/dashboard", id: "" },
  { name: "CATEGORY LIST", url: "/category-list", id: "" },
  { name: "TESTS", url: "/candidate-test-list", id: "" },
  { name: "QUESTION LIBRARY", url: "/question-library", id: "" },
  // { name: "JOB POSTING", url: "/employers-dashboard/job-posts", id: "" },
  // { name: "APPLICANTS", url: "/employers-dashboard/all-applicants", id: "" },
  // { name: "MY ASSIGN JOBS", url: "/employers-dashboard/my-assign-jobs" },
  // {
  //   name: "CANDIDATE ONBOARDING",
  //   id: "",
  //   url: "/employers-dashboard/candidate-onboarding",
  // },
  // {
  //   name: "REPORTS",
  //   url: "",
  //   id: "reportsDropdown",
  //   options: [
  //     { name: "REPORTS CALENDAR", url: "/employers-dashboard/reports-calendar" },
  //     { name: "JOBS", url: "/employers-dashboard/jobs-report" },
  //     {
  //       name: "JOBS DELEGATION",
  //       url: "/employers-dashboard/jobs-delegation-report",
  //     },
  //     {
  //       name: "SUBMISSION",
  //       url: "/employers-dashboard/client-submission-report",
  //     },
  //     { name: "INTERVIEW", url: "/employers-dashboard/interview-report" },
  //     {
  //       name: "CONFIRMATION & JOINING",
  //       url: "/employers-dashboard/confirmation-joining-report",
  //     },
  //     {
  //       name: "TEAM PERFORMANCE",
  //       url: "/employers-dashboard/team-performance-report",
  //     },
  //     // {
  //     //   name: "RECRUITER",
  //     //   url: "/employers-dashboard/user-wise-report",
  //     // },
  //     // {
  //     //   name: "CLIENT",
  //     //   url: "/employers-dashboard/client-wise-report",
  //     // },
  //     {
  //       name: "MOM",
  //       url: "/employers-dashboard/mom-report",
  //     },
  //   ],
  // },
  // {
  //   name: "PENDING TASK",
  //   url: "",
  //   id: "pendingTaskDropdown",
  //   options: [
  //     {
  //       name: "Submissions Approval",
  //       url: "/employers-dashboard/submissions-approval",
  //     },
  //     {
  //       name: "LinkedIn Profile Approval",
  //       url: "/employers-dashboard/linkedin-profile-approval",
  //     },
  //     // {
  //     //   name: "Contact Manager Approval",
  //     //   url: "/employers-dashboard/contact-manager-approval",
  //     // },
  //   ],
  // },
  // { name: "MORE", url: "", id: "moreOption", options: [] },
];

function MenuList({ active }) {
  const location = useLocation();
  const pathname = location.pathname;
  const userDetails = useSelector((state) => state.user.userInfo);


  const filteredMenuList = menuList.filter((item) => {
    if(userDetails?.role === 'admin' && (item.name == "TESTS")){
     return false
    }else if(userDetails?.role === 'aspirant' && (item.name == "CATEGORY LIST" || item.name == "QUESTION LIBRARY")){
      return false;
    }else {
      return true;
    }
  })


  return (
    <nav className="nav main-menu" style={{ height: "80px" }}>
      <ul className="text-center" id="navbar">
        {filteredMenuList.map((item, index) => (
          <li
            key={index}
            className={`  ${
              isActiveLink(item.url, pathname) ? "active my-2 mx-2 py-2 bg-black" : ""
            } ${item.options ? "dropdown" : ""}`}
            // onClick={() => handleDropdownToggle(item.id)}
          >
            <Link
              to={item.url}
              passHref
              className={`${
                isActiveLink(item.url, pathname)
                  ? "active bg-black text-white rounded-1"
                  : ""
              }`}
            >
              <span
                className={`nav-link ${
                  isActiveLink(item.url, pathname)
                    ? "active text-white fw-600"
                    : "text-black fw-600"
                }`}
              >
                {item.name}
              </span>
            </Link>

            {/* Dropdown Menu for Reports */}
            {/* {item.id == "reportsDropdown" && (
                  <ul
                    className={`dropdown-menu ${
                      openDropdown === item.id ? "show" : ""
                    }`}
                  >
                    {filteredReportOption.map((option, optIndex) => (
                      <li key={optIndex}>
                        <Link href={option.url}>
                          <span className="dropdown-item">{option.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )} */}

            {/* {item.options && item.id == "pendingTaskDropdown" && (
                  <ul
                    className={`dropdown-menu ${
                      openDropdown === item.id ? "show" : ""
                    }`}
                  >
                    {item.options.map((option, optIndex) => (
                      <li key={optIndex}>
                        <Link href={option.url}>
                          <span className="dropdown-item">{option.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )} */}

            {/* Additional Menu (More Options) */}
            {/* {item.id === "moreOption" && (
                  <ul
                    className={`dropdown-menu ${
                      openDropdown === item.id ? "show" : ""
                    }`}
                    style={{ width: "100% !important" }}
                  >
                    {filteredMoreOption.map((option) => (
                      <li key={option.id}>
                        <Link href={option.routePath}>
                          <span className="dropdown-item">{option.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )} */}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default MenuList;
