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
    <div>
      {testsData.map((item, index) => {
        return(
            <div key={index} className="my-2">
               <h4 className="">{item.category}</h4>
               <div className="flex gap-2 my-2 ">
                {item.test_list.map((_item) => {
                  return(
                    <div key={_item.id} className="shadow p-2 bg-white rounded-sm ">
                        <Link to={`/candidate-test-list/test-paper/${_item.id}`}>
                        <img src={_item.image} style={{width:"60px", height:"40px"}} />
                           <span className="bold">{_item.test}</span>
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
