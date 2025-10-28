import { useEffect } from "react";

const QuestionOptionSection = ({ item, setQuestionAnswer, questionAnswer, startTime, timeLeft }) => {
  return (
    <div className="width-[100vh]">
      <div>
        {item?.question.options?.map((_item, index) => {
          return (
            <li
              key={index}
              className="flex gap-3"
              onClick={() => {
                setQuestionAnswer((prev) => ({
                  ...prev,
                  question_ref: item.question.id,
                  section: item.section,
                  candidate_answer: _item.text,
                  score:_item.is_correct ? 1 : -0.25,
                  spent_time:item.spent_time ? item.spent_time + (startTime - timeLeft) : startTime - timeLeft
                }));
              }}
            >
              {/* <input type="radio" name="answer_text" value={_item.text} onChange={handleChange} checked={item.candidate_answer == _item.text ? true : false} /> */}
              <input
                type="radio"
                name={`answer_${item.question.id}`} // ← unique per question
                checked={((questionAnswer.candidate_answer || item.candidate_answer) == _item.text ? true : false)}
              />
              <span>{_item.text}</span>
              <p>{_item.text_hindi}</p>
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionOptionSection;
