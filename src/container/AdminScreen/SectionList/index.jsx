import { useEffect, useState } from "react";
import { deleteReq, getReq } from "../../../utils/apiHandlers";
import { Link, useParams } from "react-router-dom";
import Paper from "../../../components/common/Paper";
import DashboardTemplate from "../../../components/DashboardTemplate";
import CreateSectionModal from "./components/CreateSectionModal";
import { reactIcons } from "../../../utils/icons";
import { toast } from "react-toastify";

const SectionList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sectionData, setSectionData] = useState([]);
  const [open, setOpen] = useState(false);
  const { paperId } = useParams();
  const [section, setSection] = useState(null);

  const handleGetSectionList = async () => {
    try {
      setIsLoading(true);
      const response = await getReq(`/paper/section/?paper_ref=${paperId}`);
      if (response.status) {
        setSectionData(response.data.results || response.data);
      } else if (!response.status) {
      }
    } catch (err) {
      setIsLoading(false);
      console.log("----------------", err);
    }
  };

  useEffect(() => {
    if (paperId) {
      handleGetSectionList();
    }
  }, [paperId]);

  const handleDeleteSection = async (id) => {
    try {
      const response = await deleteReq(`/paper/section/${id}/`);
      if (response.status) {
        toast.success("Section has been deleted successfully");
        handleReload();
      }
    } catch (err) {}
  };

  return (
    <DashboardTemplate>
      <Paper>
        <CreateSectionModal
          open={open}
          setOpen={setOpen}
          handleReload={handleGetSectionList}
          section={section}
          setSection={setSection}
        />
        <div>
          <div className="flex justify-between my-1">
            <h2 className="py-2  text-lg font-semibold">Paper Section List</h2>
            <button
              className="create-btn"
              onClick={() => {
                setOpen(true);
                setSection(null);
              }}
            >
              Create
            </button>
          </div>
          <div className="table_div custom-scroll-sm">
            <table className="default-table ">
              <thead className="position-sticky">
                <th style={{ width: "300px" }}>Section Name</th>
                {/* <th style={{width:"100px"}}>Type</th> */}
                <th style={{ width: "200px" }}>Total Question</th>
                <th style={{ width: "100px" }}>Score</th>
                <th style={{ width: "150px" }}>Duration</th>
                <th style={{ width: "200px" }}>Created By</th>
                <th style={{ width: "200px" }}>Created At</th>
                <th style={{ width: "250px" }}>Action</th>
              </thead>
              <tbody>
                {sectionData?.map((item, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td style={{ width: "300px" }}>
                          <Link to={`/section-list/question-list/${item.id}`}>
                            {item.section_name}
                          </Link>
                        </td>
                        {/* <td style={{width:"100px"}}>{item.type}</td> */}
                        <td style={{ width: "200px" }}>
                          {item.total_question}
                        </td>
                        <td style={{ width: "100px" }}>{item.score}</td>
                        <td style={{ width: "150px" }}>{item.duration}</td>
                        <td style={{ width: "200px" }}>{item.created_by}</td>
                        <td style={{ width: "200px" }}>{item.created_at}</td>
                        <td style={{ width: "200px" }}>
                          <div className="flex gap-2">
                            <span
                              className="text-green-500 font-[20px] cursor-pointer"
                              onClick={() => {
                                setOpen(true);
                                setSection(item);
                              }}
                            >
                              {reactIcons.edit}
                            </span>
                            <span
                              className="text-red-500 font-[20px] cursor-pointer"
                              onClick={() => handleDeleteSection(item.id)}
                            >
                              {reactIcons.delete}
                            </span>
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                })}
                {/* End tr */}
                {sectionData?.length == 0 && (
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

export default SectionList;
