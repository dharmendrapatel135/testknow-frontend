import DashboardTemplate from "@components/DashboardTemplate"
import Paper from "../../../components/common/Paper";
import CandidateTestsList from "./components/CandidateTestsList";

const CandidateTests = () => {
    
    
    return(
        <DashboardTemplate>
          <div>
            <CandidateTestsList /> 
          </div>
        </DashboardTemplate>
    )
}

export default CandidateTests;  