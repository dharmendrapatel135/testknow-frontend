import { Link, useParams, useSearchParams } from "react-router-dom";
import SectionInfo from "./components/SectionInfo";
import { useEffect, useState } from "react";
import { getReq } from "@utils/apiHandlers";
import CandidateTestHeader from "../CandidateTestHeader";

const CandidateTestInstruction = () => {
  const [sectionList, setSectionList] = useState([]);
  const { paperId } = useParams();
  const [param] = useSearchParams();
  const paperName = param.get("paper_name");
  const [lang, setLang] = useState("eng");

  const handleGetSectionList = async () => {
    try {
      const response = await getReq(`/paper/section/?paper_ref=${paperId}`);
      if (response.status) {
        setSectionList(response.data);
        console.log("---------------response r", response.data);
      }
    } catch (err) {}
  };

  useEffect(() => {
    if (paperId) {
      handleGetSectionList();
    }
  }, [paperId]);

  return (
    <div>
      <CandidateTestHeader />
      <div className="grid grid-cols-4 my-3">
      <div className="col-span-3 text-center">
      <div className="border-1 m-4 rounded-md h-[75vh]">
        <div className="py-3">
          <h2 className="font-semibold text-lg">Please read the following instruction carefully</h2>
        </div>
        <div className="p-5">
        <div className="text-left mb-2">
           <h2 className="text-md font-semibold">Total Number of questions : </h2>
           <h2 className="font-semibold text-md">Total available time :</h2>
        </div>
      <SectionInfo sectionList={sectionList} />
      <div className="text-left">
        <h2 className="font-semibold">General Instructions:</h2>
        <ul className="py-2">
          <li>Total of 2 Hours duration will be given to attemp all the questions.</li>
          <li>The clock has been set at the server and the countdown timer at the top right corner of your screen will display the time remaining for you to complete the exam. when the clock runs out the exam ends by default you are not required to end or submit exam.</li>
          <li>The question palette at the right of screen helps you navigate through the questions.</li>
        </ul>
      </div>
        </div>
      </div>
        <div className="flex gap-2 justify-center">
        <div className="flex gap-1">
        <p className="font-semibold">Choose Language :</p>
        <select className="border-1 rounded-md border-black" onChange={(e) => setLang(e.target.value)}>
          <option value={"eng"}>English</option>
          <option value={"hin"}>Hindi</option>
        </select>
        </div>
        <Link to={`/test-instruction/start-test/${paperId}/section/?paper_name=${paperName}&lang=${lang}`}>
          <button className="create-btn px-3 py-2">START</button>
        </Link>
      </div>
      </div>
      <div className="col-span-1 border-left-1">
      <div className="border-1 m-4 rounded-md h-[75vh]">

      </div>
      </div>
      </div>
    
    </div>
  );
};

export default CandidateTestInstruction;
