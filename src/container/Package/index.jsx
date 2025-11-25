import React, { useEffect } from "react";
import { getReq } from "../../utils/apiHandlers";


const Package = () => {

    useEffect(() => {
        handleGetPackageList();
    }, [])

    const handleGetPackageList = async() => {
        try{
            const response = await getReq(`/packages/`);
            console.log("--------------responser ", response);
            if(response.status){
    
            }
        }
        catch(err){

        }
    }

    return(
        <div>
            <h1 className="text-black">
            Package
            </h1>
        </div>
    )
}

export default Package