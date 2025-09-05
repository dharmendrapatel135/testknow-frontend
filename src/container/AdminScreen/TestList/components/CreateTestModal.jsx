import { Dialog, DialogContent } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "../../../../components/FormElements/Button";
import { getReq, postApiReq } from "../../../../utils/apiHandlers";


const initialState = {
    title: "",
    category: "",
}

const CreateTestModal = ({ open, setOpen, handleReload }) => {
  const [form, setForm] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  const handleChange = (e) => {
    console.log("------------e is working ", e.target.value)
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateTest = async () => {
    try {
      setIsLoading(!isLoading);
      const response = await postApiReq(`/tests/`, form);
      setIsLoading(!isLoading)
      if (response.status) {
        toast.success("Category has been successfully created!");
        setOpen(false);
        handleReload();
        setForm(initialState)
      } else if (!response.status) {
      }
    } catch (err) {
        setIsLoading(false);
    }
  };

  const handleGetCategoryList = async() => {
    try{
        const response = await getReq(`/category/`);
        if(response.status){
           setCategoryList(response.data);
        } 
    }catch(err){
        console.log("---err", err);
    }
  }

  useEffect(() => {
      handleGetCategoryList();
  }, [])

  console.log("-------------category list ", categoryList);

  return (
    <Dialog
      open={open}
      // onClose={{}}
      aria-labelledby="responsive-dialog-title"
    >
      <div className="bg-white w-[400px] md:w-[450px] rounded-[20px] ">
        {/* <DialogTitle id="responsive-dialog-title"> */}
        <div className="flex justify-between items-center bg-black h-8 rounded-t-sm  px-3">
          <span className="flex-1 text-center text-white">Create Test</span>
          <div className="w-5 h-5 bg-white flex items-center justify-center rounded-sm">
            <span
              className="text-black cursor-pointer"
              onClick={() => {
                // setCode('');
                setOpen(false);
              }}
            >
              X
            </span>
          </div>
        </div>
        <DialogContent>
          <div>
            <div>
              <p>Test Name</p>
              <input
                category="text"
                name="title"
                onChange={handleChange}
                value={form.title}
                className="input"
              />
            </div>
            <div>
              <p>Categroy</p>
              <select
                category="text"
                name="category"
                className="input"
                onChange={handleChange}
                value={form.category}
              >
                <option value={""}>Select</option>
                {categoryList.map((item) => {
                  return(
                    <option key={item.id} value={item.category}>{item.category}</option>
                  )
                })
                }
              </select>
            </div>
            <div className="mt-3 flex justify-end">
              <Button name="Create" className={'create-btn'} handleClick={handleCreateTest} isLoading={isLoading} />
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default CreateTestModal;
