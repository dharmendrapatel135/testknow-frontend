import { useEffect } from "react";
import DashboardTemplate from "../../../components/DashboardTemplate";
import { getReq } from "../../../utils/apiHandlers";

const PackagePurchaseHistory = () => {

    const handleGetUserPackagePurchaseHis = async() => {
        try{
            const response = await getReq(`/buy/`);
            if(response.status){
                 console.log("----------purchase histoyr ", response);
            }
        }catch(err){

        }
    } 

    useEffect(() => {
        handleGetUserPackagePurchaseHis();
    }, [])


    return(
        <DashboardTemplate>
            <div>

            </div>
        </DashboardTemplate>
    )
}

export default PackagePurchaseHistory;