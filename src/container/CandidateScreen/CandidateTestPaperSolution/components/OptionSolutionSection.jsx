import { useEffect } from "react";

const OptionSolutionSection = ({
  item,
  setQuestionList,
  questionList,
  currentIndex,
}) => {
  console.log("----------item ", item);
  return (
    <div className="min-width-[50%] max-w-[100%]">
      <div>
        {item?.question.options?.map((_item, index) => {
          console.log(
            "---------------------value ",
            item.selected == item.question.answer_text &&
              item.selected == _item.text
          );
          return (
            <li
              key={index}
              className={`flex gap-3 items-center my-3 p-2 border rounded-sm cursor-pointer ${
                item.selected == item.question.answer_text &&
                item.selected == _item.text
                  ? "border-green-500 text-green-500"
                  : !(item.selected == item.question.answer_text) &&
                    item.selected == _item.text
                  ? "border-red-500 text-red-500"
                  : ""
              }`}
              // onClick={() => {
              //   setQuestionList((prev) =>
              //     prev.map((q, _index) =>
              //       _index === currentIndex ? { ...q, selected:_item.text } : q
              //     )
              //   );
              // }}
              onClick={() => {
                setQuestionList((prev) =>
                  prev.map((q, index) =>
                    index === currentIndex
                      ? { ...q, selected: _item.text } // save selected answer
                      : q
                  )
                );
              }}
            >
              <span className="xl:text-lg text-md cursor-pointer">
                {_item.text}
              </span>
              <p className="xl:text-lg text-md cursor-pointer">
                {_item.text_hindi}
              </p>
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default OptionSolutionSection;
