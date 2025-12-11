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
      <div>
      {item.question.que_description &&
      <div className={`${item.question.que_description ? "w-[100%]" : "w-[70%]"} px-2`}>
        <div className="my-2 text-lg">
         {item.question.que_description}
        </div>
        <div className="my-3">
         {item.question.que_description_hindi}
        </div>
      </div>
      }
       {item.question.image &&
        <div>
          <img src={item.question.image} />
        </div>
        }
      </div>
      <div className={`${item.question.que_description ? "w-[100%]" : "w-[100%]"} border rounded-md border-gray-200 px-5 h-[75vh]`}>
      <div>
        <div>
          <h4 className="font-[400] text-lg py-1 mb-2">Q. {count+1} {item.question.question_text}</h4>
        </div>
        {item.question.question_text_hindi &&
         <div className="">
          <h4 className="font-[400] text-md py-1 mb-2 ms-4">{item.question.question_text_hindi}</h4>
        </div>
        }
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
