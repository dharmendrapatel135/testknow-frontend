import { Link, useParams, useSearchParams } from "react-router-dom";
import DashboardTemplate from "@components/DashboardTemplate";
import { useEffect, useState } from "react";
import { getReq } from "@utils/apiHandlers";
import Paper from "@components/common/Paper";
import CreateTestModal from "./components/CreateTestModal";
import moment from "moment";
import { reactIcons } from "../../../utils/icons";
import { deleteReq } from "../../../utils/apiHandlers";
import { toast } from "react-toastify";

const TestList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [testData, setTestData] = useState([]);
  const [open, setOpen] = useState(false);
  const { categoryId } = useParams();
  const [test, setTest] = useState();

  const handleGetTestList = async () => {
    try {
      setIsLoading(true);
      const response = await getReq(`/tests/?category_ref=${categoryId}`);
      console.log("------------test data ", response.data);
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
  

  const handleDelteTest = async(id) => {
    console.log("-----working thiss")
      try{
        const response = await deleteReq(`/tests/${id}`);
        console.log("-----------responser ", response);
        if(response.status){
             toast.success('Test has been deleted successfully')  
             handleGetTestList();
        }
      }catch(err){
  
      }
    }

  return (
    <DashboardTemplate>
      <Paper>
        <CreateTestModal
          open={open}
          setOpen={setOpen}
          handleReload={handleGetTestList}
          test={test}
          setTest={setTest}
        />
        {/* <DeleteItemModal openDelModal={openDelModal} setOpenDelModal={setOpenDelModal} handleClick={handleDeleteCategory}  /> */}
        <div>
          <div className="flex justify-between my-1">
            <h2 className="py-2  text-lg font-semibold">Test List</h2>
            <button className="create-btn" onClick={() =>{
               setOpen(!open)
               }}>
              Create
            </button>
          </div>
          <div className="table_div custom-scroll-sm">
            <table className="default-table ">
              <thead className="position-sticky">
                <th style={{ width: "300px" }}>Test</th>
                <th style={{ width: "300px" }}>Category</th>
                <th style={{ width: "300px" }}>Created By</th>
                <th style={{ width: "300px" }}>Created At</th>
                <th style={{ width: "250px" }}>Action</th>
              </thead>
              <tbody>
                {testData?.map((item, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td style={{ width: "300px" }}>
                          <Link
                            to={`/category-list/test-list/paper-list/${item.id}`}
                          >
                            {item.title}
                          </Link>
                        </td>
                        <td style={{ width: "300px" }}>
                          {item.category_obj.category}
                        </td>
                        <td style={{ width: "300px" }}>{item.created_by}</td>
                        <td
                          style={{ width: "300px" }}
                          className="text-capitalize truncate "
                        >
                          {moment(item.created_at).format("DD-MM-YYYY hh:mm A")}
                        </td>
                        <td style={{ width: "250px" }}>
                          <div className="flex gap-3">
                            <span
                              className="text-green-500 cursor-pointer"
                              onClick={() => {
                                setTest(item);
                                setOpen(!open);
                              }}
                            >
                              {reactIcons.edit}
                            </span>
                            <span
                              className="text-red-500 cursor-pointer"
                              onClick={() => {
                                // setOpenDelModal(true);
                                handleDelteTest(item.id);
                                // setItemId(item.id);
                              }}
                            >
                              {reactIcons.delete}
                            </span>
                          </div>
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
