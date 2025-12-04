import { getReq } from "@utils/apiHandlers";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CandidateTestsList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [testsData, setTestsData] = useState([]);

  const handleGetCandidateTestsList = async () => {
    try {
      setIsLoading(true);
      const response = await getReq(`/tests/`);
      setIsLoading(false);
      console.log("----------------response ", response.data);
      if (response.status) {
        setTestsData(response.data);
      } else if (!response.status) {
      }
    } catch (err) {
      setIsLoading(false);
      console.log("------errr ", err);
    }
  };

  useEffect(() => {
    handleGetCandidateTestsList();
  }, []);

  return (
    <div className="my-3">
      {testsData.map((item, index) => {
        console.log("-------------item ", item.category.name);
        return(
            <div key={index} className="my-2 ">
               <h4 className="text-[20px] font-semibold">{item.category.name}</h4>
               <div className="flex flex-wrap gap-3 my-3 ">
                {item.category.test_list.map((_item) => {
                  return(
                    <div key={_item.id} className="shadow p-3 bg-white rounded-sm  w-[280px]">
                        <Link to={`/candidate-test-list/test-paper/${_item.id}`} className="flex gap-2 place-items-center">
                        <img src={_item.image} className="rounded-md" style={{width:"60px", height:"50px", }} />
                           <span className="text-black">{_item.test}</span>
                        </Link>
                    </div>
                  )
                })
                }
               </div>
            </div>
        ) 
      })}
    </div>
  );
};

export default CandidateTestsList;
