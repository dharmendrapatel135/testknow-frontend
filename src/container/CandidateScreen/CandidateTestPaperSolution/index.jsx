import DashboardTemplate from "@components/DashboardTemplate";
import SectionwiseSolution from "./components/SectionwiseSolution";
import CandidateTestHeader from "../CandidateTestHeader";
import { getReq } from "../../../utils/apiHandlers";
import { useEffect, useState } from "react";
import QuestionSolutionSection from "./components/QuestionSolutionSection";
import { useParams } from "react-router-dom";

const CandidateTestPaperSolution = () => {
  const { paperId } = useParams();
  const [sectionList, setSectionList] = useState([]);
  const [sectionId, setSectionId] = useState(null);
  const [questionList, setQuestionList] = useState([]);
  const [count, setCount] = useState(0);
  const [detailSolution, setDetailSolution] = useState(false);

  const handleGetSectionList = async () => {
    try {
      const response = await getReq(`/paper/section/?paper_ref=${paperId}`);
      if (response.status) {
        setSectionList(response.data);
        // let time = response.data[nextSectioncount]?.duration;
        setSectionId(response.data[0].id);
        // let timer = timeStringToSeconds(time);
        // handleGetSectionSubmission(response.data[0].id, timer);
      }
    } catch (err) {}
  };

  useEffect(() => {
    if (paperId) {
      handleGetSectionList();
    }
  }, [paperId]);

  const handleGetAllQuestionsList = async () => {
    try {
      const response = await getReq(
        `/section-questions/?section_ref=${sectionId}`
      );
      if (response.status) {
        // setQuestionList(response.data.data);
        handleGetAllAttemptQuestionList(response.data.data);
        // handleGetSectionSubmission(section_Id, time);
      }
    } catch (err) {}
  };

  useEffect(() => {
    if (sectionId) {
      handleGetAllQuestionsList();
    }
  }, [sectionId]);

  const handleGetAllAttemptQuestionList = async (data) => {
    const response = await getReq(
      `/attempt-questions/?section_ref=${sectionId}`
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
            spent_time: match.spent_time,
          };
        }
        return questionObj;
      });
      setQuestionList(mergedArray);
    }
  };

  return (
    <div>
      <CandidateTestHeader />
      {detailSolution ?
       <div className=" py-2" style={{ height: "75vh" }}>
        {questionList.slice(count, count + 1).map((item, index) => {
          return (
            <div key={item.id} className="grid grid-cols-7 gap-4">
              <div className="col-span-5 ml-2 rounded-md bg-gray-100 p-4 mb-2">
                <div className="flex gap-4 rounded-md ">
                  <div className="w-full">
                    <QuestionSolutionSection
                      item={item}
                      index={index}
                      count={count}
                      setCount={setCount}
                      questionList={questionList}
                      setQuestionList={setQuestionList}
                      currentIndex={index}
                    //   handleSaveCandidateResponse={handleSaveCandidateResponse}
                    //   setQuestionAnswer={setQuestionAnswer}
                    //   questionAnswer={questionAnswer}
                    //   startTime={startTime}
                    //   timeLeft={timeLeft}
                    />
                  </div>
                </div>
                <div className="py-2">
                  <div className="flex justify-between">
                    <div>
                      {count > 0 && (
                        <button
                          className="bg-blue-800 p-3 rounded-sm  text-white"
                          onClick={() => {
                            setCount((prev) => prev - 1);
                            // setQuestionAnswer(initialState);
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
                          onClick={() => {
                            // handleSaveCandidateResponse(item.attempt_ques_id);
                            if (count + 1 == questionList.length) {
                              setCount(0);
                            }
                          }}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          className="bg-blue-800 p-3 rounded-sm  text-white"
                          onClick={() => {
                            // if (questionAnswer.candidate_answer) {
                            // handleSaveCandidateResponse(item.attempt_ques_id);
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
              <div className="col-span-2 rounded-md mr-2 bg-gray-200 p-4">
                <div className="flex justify-between h-[100px]">
                  <div className="flex">
                    {/* <div className="flex gap-2">
                      <h3>Time Left</h3>
                      <span>{formatTime(timeLeft)}</span>
                    </div> */}
                  </div>
                  {/* <div>
                    <p className="cursor-pointer" onClick={() => setOpen(true)}>Resume</p>
                  </div> */}
                  <div>
                    <select onChange={(e) => setSectionId(e.target.value)}>
                        {sectionList.map((item) => {
                           return(
                            <option key={item.id} value={item.id}>{item.section_name}</option>
                           )
                        })
                        }
                    </select>
                  </div>
                </div>
                <div className="min-h-[300px] max-h-[600px] p-2 bg-gray-200 overflow-y-auto mb-2">
                  <div className="grid grid-cols-4 gap-4 ">
                    {questionList.map((item, index) => {
                      return (
                        <div
                          className={`text-center ${
                            item.candidate_answer == item.question.answer_text
                              ? "bg-green-600 text-white"
                              : item.candidate_answer ? "bg-red-400 text-white" : "bg-white"
                          } flex place-items-center justify-center cursor-pointer rounded-sm col-span-1 h-[50px]`}
                          key={item.id}
                          onClick={() => setCount(index)}
                        >
                          <span className="font-[30px] font-semibold">
                            {index + 1} 
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  {/* <div>
                    <button
                      className="create-btn"
                      onClick={() => {
                        if (sectionList.length == currentSectionIndex + 1) {
                        } else {
                        //   setNextSectioncount((prev) => prev + 1);
                        }
                      }}
                    >
                      {sectionList.length == currentSectionIndex + 1
                        ? "Submit"
                        : "Next Section"}
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      :
      <SectionwiseSolution
        questionList={questionList}
        sectionList={sectionList}
        setSectionId={setSectionId}
        setDetailSolution={setDetailSolution}
      />
      }
    </div>
  );
};

export default CandidateTestPaperSolution;
