import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getReq } from "../../../../utils/apiHandlers";
import Paper from "../../../../components/common/Paper";

const SectionwiseSolution = ({questionList, sectionList, setSectionId, setDetailSolution}) => {


  return (
    <Paper>
      <div className="flex justify-between">
        <div>
        </div>
        <div>
          <select onChange={(e) => setSectionId(e.target.value)}>
            {sectionList.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.section_name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="flex my-1 bg-gray-200 rounded-sm p-2">
        <div className="w-[5%]">
          <h1 className="font-semibold">Q.No</h1>
        </div>
        <div className="w-[70%]">
          <h1 className="font-semibold">Question</h1>
        </div>
        <div className="w-[15%]">
          <span className="font-semibold">Status</span>
        </div>
        <div className="w-[10]">
          <span className="font-semibold">Time (sec)</span>
        </div>
      </div>
      <div className="border-gray-100 p-3 rounded-sm my-2 min-h-[400px]  max-h-[800px] overflow-y-auto">
        {questionList.map((item, index) => {
          return (
            <div
              className={`flex justify-between rounded-sm my-2 p-2 ${
                index % 2 ? "bg-gray-50" : "bg-green-50"
              }`}
              onClick={() => setDetailSolution(true)}
            >
              <div className="w-[5%]">
                <h1 className="">{index + 1}</h1>
              </div>
              <div className="w-[70%] text-overide">
                <h1 className="">{item.question.question_text}</h1>
              </div>
              <div className="w-[15%]">
                <span
                  className={`${
                    item.candidate_answer == item.question.answer_text
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {item.candidate_answer == item.question.answer_text
                    ? "Correct"
                    : "Wrong"}
                </span>
              </div>
              <div className="w-[10%]">
                <span>{item.spent_time ? Number(item.spent_time) : "-"}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Paper>
  );
};

export default SectionwiseSolution;
