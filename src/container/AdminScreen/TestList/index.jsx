import { Link, useParams, useSearchParams } from "react-router-dom";
import DashboardTemplate from "@components/DashboardTemplate";
import { useEffect, useState } from "react";
import { getReq } from "@utils/apiHandlers";
import Paper from "@components/common/Paper";
import CreateTestModal from "./components/CreateTestModal";

const TestList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [testData, setTestData] = useState([]);
  const [open, setOpen] = useState(false);
  const { categoryId } = useParams();


  const handleGetTestList = async () => {
    try {
      setIsLoading(true);
      const response = await getReq(`/tests/?category_ref=${categoryId}`);
      if (response.status) {
        setTestData(response.data.results || response.data);
      } else if (!response.status) {
      }
    } catch (err) {
      setIsLoading(false);
      console.log("----------------", err);
    }
  };

  useEffect(() => {
    if (categoryId) {
      handleGetTestList();
    }
  }, [categoryId]);

  return (
    <DashboardTemplate>
      <Paper>
        <CreateTestModal open={open} setOpen={setOpen} handleReload={handleGetTestList} />
        {/* <DeleteItemModal openDelModal={openDelModal} setOpenDelModal={setOpenDelModal} handleClick={handleDeleteCategory}  /> */}
        <div> 
          <div className="flex justify-between my-1">
            <h2 className="py-2  text-lg font-semibold">Test List</h2>
            <button className="create-btn" onClick={() => setOpen(!open)}>Create</button>
        </div>
          <div className="table_div custom-scroll-sm">
            <table className="default-table ">
              <thead className="position-sticky">
                <th style={{ width: "300px" }}>Test</th>
                <th style={{width:"300px"}}>Category</th>
                <th style={{ width: "300px" }}>Created By</th>
                <th style={{ width: "300px" }}>Created At</th>
              </thead>
              <tbody>
                {testData?.map((item, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td style={{ width: "300px" }}>
                          <Link to={`/category-list/test-list/paper-list/${item.id}`}>
                            {item.title}
                          </Link>
                        </td>
                        <td style={{width:"300px"}}>{item.category}</td>
                        <td style={{ width: "300px" }}>{item.created_by}</td>
                        <td
                          style={{ width: "300px" }}
                          className="text-capitalize truncate "
                        >
                          {}
                        </td>
                      </tr>
                    </>
                  );
                })}
                {/* End tr */}
                {testData?.length == 0 && (
                  <tr className="mt-5 ">
                    <td colSpan={4} className="text-center">
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Paper>
    </DashboardTemplate>
  );
};

export default TestList;
