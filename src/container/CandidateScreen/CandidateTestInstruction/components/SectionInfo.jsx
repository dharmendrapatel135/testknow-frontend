import { useEffect, useState } from "react";
import { getReq } from "@utils/apiHandlers";
import { useParams } from "react-router-dom";

const SectionInfo = ({ sectionList }) => {
  return (
    <div>
      <table className="default-table border-1 border-gray-200">
        <thead>
          <th className="w-[100px]">Section #</th>
          <th className="w-[150px]">Section Name</th>
          <th className="w-[150px]">Total Question</th>
          <th className="w-[150px]">Max Score</th>
          <th className="w-[150px]">Time</th>
        </thead>
        <tbody>
          {sectionList.map((item, index) => {
            return (
              <tr key={item.id}>
                <td className="w-[100px]">{index + 1}</td>
                <td className="w-[150px]">{item.section_name}</td>
                <td className="w-[150px]">{item.total_question}</td>
                <td className="w-[150px]">{item.score}</td>
                <td className="w-[150px]">{item.duration}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SectionInfo;
