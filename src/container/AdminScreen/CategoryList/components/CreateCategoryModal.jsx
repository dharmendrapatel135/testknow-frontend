import { Dialog, DialogContent } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../../../../components/FormElements/Button";
import { postApiReq } from "../../../../utils/apiHandlers";


const initialState = {
   category: "",
    type: "",
}

const CreateCategoryModal = ({ open, setOpen, handleReload }) => {
  const [form, setForm] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateCategory = async () => {
    try {
      setIsLoading(!isLoading);
      const response = await postApiReq(`/category/`, form);
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

  return (
    <Dialog
      open={open}
      // onClose={{}}
      aria-labelledby="responsive-dialog-title"
    >
      <div className="bg-white w-[400px] md:w-[450px] rounded-[20px] ">
        {/* <DialogTitle id="responsive-dialog-title"> */}
        <div className="flex justify-between items-center bg-black h-8 rounded-t-sm  px-3">
          <span className="flex-1 text-center text-white">Create Category</span>
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
              <p>Categroy Name</p>
              <input
                type="text"
                name="category"
                onChange={handleChange}
                value={form.category}
                className="input"
              />
            </div>
            <div>
              <p>Categroy Type</p>
              <input
                type="text"
                name="type"
                className="input"
                onChange={handleChange}
                value={form.type}
              />
            </div>
            <div className="mt-3 flex justify-end">
              <Button name="Create" className={'create-btn'} handleClick={handleCreateCategory} isLoading={isLoading} />
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default CreateCategoryModal;
