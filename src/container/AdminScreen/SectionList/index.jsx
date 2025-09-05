import { useEffect, useState } from "react";
import { getReq } from "../../../utils/apiHandlers";
import { Link, useParams } from "react-router-dom";
import Paper from "../../../components/common/Paper";
import DashboardTemplate from "../../../components/DashboardTemplate";
import CreateSectionModal from "./components/CreateSectionModal";

const SectionList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sectionData, setSectionData] = useState([]);
  const [open, setOpen] = useState(false);
  const { paperId } = useParams();


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
  return (
    <DashboardTemplate>
      <Paper>
        <CreateSectionModal open={open} setOpen={setOpen} handleReload={handleGetSectionList}  /> 
        <div>
         <div className="flex justify-between my-1">
            <h2 className="py-2  text-lg font-semibold">Paper Section List</h2>
            <button className="create-btn" onClick={() => setOpen(true)}>Create</button>
        </div>
          <div className="table_div custom-scroll-sm">
            <table className="default-table ">
              <thead className="position-sticky">
                <th style={{ width: "300px" }}>Section Name</th>
                {/* <th style={{width:"100px"}}>Type</th> */}
                <th style={{width:"200px"}}>Total Question</th>
                <th style={{width:"100px"}}>Score</th>
                <th style={{width:"150px"}}>Duration</th>
                <th style={{ width: "200px" }}>Created By</th>
                <th style={{ width: "200px" }}>Created At</th>
                <th style={{ width: "100px" }}>Action</th>
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
                        <td style={{width:"200px"}}>{item.total_question}</td>
                        <td style={{width:"100px"}}>{item.max_score}</td>
                        <td style={{width:"150px"}}>{item.duration}</td>
                        <td style={{ width: "200px" }}>{item.created_by}</td>
                        <td style={{width:"200px"}}>{item.created_at}</td>
                        <td style={{width:"200px"}}>Action</td>
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
