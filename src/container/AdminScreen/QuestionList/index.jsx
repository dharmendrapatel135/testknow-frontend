import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteReq, getReq } from "../../../utils/apiHandlers";
import Paper from "../../../components/common/Paper";
import DashboardTemplate from "../../../components/DashboardTemplate";

const QuestionList = () => {
  const { sectionId } = useParams();
  const [questionData, setQuestionData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetQuestionList = async () => {
    try {
      setIsLoading(true);
      const response = await getReq(`/section-questions/?section_ref=${sectionId}`);
      setIsLoading(false);
      console.log("-----------responser data", response.data);
      if (response.status) {
        setQuestionData(response.data.data);
      } else if (!response.status) {
      }
    } catch (err) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (sectionId) {
      handleGetQuestionList();
    }
  }, [sectionId]);

  const handleDeleteQuestion = async(id) => {
      try{
         const response = await deleteReq(`/questions/${id}/`); 
         if(response.status){
  
         }
      }catch(err){
             
      }
  }

  return (
    <DashboardTemplate>
      <div className="flex justify-between my-1">
        <h2 className="py-2  text-lg font-semibold">Questions List</h2>
        <button className="create-btn">Create</button>
      </div>
      <div>
        {questionData.map((item, index) => {
          return (
            <Paper key={item.id}>
              <div>
                <div>
                  <h2 className="text-lg font-bold">
                    {index + 1} {item.question.question_text}
                  </h2>
                </div>
                <div className="row-start-2">
                  {item.question.options.map((_item, index) => {
                    return (
                      <div className="col-span-1">
                        <span
                          className={`${
                            _item.is_corret ? "text-green-800" : ""
                          }`}
                        >
                          {index + 1}. {_item.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-end mt-3">
                    <div className="flex gap-2">
                    <button className="update-btn" onClick={() => handleDeleteQuestion(item.id)}>Update</button>
                    <button className="delete-btn">Delete</button>
                    </div>
                </div>
              </div>
            </Paper>
          );
        })}
      </div>
    </DashboardTemplate>
  );
};

export default QuestionList;
