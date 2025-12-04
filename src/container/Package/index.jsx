import React, { useEffect, useState } from "react";
import { getReq } from "../../utils/apiHandlers";
import DashboardTemplate from "../../components/DashboardTemplate";
import Button from "../../components/FormElements/Button";


const Package = () => {
    const [packageData, setPackageData] = useState([]);

    useEffect(() => {
        handleGetPackageList();
    }, [])

    const handleGetPackageList = async() => {
        try{
            const response = await getReq(`/packages/`);
            console.log("--------------responser ", response);
            if(response.status){
               setPackageData(response.data);
            }
        }
        catch(err){

        }
    }

    return(
         <DashboardTemplate>
            <div className="my-3">
            <h1 className="text-black text-[20px] font-semibold">
            Packages
            </h1>
            <div className="grid grid-cols-2 gap-3">
                {packageData.map((item) => {
                    return(
                        <div key={item.id} className="col-span-1 rounded-md shadow">
                            <div className="p-3">
                             <div  className="text-center bg-gray-50 py-2 rounded-md">
                                <h5 className="text-xl text-blue-400 font-semibold">{item.name}</h5>
                             </div>
                             <div>
                                <div>{item.description}</div>
                             </div>
                             <div className="text-center">
                                {item.plans.map((_item) => {
                                   return(
                                    <div key={_item.id} className="my-2">
                                       <div className="flex gap-2">
                                        <input type="radio" />
                                        <p><strong>{_item.price}</strong> {_item.package_validity}</p>
                                       </div>
                                    </div>
                                   )
                                })
                                }
                             </div>
                             <div className="flex justify-end">
                                <Button name="Buy Now" className="create-btn" />
                             </div>
                            </div>
                        </div>
                    )
                })
                }
            </div>
            </div>
         </DashboardTemplate>
    )
}

export default Package