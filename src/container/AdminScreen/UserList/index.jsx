import { Link, useParams, useSearchParams } from "react-router-dom";
import DashboardTemplate from "@components/DashboardTemplate";
import { useEffect, useState } from "react";
import { getReq } from "@utils/apiHandlers";
import Paper from "@components/common/Paper";
import moment from "moment";
import { reactIcons } from "../../../utils/icons";
import { deleteReq, postApiReq } from "../../../utils/apiHandlers";
import { toast } from "react-toastify";

const UserList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [open, setOpen] = useState(false);

  const handleGetUserList = async () => {
    try {
      setIsLoading(true);
      const response = await getReq(`/users-list/`);
      console.log("------------test data ", response.data.data);
      if (response.status) {
        setUserData(response.data.results || response.data.data);
      } else if (!response.status) {
      }
    } catch (err) {
      setIsLoading(false);
      console.log("----------------", err);
    }
  };

  useEffect(() => {
    handleGetUserList();
  }, []);

  const handleDelteUser = async (id) => {
    console.log("-----working thiss");
    try {
      const response = await deleteReq(`/user-list/${id}`);
      console.log("-----------responser ", response);
      if (response.status) {
        toast.success("Test has been deleted successfully");
        handleGetUserList();
      }
    } catch (err) {}
  };

  //   const handleFileUpload = async (e) => {
  //     const fileData = e.target.files[0];
  //     const formData = new FormData();
  //     formData.append("file", fileData);

  //     try {
  //       const response = await postApiReq(
  //         `/tests/upload-tests/?category_ref=${categoryId}`,

  //         formData
  //       );
  //       if (response.status) {
  //         handleGetTestList();
  //         toast.success("Test has been successfully uploaded!");
  //       }
  //     } catch (err) {}
  //   };

  return (
    <DashboardTemplate>
      <Paper>
        {/* <DeleteItemModal openDelModal={openDelModal} setOpenDelModal={setOpenDelModal} handleClick={handleDeleteCategory}  /> */}
        <div>
          <div className="flex justify-between my-1">
            <h2 className="py-2  text-lg font-semibold">Users List</h2>
            <div className="flex gap-2 items-center">
              {/* <button
                className="create-btn"
                onClick={() => {
                  setOpen(!open);
                }}
              >
                Create
              </button> */}
              {/* <div className="flex justify-center">
                <label
                  htmlFor="upload"
                  className="cursor-pointer inline-flex items-center justify-center px-2 py-1 bg-[#1967d2] text-white rounded-sm hover:bg-blue-700"
                >
                  Upload Excel
                </label>
                <input
                  type="file"
                  id="upload"
                  onChange={handleFileUpload}
                  // className="hidden"
                  style={{ display: "none" }}
                />
              </div> */}
            </div>
          </div>
          <div className="table_div custom-scroll-sm">
            <table className="default-table ">
              <thead className="position-sticky">
                <th style={{ width: "300px" }}>Email</th>
                <th style={{ width: "300px" }}>Mobile</th>
                <th style={{ width: "300px" }}>Role</th>
                {/* <th style={{ width: "300px" }}>Created At</th>
                <th style={{ width: "250px" }}>Action</th> */}
              </thead>
              <tbody>
                {userData?.map((item, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td style={{ width: "300px" }}>
                          <Link
                            to={`/category-list/test-list/paper-list/${item.id}`}
                          >
                            {item.email}
                          </Link>
                        </td>
                        <td style={{ width: "300px" }}>
                          {item.mobile}
                        </td>
                        <td style={{ width: "300px" }}>{item.role}</td>
                        {/* <td
                          style={{ width: "300px" }}
                          className="text-capitalize truncate "
                        >
                          {moment(item.created_at).format("DD-MM-YYYY hh:mm A")}
                        </td>
                        <td style={{ width: "250px" }}>
                          <div className="flex gap-3">
                            <span
                              className="text-green-500 cursor-pointer"
                              onClick={() => {
                                setTest(item);
                                setOpen(!open);
                              }}
                            >
                              {reactIcons.edit}
                            </span>
                            <span
                              className="text-red-500 cursor-pointer"
                              onClick={() => {
                                // setOpenDelModal(true);
                                handleDelteUser(item.id);
                                // setItemId(item.id);
                              }}
                            >
                              {reactIcons.delete}
                            </span>
                          </div>
                        </td> */}
                      </tr>
                    </>
                  );
                })}
                {/* End tr */}
                {userData?.length == 0 && (
                  <tr className="mt-5 ">
                    <td colSpan={4} className="text-center">
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Paper>
    </DashboardTemplate>
  );
};

export default UserList;
