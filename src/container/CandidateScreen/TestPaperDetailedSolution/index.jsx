import CandidateTestHeader from "../CandidateTestHeader";
import QuestionSection from "../CandidateTestStart/components/QuestionSection";
import QuestionSolutionSection from "./components/QuestionSolutionSection";

const TestPaperDetailedSolution = () => {
    return(
        <div>
          <CandidateTestHeader />
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
                                // handleSaveCandidateResponse={handleSaveCandidateResponse}
                                setQuestionAnswer={setQuestionAnswer}
                                questionAnswer={questionAnswer}
                                // startTime={startTime}
                                // timeLeft={timeLeft}
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
                        <div className="col-span-2 rounded-md mr-2 bg-gray-200 p-4">
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
          
                          <div className="h-[600px] p-2 bg-gray-200 overflow-y-scroll mb-2">
                            <div className="grid grid-cols-4 gap-4 ">
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
        </div>
    )
}

export default TestPaperDetailedSolution;