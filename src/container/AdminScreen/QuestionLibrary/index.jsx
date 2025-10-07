import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteReq, getReq } from "../../../utils/apiHandlers";
import Paper from "../../../components/common/Paper";
import DashboardTemplate from "../../../components/DashboardTemplate";
import AddQuestionInSectionModal from "../../../components/common/AddQuestionInSectionModal";

const QuestionLibrary = () => {
  const [questionsData, setQuestionsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [subjectList, setSubjectList] = useState([]);
  const [selectSub, setSelectSub] = useState('');
  const [topicList, setTopicList] = useState([]);
  const [selectTopic, setSelectTopic] = useState('');
  const [open, setOpen] = useState(false);
  const [questionId, setQuestionId] = useState('');


  const handleGetQuestionList = async (param) => {
    try {
      setIsLoading(true);
      const response = await getReq(`/questions/${param ? param : ''}`);
      setIsLoading(false);
      console.log("-----------responser data", response.data);
      if (response.status) {
        setQuestionsData(response.data.data);
      } else if (!response.status) {
      }
    } catch (err) {
      setIsLoading(false);
    }
  };

  const handleGetSubjectList = async () => {
    const response = await getReq(`/subject/`);
    if (response.status) {
      setSubjectList(response.data);
    }
  };

  useEffect(() => {
    let param=''
    if(selectSub){
        param += `?subject_ref=${selectSub}`
        handleGetQuestionList(param);
    }
    if(selectTopic){
      param += param ? `&topic=${selectTopic}` :  `?topic=${selectTopic}`
        handleGetQuestionList(param);
    }
  }, [selectSub, selectTopic])

  useEffect(() => {
    handleGetQuestionList();
    handleGetSubjectList();
  }, []);

  const handleDeleteQuestion = async (id) => {
    try {
      const response = await deleteReq(`/questions/${id}/`);
      if (response.status) {
      }
    } catch (err) {}
  };


   const handleGetTopicList = async() => {
        try{
           const response = await getReq(`/topic/?subject_ref=${selectSub}`);
           if(response.status){
            setTopicList(response.data.data);
           }
        }catch(err){
    
        }
      }
    
      useEffect(() => {
        if(selectSub){
          handleGetTopicList();
        }
      }, [selectSub])

  return (
    <DashboardTemplate>
      <AddQuestionInSectionModal open={open} setOpen={setOpen} questionId={questionId} />
      <div className="flex justify-between my-1 bg-gray-200 px-2">
        <div className="flex gap-3 place-items-center">
          <h2 className="py-2  text-lg font-semibold">Questions List</h2>
          <select onChange={(e) => setSelectSub(e.target.value)}>
            <option value={''}>select Subject</option>
            {subjectList.map((item) => {
              return <option key={item.id} value={item.id}>{item.name}</option>;
            })}
          </select>
          <select onChange={(e) => setSelectTopic(e.target.value)}>
            <option value={''}>Select</option>
            {topicList.map((item) => {
              return <option key={item.id} value={item.name}>{item.name}</option>;
            })}
          </select>
        </div>
        <button className="create-btn">
          <Link className="create-btn" to={'/create-question'} target="_blank">
          Create
          </Link>
          </button>
      </div>
      <div className="mt-3">
        {questionsData.map((item, index) => {
          console.log("----------item ", item)
          return (
            <Paper key={item.id}>
              <div>
                <div className="mb-2">
                  <h2 className="text-lg font-bold">
                    {index + 1} {item.question_text}
                  </h2>
                    <h2 className="text-lg font-bold">
                     {item.question_text_hindi}
                  </h2>
                </div>
                 {item.image &&
                <div className="my-2">
                  <img src={item.image} />
                </div>
                }
                <div className="row-start-2">
                  {item.options.map((_item, index) => {
                    return (
                      <div className="col-span-1">
                        <span
                          className={`${
                            _item.is_corret ? "text-green-800" : ""
                          }`}
                        >
                          {index + 1}. {_item.text}/ {_item.text_hindi}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-end mt-3">
                  <div className="flex gap-2">
                    <button className="create-btn" onClick={() =>{
                       setOpen(true)
                       setQuestionId(item.id)
                       }}>Add</button>
                    <button
                      className="update-btn"
                      
                    >
                      Update
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteQuestion(item.id)} >Delete</button>
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

export default QuestionLibrary;
