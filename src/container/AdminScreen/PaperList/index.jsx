import { useEffect, useState } from "react";
import { deleteReq, getReq } from "../../../utils/apiHandlers";
import { Link, useParams } from "react-router-dom";
import Paper from "../../../components/common/Paper";
import DashboardTemplate from "@components/DashboardTemplate";
import CreatePaperModal from "./components/CreatePaperModal";
import moment from 'moment'
import { reactIcons } from "../../../utils/icons";

const PaperList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [paperData, setPaperData] = useState([]);
  const [open, setOpen] = useState(false);
  const { testId } = useParams();

  console.log("-------------category id ", testId);

  const handleGetPaperList = async () => {
    try {
      setIsLoading(true);
      const response = await getReq(`/paper/?test_ref=${testId}`);
      if (response.status) {
        setPaperData(response.data.results || response.data);
      } else if (!response.status) {
      }
    } catch (err) {
      setIsLoading(false);
      console.log("----------------", err);
    }
  };

  useEffect(() => {
    if (testId) {
      handleGetPaperList();
    }
  }, [testId]);

  const handleDeletePaper = async(id) => {
    const response = await deleteReq(`/paper/${id}`);
    if(response.status){

    }else{

    }
  }


  return (
    <DashboardTemplate>
      <CreatePaperModal open={open} setOpen={setOpen} handleReload={handleGetPaperList} />
      <Paper>
        <div>
         <div className="flex justify-between my-1">
            <h2 className="py-2  text-lg font-semibold">Test Papers</h2>
            <button className="create-btn" onClick={() => setOpen(!open)}>Create</button>
        </div>
          <div className="table_div custom-scroll-sm">
            <table className="default-table ">
              <thead className="position-sticky">
                <th style={{ width: "300px" }}>Test Paper</th>
                <th style={{width:"100px"}}>Type</th>
                <th style={{width:"200px"}}>Total Question</th>
                <th style={{width:"100px"}}>Score</th>
                <th style={{width:"150px"}}>Duration</th>
                <th style={{ width: "200px" }}>Created By</th>
                <th style={{ width: "200px" }}>Created At</th>
                <th style={{ width: "100px" }}>Action</th>
              </thead>
              <tbody>
                {paperData?.map((item, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td style={{ width: "300px" }}>
                          <Link to={`/category-list/test-list/paper-list/section-list/${item.id}`}>
                            {item.paper_name}
                          </Link>
                        </td>
                        <td style={{width:"100px"}}>{item.type}</td>
                        <td style={{width:"200px"}}>{item.total_question}</td>
                        <td style={{width:"100px"}}>{item.max_score}</td>
                        <td style={{width:"150px"}}>{item.duration}</td>
                        <td style={{ width: "200px" }}>{item.created_by}</td>
                        <td style={{width:"200px"}}>{moment(item.created_at).format('DD-MM-YYYY hh:mm A')}</td>
                        <td style={{width:"200px"}}>
                          <div className="flex gap-2">
                            <span className="text-green-500 font-[20px]">{reactIcons.edit}</span>
                            <span className="text-red-500 font-[20px]" onClick={() => handleDeletePaper(item.id)}>{reactIcons.delete}</span>
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                })}
                {/* End tr */}
                {paperData?.length == 0 && (
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

export default PaperList;
