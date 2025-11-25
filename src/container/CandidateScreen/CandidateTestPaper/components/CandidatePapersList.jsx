import { getReq } from "@utils/apiHandlers";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CandidatePaperScoreCardModal from "./CandidatePaperScoreCardModal";

const CandidatePapersList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [papersData, setPapersData] = useState([]);
  const [open, setOpen] = useState(false);
  const {testId} = useParams();
  const [paperId, setPaperId] = useState(null);
  const [paperDetails, setPaperDetails] = useState('');


  const handleGetCandidatePapersList = async () => {
    try {
      setIsLoading(true);
      const response = await getReq(`/paper/?test_ref=${testId}`);
      setIsLoading(false);
      if (response.status) {
        setPapersData(response.data);
      } else if (!response.status) {
      }
    } catch (err) {
      setIsLoading(false);
      console.log("------errr ", err);
    }
  };

  useEffect(() => {
    if(testId){
        handleGetCandidatePapersList();
    }
  }, [testId]);

  return (
    <div>
      <CandidatePaperScoreCardModal open={open} setOpen={setOpen}  paperDetails={paperDetails} />
      {papersData.map((item, index) => {
        return(
            <div key={index} className="my-3 shadow-md p-5  rounded-sm">
                <div className="flex justify-between">
                    <strong>
                       {item.paper_name}       
                    </strong>
                    <strong>Max Score {item.max_score}</strong>
                    <strong>Question {item.total_question}</strong>
                    <strong>Time {item.duration}</strong>
                    {item.status ?
                    <div className="w-[200px] text-end">
                    {/* <Link to={`/test-instruction/${item.id}`} className="cursor-pointer" target="_blank">  */}
                    <button className="bg-blue-800 text-white py-2 px-3 rounded-sm" onClick={() =>{
                      setPaperDetails(item);
                      setOpen(true);
                    }}>Solution & Analysis</button>
                    {/* </Link> */}
                    </div>
                    :
                    item.is_purchased ?
                    <div className="w-[200px] text-end">
                    <Link to={`/test-instruction/${item.id}/?paper_name=${item.paper_name}`} className="cursor-pointer" target="_blank"> 
                    <button className="bg-green-600 text-white py-2 px-3 rounded-sm">Start</button>
                    </Link>
                    </div>
                    :
                    <div className="w-[200px] text-end">
                    <Link to={`/package-details`} className="cursor-pointer" target="_blank"> 
                    <button className="bg-blue-500 text-white py-2 px-3 rounded-sm">Buy Now </button>
                    </Link>
                    </div>
                    }
                </div>
            </div>
        ) 
      })}
    </div>
  );
};

export default CandidatePapersList;
