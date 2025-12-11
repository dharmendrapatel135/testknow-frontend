import { useEffect, useState } from "react";
import CandidateTestHeader from "../CandidateTestHeader";
import { useParams } from "react-router-dom";
import { getReq, postApiReq, patchReq } from "@utils/apiHandlers";
import QuestionSection from "./components/QuestionSection";
import QuestionOptionSection from "./components/QuestionOptionSection";
import { toast } from "react-toastify";
import ResumeTestModal from "./components/ResumeTestModal";

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
  const [sectionId, setSectionId] = useState(null);
  const [nextSectioncount, setNextSectioncount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState("");
  const [sectionSubmission, setSectionSubmission] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(null); 

  
  // useEffect(() => {
  //   if (sectionList.length > 0) {
  //     handleGetAllQuestionsList();
  //   }
  // }, [sectionList]);

  // const handleSaveCandidateResponse = async (attemptQuesId) => {
  //   questionAnswer["paper"] = paperId;
  //   // questionAnswer["spent_time"] = startTime - timeLeft;
  //   const response = attemptQuesId
  //     ? await patchReq(`/attempt-questions/${attemptQuesId}/`, questionAnswer)
  //     : await postApiReq(`/attempt-questions/`, questionAnswer);

  //   if (response.status) {
  //     let time = timeLeft;
  //     setStartTime(time);
  //     setQuestionAnswer(initialState);
  //     const answerObject = response.data;
  //     setQuestionList((prevList) =>
  //       prevList.map((item) =>
  //         item.question.id === answerObject.question_ref
  //           ? {
  //               ...item,
  //               candidate_answer: answerObject.candidate_answer,
  //               attempt_ques_id: answerObject.id,
  //             }
  //           : item
  //       )
  //     );
  //   }
  // };

  // const handleGetSectionSubmission = async (id, time) => {
  //   const response = await getReq(
  //     `/section-submission-status/?section_ref=${id}`
  //   );
  //   if (response.status) {

  //     if(response.data.data.length  && response.data.data[0]?.status){
  //         setNextSectioncount((prev) => (prev+1))
  //         return;
  //     }
  //     else if (response.data.data.length  && !response.data.data[0]?.status) {
  //       let leftTime = parseInt(response.data.data[0].spent_time);
  //       setSectionSubmission(response.data.data);
  //       let diffTime = time - leftTime;
  //       setTimeLeft(diffTime);
  //       setStartTime(diffTime);
  //     } else {
  //       setTimeLeft(time);
  //       setStartTime(time);
  //     }
  //   }
  // };

  // const handleSectionSubmission = async (submit, resume) => {
  //   let update = [...sectionList];
  //   let section_Id = update[nextSectioncount]?.id;
  //   const updateSection = [...sectionSubmission];
  //   const spend_time =
  //     timeStringToSeconds(update[nextSectioncount]?.duration) - timeLeft;
  //   const data = {
  //     status: timeLeft <= 1 || submit ? true : false,
  //     section_ref: section_Id,
  //     spent_time: spend_time,
  //   };
  //   const response = await (updateSection[nextSectioncount]
  //     ? patchReq(
  //         `/section-submission-status/${updateSection[nextSectioncount]?.id}/`,
  //         data
  //       )
  //     : postApiReq(`/section-submission-status/`, data));
  //   if (response.status) {
  //     if (resume) {
  //       window.close();
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (nextSectioncount) {
  //     handleGetAllQuestionsList();
  //   }
  // }, [nextSectioncount]);

  // function timeStringToSeconds(timeStr) {
  //   const [hours, minutes, seconds] = timeStr.split(":").map(Number);
  //   return hours * 3600 + minutes * 60 + seconds;
  // }

  // useEffect(() => {
  //   // Stop when timeLeft is 0
  //   if (timeLeft <= 0) return;

  //   const timer = setInterval(() => {
  //     setTimeLeft((prevTime) => prevTime - 1);
  //   }, 1000);

  //   // Clear interval on component unmount
  //   return () => clearInterval(timer);
  // }, [timeLeft]);

  // const formatTime = (totalSeconds) => {
  //   const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  //   const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
  //     2,
  //     "0"
  //   );
  //   const seconds = String(totalSeconds % 60).padStart(2, "0");
  //   return `${hours}:${minutes}:${seconds}`;
  // };

  // const handleSubmitPaper = async () => {
  //   let data = {
  //     status: true,
  //     paper_ref: paperId,
  //   };
  //   const response = await postApiReq(`/paper-submission/`, data);
  //   if (response.status) {
  //     toast.success("Test paper has been successfully submitted");
  //     window.location.href = "/dashboard";
  //   } else if (!response.status) {
  //     // window.location.href = "/dashboard";
  //   }
  // };

  // useEffect(() => {
  //   if (timeLeft == 1 && nextSectioncount + 1 == sectionList.length) {
  //     handleSectionSubmission();
  //   } else if (!timeLeft && nextSectioncount < sectionList.length) {
  //     setNextSectioncount((prev) => prev + 1);
  //     let update = [...sectionList];
  //     let time = update[nextSectioncount]?.duration;
  //     let timer = timeStringToSeconds(time);
  //     setTimeLeft(timer);
  //     setStartTime(timer);
  //   }
  //   console.log("-----------next secton count ", nextSectioncount);
  // }, [timeLeft]);


   function timeStringToSeconds(timeStr) {
    if (!timeStr) return 0;
    const [hours, minutes, seconds] = timeStr.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  }

  const formatTime = (totalSeconds) => {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  // ------------- Submit entire paper -------------
  const handleSubmitPaper = async () => {
    const data = {
      status: true,
      paper_ref: paperId,
    };
    const response = await postApiReq(`/paper-submission/`, data);
    if (response.status) {
      toast.success("Test paper has been successfully submitted");
      window.location.href = "/dashboard";
    } else {
      // handle error if needed
    }
  };

  // ------------- INIT: find which section to open on load/resume -------------
  const initTest = async () => {
    try {
      // Clear previous state
      setSectionList([]);
      setCurrentSectionIndex(null);
      setQuestionList([]);
      setSectionSubmission(null);
      setTimeLeft(0);
      setStartTime(0);
      setQuestionAnswer(initialState);

      const response = await getReq(`/paper/section/?paper_ref=${paperId}`);
      if (!response.status) return;

      const sections = response.data || [];
      if (!sections.length) return;

      setSectionList(sections);

      // Determine which section to open:
      // 1) First section with no submission record
      // 2) Or with status = false (in-progress)
      let indexToOpen = null;

      for (let i = 0; i < sections.length; i++) {
        const sec = sections[i];
        const subRes = await getReq(
          `/section-submission-status/?section_ref=${sec.id}`
        );

        if (!subRes.status || !subRes.data.data.length) {
          // Never started
          indexToOpen = i;
          break;
        }
        const submission = subRes.data.data[0];
        if (!submission.status) {
          // In-progress (resume)
          indexToOpen = i;
          break;
        }
        // else submission.status === true => completed, continue loop
      }

      // If all sections completed -> submit paper
      if (indexToOpen === null) {
        await handleSubmitPaper();
        return;
      }

      setCurrentSectionIndex(indexToOpen);
      // The effect on [currentSectionIndex, sectionList] will load everything
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (paperId) {
      initTest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paperId]);

  // ------------- Load a specific section (submission + questions + attempts) -------------
  const loadSection = async (index) => {
    if (index === null) return;
    if (!sectionList.length) return;

    const section = sectionList[index];
    if (!section) return;

    const sectionId = section.id;
    const durationSeconds = timeStringToSeconds(section.duration);

    // Clear previous state to avoid showing old questions
    setQuestionList([]);
    setSectionSubmission(null);
    setQuestionAnswer(initialState);
    setCount(0);

    try {
      // First get submission for this section
      const subRes = await getReq(
        `/section-submission-status/?section_ref=${sectionId}`
      );
      let submission = null;
      if (subRes.status && subRes.data.data.length) {
        submission = subRes.data.data[0];
      }
      setSectionSubmission(submission);

      // Compute remaining time
      let remaining = durationSeconds;
      if (submission && !submission.status) {
        const spent = parseInt(submission.spent_time || 0, 10);
        remaining = Math.max(durationSeconds - spent, 0);
      } else if (submission && submission.status) {
        // section completed (edge), we normally shouldn't open it,
        // but if we do, treat as 0 remaining.
        remaining = 0;
      }

      setTimeLeft(remaining);
      setStartTime(remaining);

      // Then load questions for this section
      const quesRes = await getReq(
        `/section-questions/?section_ref=${sectionId}`
      );
      if (!quesRes.status) return;

      const questions = quesRes.data.data || [];

      // Fetch attempt answers for this section
      const attemptRes = await getReq(
        `/attempt-questions/?section_ref=${sectionId}`
      );

      let merged = questions;
      if (attemptRes.status) {
        const answersArray = attemptRes.data || [];
        merged = questions.map((qObj) => {
          const match = answersArray.find(
            (ans) => ans.question_ref === qObj.question.id
          );
          if (match) {
            return {
              ...qObj,
              attempt_ques_id: match.id,
              candidate_answer: match.candidate_answer,
            };
          }
          return qObj;
        });
      }

      setQuestionList(merged);
    } catch (err) {
      console.error(err);
    }
  };

  // Whenever current section or section list changes, load that section
  useEffect(() => {
    if (
      currentSectionIndex !== null &&
      currentSectionIndex >= 0 &&
      currentSectionIndex < sectionList.length
    ) {
      loadSection(currentSectionIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSectionIndex, sectionList]);

  // ------------- Save candidate answer for a question -------------
  const handleSaveCandidateResponse = async (attemptQuesId) => {
    const payload = {
      ...questionAnswer,
      paper: paperId,
    };

    const response = attemptQuesId
      ? await patchReq(`/attempt-questions/${attemptQuesId}/`, payload)
      : await postApiReq(`/attempt-questions/`, payload);

    if (response.status) {
      const time = timeLeft;
      setStartTime(time);
      const answerObject = response.data;

      setQuestionAnswer(initialState);

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

  // ------------- Section submission (submit or resume) -------------
  const handleSectionSubmission = async (submit = false, resume = false) => {
    if (currentSectionIndex === null || !sectionList.length) return;

    const currentSection = sectionList[currentSectionIndex];
    if (!currentSection) return;

    const currentDuration = timeStringToSeconds(currentSection.duration);
    const existingSubmission = sectionSubmission; // single object or null
    const spend_time = currentDuration - timeLeft;
    const isLastSection =
      currentSectionIndex === sectionList.length - 1;

    const data = {
      status: timeLeft <= 1 || submit ? true : false, // true = completed, false = in-progress
      section_ref: currentSection.id,
      spent_time: spend_time,
    };

    const response = existingSubmission
      ? await patchReq(
          `/section-submission-status/${existingSubmission.id}/`,
          data
        )
      : await postApiReq(`/section-submission-status/`, data);

    if (!response.status) return;

    // Save & Exit (resume = true): save spent_time only
    if (resume) {
      window.close();
      return;
    }

    // If we mark section as completed
    if (data.status) {
      if (isLastSection) {
        // Last section -> submit full paper
        await handleSubmitPaper();
      } else {
        // Move to next section
        setCurrentSectionIndex((prev) => prev + 1);
      }
    }
  };

  // ------------- Global timer -------------
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  // When time hits 0, auto-submit current section (and paper if last)
  useEffect(() => {
    if (!sectionList.length) return;

    if (timeLeft === 0 && currentSectionIndex !== null) {
      // time ended for this section
      handleSectionSubmission(true, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  // ------------- UI -------------
  const totalSections = sectionList.length;
  const sectionNumber =
    currentSectionIndex !== null ? currentSectionIndex + 1 : 0;



  return (
    <div>
      <CandidateTestHeader />
      <ResumeTestModal
        open={open}
        setOpen={setOpen}
        handleSectionSubmission={handleSectionSubmission}
      />
      <div className=" py-2" style={{ height: "75vh" }}>
        {questionList.slice(count, count + 1).map((item, index) => {
          return (
            <div key={item.id} className="grid grid-cols-9 gap-4">
              <div className="lg:col-span-6 xl:col-span-7 ml-2 rounded-md bg-gray-100 p-4 mb-2">
                <div className="flex gap-4 rounded-md ">
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
                <div className="py-2">
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
                          onClick={() => {
                            handleSaveCandidateResponse(item.attempt_ques_id);
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
              <div className="lg:col-span-3 xl:col-span-2 rounded-md mr-2 bg-gray-200 p-4">
                <div className="flex justify-between h-[100px]">
                  <div className="flex">
                    <div className="flex gap-2">
                      <h3>Time Left</h3>
                      <span>{formatTime(timeLeft)}</span>
                    </div>
                  </div>
                  <div>
                    <p className="cursor-pointer" onClick={() => setOpen(true)}>Resume</p>
                  </div>
                  <div>
                    <h4 className="capitalize  font-bold">
                      {sectionList[currentSectionIndex]?.section_name}
                    </h4>
                  </div>
                </div>

                <div className="min-h-[600px] max-h-[750px] p-2 bg-gray-200 overflow-y-auto mb-2">
                  <div className="grid grid-cols-3 gap-4 ">
                    {questionList.map((item, index) => {
                      return (
                        <div
                          className={`text-center ${
                            item.candidate_answer
                              ? "bg-green-600 text-white"
                              : "bg-white"
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
                  <div>
                    <button
                      className="create-btn"
                      onClick={() => {
                        if (sectionList.length == currentSectionIndex + 1) {
                          handleSubmitPaper();
                        } else {
                          handleSectionSubmission(true);
                          setNextSectioncount((prev) => prev + 1);
                        }
                      }}
                    >
                      {sectionList.length == currentSectionIndex + 1
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
