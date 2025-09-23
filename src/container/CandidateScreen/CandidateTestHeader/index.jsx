import { useSearchParams } from "react-router-dom";

const CandidateTestHeader = () => {
    const [param] = useSearchParams();
    const paperName = param.get("paper_name");
    return(
        <div className="h-[8vh] bg-blue-300 flex place-content-center justify-center">
           <div className="flex justify-content-center">
           <div className="flex place-content-center py-4 justify-center">
              <h1 className="font-semibold">{paperName}</h1>
           </div>
           {/* <div>Logo</div> */}
           </div>
        </div>
    )
}

export default CandidateTestHeader;