import { useSearchParams } from "react-router-dom";

const CandidateTestHeader = () => {
    const [param] = useSearchParams();
    const paperName = param.get("paper_name");
    return(
        <div className="h-[8vh]  flex place-content-center text-white justify-center bg-[#154065]" >
           <div className="flex justify-content-center">
           <div className="flex place-content-center py-4 justify-center">
              <h1 className="font-semibold text-2xl">{paperName}</h1>
           </div>
           {/* <div>Logo</div> */}
           </div>
        </div>
    )
}

export default CandidateTestHeader;