import { useEffect } from "react";
import DashboardTemplate from "@components/DashboardTemplate";
import { getReq } from "@utils/apiHandlers";
import { useSelector } from "react-redux";

const Dashboard = () => {
    const userDetails = useSelector((state) => state.user.userInfo);
    console.log("---------------user details ", userDetails);

  
    return(
        <DashboardTemplate active={"Dashboard"}>
        <div>
            HIi i am the dashboard
        </div>
        </DashboardTemplate>
    )
}

export default Dashboard;