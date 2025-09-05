import { Dialog, DialogContent, duration } from "@mui/material";
import { useEffect, useState } from "react";
import Button from "../../../../components/FormElements/Button";
import { getReq, postApiReq } from "@utils/apiHandlers";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";



const CandidatePaperScoreCardModal = ({ open, setOpen, paperDetails }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [scoreCardData, setScoreCardData] = useState([]);

 
  // const handleGetPaperScorecard = async() => {
  //   try{
  //       setIsLoading(true);
  //       const response = await getReq(`/paper-submission/scorecard/?paper_ref=${paperId}`);
  //       setIsLoading(false);
  //       if(response.status){
  //           setScoreCardData(response.data);
  //       }
  //   }catch(err){
  //       setIsLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   if(paperId){
  //       handleGetPaperScorecard();
  //   }
  // }, [paperId])



  return (
    <Dialog
      open={open}
      // onClose={{}}
      aria-labelledby="responsive-dialog-title"
      maxWidth="lg"
      fullWidth={true}
    >
      <div className="rounded-[20px] ">
        {/* <DialogTitle id="responsive-dialog-title"> */}
        <div className="flex justify-between items-center bg-black h-8 rounded-t-sm  px-3">
          <span className="flex-1 text-center text-white">Score Card</span>
          <div className="w-5 h-5 bg-white flex items-center justify-center rounded-sm">
            <span
              className="text-black cursor-pointer"
              onClick={() => {
                // setCode('');
                setOpen(false);
              }}
            >
              X
            </span>
          </div>
        </div>
        <DialogContent>
          <div>
            <div className="flex justify-between flex-wrap my-4">
              <div>
                <h2 className="font-semibold font-xl">Overall Score</h2>
                <span className="font-bold">{paperDetails?.user_score?.total_score}/{paperDetails?.max_score}</span>
              </div>
              <div>
                <h2 className="font-semibold font-xl">Rank</h2>
                <span className="font-bold">{paperDetails?.user_score?.rank}</span>
              </div>
               <div>
                <h2 className="font-semibold font-xl">Attempt Questions</h2>
                <span className="font-bold">{paperDetails?.user_score?.total_attempted_questions}/{paperDetails?.user_score?.total_questions}</span>
              </div>
               <div>
                <h2 className="font-semibold font-xl">Total Spent Time</h2>
                <span className="font-bold">{paperDetails?.user_score?.total_spent_time} Secs</span>
              </div>
              <div>
                <h2 className="font-semibold font-xl">Percentile</h2>
                <span className="font-bold">{paperDetails?.user_score?.percentile}</span>
              </div>
            </div>
            <div>
                <table className="default-table w-full">
                    <thead>
                        <th>Subject</th>
                        <th>Attempt</th>
                        {/* <th>Time</th> */}
                        <th>Score</th>
                        {/* <th>Total Question</th> */}
                        <th>Spent Time</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {paperDetails?.user_score?.sectional_score.map((item) => {
                          return(
                          <tr key={item.section_id}>
                            <td>{item.section_name}</td>
                            {/* <td>{item.duration}</td> */}
                            <td>{item.attempted_questions}/{item.total_questions}</td>
                            <td>{item.section_score}</td>
                            <td>{item.section_spent_time} Secs</td>
                            {/* <td>{item.total_questions}</td> */}
                            <td>view</td>
                          </tr>
                          )
                        })
                        }
                    </tbody>
                </table>
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default CandidatePaperScoreCardModal;
