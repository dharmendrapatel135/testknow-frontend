import { useEffect, useState } from "react";
import CandidateTestHeader from "../CandidateTestHeader";
import { useParams } from "react-router-dom";
import { getReq, postApiReq, patchReq } from "@utils/apiHandlers";
import QuestionSection from "./components/QuestionSection";
import QuestionOptionSection from "./components/QuestionOptionSection";
import { toast } from "react-toastify";

const initialState = {
  question_ref: "",
  section: "",
  candidate_answer: "",
  spent_time: "",
  paper: "",
};

const CandidateTestStart = () => {
  const [questionList, setQuestionList] = useState([]);
  const [count, setCount] = useState(0);
  const [questionAnswer, setQuestionAnswer] = useState(initialState);
  const [sectionList, setSectionList] = useState([]);
  const { paperId } = useParams();
  const [sectionId, setSectionId] = useState("");
  const [nextSectioncount, setNextSectioncount] = useState(0);
  const [timeLeft, setTimeLeft] = useState();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");


  const handleGetAllQuestionsList = async () => {
    let update = [...sectionList];
    let section_Id = update[nextSectioncount]?.id;
    try {
      const response = await getReq(
        `/section-questions/?section_ref=${section_Id}`
      );
      if (response.status) {
        setQuestionList(response.data.data);
        handleGetAllAttemptQuestionList(response.data.data);
      }
    } catch (err) {}
  };

  const handleGetAllAttemptQuestionList = async (data) => {
    let update = [...sectionList];
    let section_Id = update[nextSectioncount]?.id;
    setCount(0);
    const response = await getReq(
      `/attempt-questions/?section_ref=${section_Id}`
    );
    if (response.status) {
      const questionsArray = data;
      const answersArray = response.data;
      // Merge logic
      const mergedArray = questionsArray.map((questionObj) => {
        const match = answersArray.find(
          (answer) => answer.question_ref === questionObj.question.id
        );
        if (match) {
          return {
            ...questionObj,
            attempt_ques_id: match.id,
            candidate_answer: match.candidate_answer,
          };
        }
        return questionObj;
      });
      setQuestionList(mergedArray);
    }
  };

  useEffect(() => {
    if (sectionList.length > 0) {
      handleGetAllQuestionsList();
    }
  }, [sectionList]);

  // function timeToSeconds(timeStr) {
  //   console.log("--------------time string ", timeStr, startTime, timeStr);
  //   const [hours, minutes, seconds] = timeStr?.split(":").map(Number);
  //   return hours * 3600 + minutes * 60 + seconds;
  // }

  
  
  const handleSaveCandidateResponse = async (attemptQuesId) => {
    console.log("------------start time ", timeLeft);
    questionAnswer["paper"] = paperId;
    // questionAnswer["spent_time"] = startTime - timeLeft;
    const response = attemptQuesId
      ? await patchReq(`/attempt-questions/${attemptQuesId}/`, questionAnswer)
      : await postApiReq(`/attempt-questions/`, questionAnswer);

    if (response.status) {
      let time = timeLeft
      setStartTime(time);
      setQuestionAnswer(initialState);
      const answerObject = response.data;
      setQuestionList((prevList) =>
        prevList.map((item) =>
          item.question.id === answerObject.question_ref
            ? {
                ...item,
                candidate_answer: answerObject.candidate_answer,
                attempt_ques_id: answerObject.id,
              }
            : item
        )
      );
    }
  };

  const handleGetSectionList = async () => {
    try {
      const response = await getReq(`/paper/section/?paper_ref=${paperId}`);
      if (response.status) {
        setSectionList(response.data);
        let time = response.data[nextSectioncount]?.duration;
        setSectionId(response.data[0].id);
        let timer = timeStringToSeconds(time);
        setTimeLeft(timer);
        setStartTime(timer);
      }
    } catch (err) {}
  };

  useEffect(() => {
    if (nextSectioncount) {
      // setSectionId(sectionList(nextSectioncount));
      handleGetAllQuestionsList();
    }
  }, [nextSectioncount]);

  useEffect(() => {
    if (paperId) {
      handleGetSectionList();
    }
  }, [paperId]);

  function timeStringToSeconds(timeStr) {
    const [hours, minutes, seconds] = timeStr.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  }

  useEffect(() => {
    // Stop when timeLeft is 0
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (totalSeconds) => {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleSubmitPaper = async () => {
    let data = {
      status: true,
      paper_ref: paperId,
    };
    const response = await postApiReq(`/paper-submission/`, data);
    if (response.status) {
      toast.success("Test paper has been successfully submitted");
      window.location.href = "/dashboard";
    }else if(!response.status){
      // window.location.href = "/dashboard";
    }
  };

  useEffect(() => {
    if(timeLeft == 1 && nextSectioncount+1 == sectionList.length){
      handleSubmitPaper();  
      //submit paper 
    }
    else if(!timeLeft && nextSectioncount < sectionList.length){
      console.log("---------working this ", nextSectioncount, sectionList.length);
      setNextSectioncount((prev) => prev+1);
      let update = [...sectionList]
      let time = update[nextSectioncount]?.duration;
      let timer = timeStringToSeconds(time);
      setTimeLeft(timer);
      setStartTime(timer);
    }
  }, [timeLeft]);


  return (
    <div>
      <CandidateTestHeader />
      <div className=" py-2" style={{height:"75vh"}}>
        {questionList.slice(count, count + 1).map((item, index) => {
          return (
            <div key={item.id} className="grid grid-cols-7 gap-4" >
              <div className="col-span-5 bg-gray-100 p-4">
                <div className="flex gap-4">
                  <div className="w-full">
                    <QuestionSection
                      item={item}
                      index={index}
                      count={count}
                      setCount={setCount}
                      questionList={questionList}
                      handleSaveCandidateResponse={handleSaveCandidateResponse}
                      setQuestionAnswer={setQuestionAnswer}
                      questionAnswer={questionAnswer}
                      startTime={startTime}
                      timeLeft={timeLeft}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between">
                    <div>
                      {count > 0 && (
                        <button
                          className="bg-blue-800 p-3 rounded-sm  text-white"
                          onClick={() => {
                            setCount((prev) => prev - 1);
                            setQuestionAnswer(initialState);
                          }}
                        >
                          Prev
                        </button>
                      )}
                    </div>
                    <div>
                      {count + 1 == questionList.length ? (
                        <button
                          className="bg-blue-800 p-3 rounded-sm  text-white"
                          onClick={() =>{
                            handleSaveCandidateResponse(item.attempt_ques_id)
                            if(count+1 == questionList.length){
                               setCount(0);
                            }
                          }
                          }
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          className="bg-blue-800 p-3 rounded-sm  text-white"
                          onClick={() => {
                            // if (questionAnswer.candidate_answer) {
                            handleSaveCandidateResponse(item.attempt_ques_id);
                            // }
                              setCount((prev) => prev + 1);
                            
                          }}
                        >
                          Save & Next
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-2 bg-gray-200 p-4">
                <div className="flex justify-between h-[100px]">
                  <div className="flex">
                    <div className="flex gap-2">
                      <h3>Time Left</h3>
                      <span>{formatTime(timeLeft)}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="capitalize  font-bold">
                    {sectionList[nextSectioncount]?.section_name}
                    </h4>
                  </div>
                </div>
                <div className="h-[600px] p-2 bg-gray-200 overflow-y-scroll mb-2">
                <div className="grid grid-cols-4 gap-4 ">
                  {questionList.map((item, index) => {
                    return (
                      <div
                        className={`text-center ${item.candidate_answer ? "bg-green-600 text-white" :'bg-white'} flex place-items-center justify-center cursor-pointer rounded-sm col-span-1 h-[50px]`}
                        key={item.id}
                        onClick={() => setCount(index)}
                      >
                        <span className="font-[30px] font-semibold">{index + 1}</span>
                      </div>
                    );
                  })}
                </div>
                </div>
                <div>
                  <div>
                    <button
                      className="create-btn"
                      onClick={() => {
                        if (sectionList.length == nextSectioncount + 1) {
                          handleSubmitPaper();
                        } else {
                          setNextSectioncount((prev) => prev + 1);
                        }
                      }}
                    >
                      {sectionList.length == nextSectioncount + 1
                        ? "Submit"
                        : "Next Section"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* <div>
        Footer
      </div> */}
    </div>
  );
};

export default CandidateTestStart;
