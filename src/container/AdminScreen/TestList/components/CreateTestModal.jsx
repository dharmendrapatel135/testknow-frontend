import { Dialog, DialogContent } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "../../../../components/FormElements/Button";
import { deleteReq, getReq, patchReq, postApiReq } from "../../../../utils/apiHandlers";
import { reactIcons } from "../../../../utils/icons";


const initialState = {
    title: "",
    category: "",
    image:""
}

const CreateTestModal = ({ open, setOpen, handleReload, test, setTest }) => {
  const [form, setForm] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  const handleChange = (e) => {
    console.log("------------e is working ", e.target.value)
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateTest = async () => {
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('category', form.category);
    if(form.image){
      formData.append('image', form.image);
    }
    try {
      setIsLoading(!isLoading);
      const response = await (test ? patchReq(`/tests/${test.id}/`, formData) : postApiReq(`/tests/`, formData));
      setIsLoading(!isLoading)
      if (response.status) {
        setTest(null);
        toast.success("Test has been successfully created!");
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

  useEffect(() => {
     if(test){
      setForm((prev) => ({...prev, title:test.title, category:test.category_obj.id}))
     }
  }, [test])

  

  return (
    <Dialog
      open={open}
      // onClose={{}}
      aria-labelledby="responsive-dialog-title"
    >
      <div className="bg-white w-[400px] md:w-[450px] rounded-[20px] ">
        {/* <DialogTitle id="responsive-dialog-title"> */}
        <div className="flex justify-between items-center bg-black h-8 rounded-t-sm  px-3">
          <span className="flex-1 text-center text-white">{test ? "Update Test" : "Create Test"}</span>
          <div className="w-5 h-5 bg-white flex items-center justify-center rounded-sm">
            <span
              className="text-black cursor-pointer"
              onClick={() => {
                // setCode('');
                setOpen(false);
                setTest(null);
                setForm({initialState})
              }}
            >
              {reactIcons.close}
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
                    <option key={item.id} value={item.id}>{item.category}</option>
                  )
                })
                }
              </select>
            </div>
            <div>
              <p>Test Icon</p>
              <input
                type="file"
                className="input"
                onChange={(e) => {
                  setForm((prev) => ({...prev, image:e.target.files[0]}))
                }}
              />
            </div>
            <div className="mt-3 flex justify-end">
              <Button name={test ? "Update" : "Create"} className={test ? 'update-btn' : 'create-btn'} handleClick={handleCreateTest} isLoading={isLoading} />
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default CreateTestModal;
