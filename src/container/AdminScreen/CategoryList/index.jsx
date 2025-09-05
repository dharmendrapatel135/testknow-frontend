import { useEffect, useState } from "react";
import DashboardTemplate from "@components/DashboardTemplate";
import { deleteReq, getReq } from "@utils/apiHandlers";
import Paper from "@components/common/Paper";
import { Link } from "react-router-dom";
import CreateCategoryModal from "./components/CreateCategoryModal";
import moment from "moment";
import DeleteItemModal from "@components/common/DeleteItemModal";
import { toast } from "react-toastify";

const CategoryList = () => {
  const [categoryListData, setCategoryListData] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDelLoading, setIsDelLoading] = useState(false);
  const [openDelModal, setOpenDelModal] = useState(false);
  const [itemId, setItemId] = useState(null);

  
 
  const handleDeleteCategory = async() => {
    try{
      setIsDelLoading(true);
      const response = await deleteReq(`/category/${itemId}/`)
      setIsDelLoading(false)
      if(response.status){
         toast.success("Category has been successfully Deleted!");
         setOpenDelModal(false);
      }
    }catch(err){
      setIsDelLoading(false);
    }
  }


  const handleGetCategoryList = async () => {
    try {
      const response = await getReq("/category/");
      console.log("------------item ", response.data);

      if (response.status) {
        setCategoryListData(response.data);
      }
    } catch (err) {}
  };

  useEffect(() => {
    handleGetCategoryList();
  }, []);

  return (
    <DashboardTemplate>
        <Paper>
          <CreateCategoryModal open={open} setOpen={setOpen} handleReload={handleGetCategoryList} />
          <DeleteItemModal openDelModal={openDelModal} setOpenDelModal={setOpenDelModal} handleClick={handleDeleteCategory}  />
      <div>
        <div className="flex justify-between my-1">
            <h2 className="py-2  text-lg font-semibold">Category List</h2>
            <button className="create-btn" onClick={() => setOpen(!open)}>Create</button>
        </div>
        <div className="table_div custom-scroll-sm">
          <table className="default-table ">
            <thead className="position-sticky">
              <th style={{width:"300px"}}>Category</th>
              <th style={{width:"300px"}}>Type</th>
              <th style={{width:"300px"}}>Created By</th>
              <th style={{width:"300px"}}>Created At</th>
              <th style={{width:"300px"}}>Action</th>
            </thead>
            <tbody>
              {categoryListData?.map((item, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td style={{width:"300px"}}>
                        <Link to={`/category-list/test-list/${item.id}`}>
                          {item.category}
                        </Link>
                        </td>
                      <td style={{width:"300px"}}>{item.type}</td>
                      <td style={{width:"300px"}}>{item.created_by}</td>
                      <td style={{width:"300px"}} className="text-capitalize truncate ">{moment(item.created_at).format("DD-MM-YYYY, hh:mm A")}</td>
                      <td style={{width:"300px"}}>
                        <div className="flex gap-2">
                          <span className="update-btn" >Update</span>
                          <button className="delete-btn" onClick={() => {
                            setOpenDelModal(true)
                            setItemId(item.id);
                            }}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  </>
                );
              })}
              {/* End tr */}
              {categoryListData?.length == 0 && (
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

export default CategoryList;
