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
      <SectionInfo sectionList={sectionList} />
      <div>
        <Link to={`/test-instruction/start-test/${paperId}/section/?paper_name=${paperName}`}>
          <button className="bg-blue-800 px-3 py-2">START</button>
        </Link>
      </div>
    </div>
  );
};

export default CandidateTestInstruction;
