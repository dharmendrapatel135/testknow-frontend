import QuestionOptionSection from "./QuestionOptionSection";

const QuestionSection = ({
  item,
  count,
  setCount,
  questionList,
  handleSaveCandidateResponse,
  setQuestionAnswer,
  questionAnswer,
  startTime,
  timeLeft,
}) => {
  return (
    <div className="flex w-full">
      {item.que_description &&
      <div className="w-[70%]">
         {item.que_description}
      </div>
      }
      <div className={`${item.que_description ? "w-[30%]" : "w-[100%]"}`}>
      <div>
      <div>
        <h4 className="font-bold font-[20px] mb-2">Q. {count+1} {item.question.question_text}</h4></div>
      <div>
        <QuestionOptionSection
          item={item}
          setQuestionAnswer={setQuestionAnswer}
          questionAnswer={questionAnswer}
          startTime={startTime}
          timeLeft={timeLeft}
        />
      </div>
      </div>
      </div>
    </div>
  );
};

export default QuestionSection;
