import { useEffect, useState } from "react";
import { getApiReq, getReq } from "../../../utils/apiHandlers";
import { ScrollCarousel } from "../../../components/common/ScrollCarousel";
import axios from "axios";
import { BASE_URL } from "../../../utils/endpoints";


const Categories = () => {
    const [categoriesData, setCategoriesData] = useState([]);
    const [selectCategory, setSelectCategory] = useState();
    const [testsData, setTestsData] = useState([]);


  const handleGetCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/category/`);

      // DRF usually returns array directly OR paginated results
      console.log("----------------response rdata ", response.data);
      handleGetTestsList(response.data[0]?.id);
      setCategoriesData(
        response.data?.results || response.data?.data || response.data
      );
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

    const handleGetTestsList = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/tests-public/?category_id=${id}`);

      // DRF usually returns array directly OR paginated results
      setTestsData(
        response.data?.results || response.data?.data || response.data
      );
    } catch (error) {
      console.error("Error fetching tests:", error);
    }
  };

  useEffect(() => {
    handleGetCategories();
  }, []);

  // useEffect(() => {

  // }, )


    return(
        <div className="">
           <ScrollCarousel>
             {categoriesData?.map((item) => {
                return(
                    <div key={item.id} className="shadow p-2 bg-gray-600 font-bold text-white rounded-lg cursor-pointer"  onClick={() => handleGetTestsList(item.id)}>
                        {item.category}
                    </div>
                )
             })
             }
           </ScrollCarousel>
           <div className="mt-3 flex gap-4 flex-wrap  w-[1000px]">
            {testsData.map((item) => {
              return(
                 <div key={item.id} className="shadow p-3 bg-blue-50 rounded-md  w-[300px]">
                        <div className="flex gap-2 place-items-center">
                        <img src={item.image_url} className="rounded-md" style={{width:"60px", height:"50px", }} />
                           <span className="text-black">{item.title}</span>
                        </div>
                    </div>
              )
            })

            }
           </div>
        </div> 
    )
}


export default Categories;