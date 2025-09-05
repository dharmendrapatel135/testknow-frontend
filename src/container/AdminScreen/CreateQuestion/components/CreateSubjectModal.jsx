
import { Dialog, DialogContent } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../../../../components/FormElements/Button";
import { postApiReq } from "../../../../utils/apiHandlers";


const initialState = {
   name: "",
}

const AddQuestionInSectionModal = ({ open, setOpen, handleReload }) => {
  const [form, setForm] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddQuestion = async () => {
    try {
      setIsLoading(!isLoading);
      const response = await postApiReq(`/subject/`, form);
      setIsLoading(!isLoading)
      if (response.status) {
        toast.success("Subject has been successfully created!");
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
          <span className="flex-1 text-center text-white">Create Subject</span>
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
              <p>Subject Name</p>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={form.name}
                className="input"
              />
            </div>
            <div className="mt-3 flex justify-end">
              <Button name="Create" className={'create-btn'} handleClick={handleAddQuestion} isLoading={isLoading} />
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default AddQuestionInSectionModal;
