import React, { useEffect, useState } from "react";
import { getReq } from "../../utils/apiHandlers";
import DashboardTemplate from "../../components/DashboardTemplate";
import Button from "../../components/FormElements/Button";
import PurchaseDetailsModal from "./components/PurchaseDetailsModal";
import { toast } from "react-toastify";

const Package = () => {
  const [packageData, setPackageData] = useState([]);
  const [open, setOpen] = useState(false);
  const [packageDetails, setPackageDetails] = useState();
  const [planDetails, setPlanDetails] = useState();

  useEffect(() => {
    handleGetPackageList();
  }, []);

  const handleGetPackageList = async () => {
    try {
      const response = await getReq(`/packages/`);
      console.log("--------------responser ", response);
      if (response.status) {
        setPackageData(response.data);
      }
    } catch (err) {}
  };

  return (
    <DashboardTemplate>
      <div className="my-3">
        <PurchaseDetailsModal
          open={open}
          setOpen={setOpen}
          packageDetails={packageDetails}
          planDetails={planDetails}
        />
        <h1 className="text-black text-[20px] font-semibold">Packages</h1>
        <div className="grid grid-cols-2 gap-3">
          {packageData.map((item) => {
            console.log("--------------item ", item);
            return (
              <div key={item.id} className="col-span-1 rounded-md shadow">
                <div className="p-3">
                  <div className="text-center bg-gray-50 py-2 rounded-md">
                    <h5 className="text-xl text-blue-400 font-semibold">
                      {item.name}
                    </h5>
                  </div>
                  <div>
                    <div>{item.description}</div>
                  </div>
                  <div className="text-center">
                    {item.plans.map((_item) => {
                      return (
                        <div key={_item.id} className="my-2">
                          <div className="flex gap-2">
                            <input
                              type="radio"
                              name="package"
                              onChange={(e) => {
                                setPlanDetails(_item);
                              }}
                            />
                            <strong>
                              {" "}
                              {_item.package_validity} Months validity for :
                              &#8377; {_item.price}
                            </strong>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-end">
                    <Button
                      name="Buy Now"
                      className="create-btn"
                      handleClick={() => {
                        if (planDetails) {
                          setOpen(true);
                          setPackageDetails(item);
                        } else {
                          toast.error("Please select any package");
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardTemplate>
  );
};

export default Package;
