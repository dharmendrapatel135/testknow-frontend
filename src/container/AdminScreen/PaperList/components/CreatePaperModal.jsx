import { Dialog, DialogContent, duration } from "@mui/material";
import { useEffect, useState } from "react";
import Button from "../../../../components/FormElements/Button";
import { getReq, postApiReq } from "@utils/apiHandlers";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const initialState = {
  paper_name: "",
  type: "",
  total_question: "",
  max_score: "",
  duration: "",
  test_ref: "",
  paper_status:"Pending"
};

const CreatePaperModal = ({ open, setOpen, handleReload }) => {
  const [form, setForm] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const { testId } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreatePaper = async () => {
    form["test_ref"] = testId;
    try {
      setIsLoading(!isLoading);
      const response = await postApiReq(`/paper/`, form);
      setIsLoading(!isLoading);
      if (response.status) {
        toast.success("Category has been successfully created!");
        setOpen(false);
        handleReload();
        setForm(initialState);
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
              <p>Paper Name</p>
              <input
                type="text"
                name="paper_name"
                onChange={handleChange}
                value={form.paper_name}
                className="input"
              />
            </div>
            <div className="my-2">
              <p>Type</p>
              <input
                type="text"
                name="type"
                onChange={handleChange}
                value={form.type}
                className="input"
              />
            </div>
            <div className="my-2">
              <p>Total Question</p>
              <input
                type="text"
                name="total_question"
                onChange={handleChange}
                value={form.total_question}
                className="input"
              />
            </div>
            <div className="my-2">
              <p>Maximum Score</p>
              <input
                type="text"
                name="max_score"
                className="input"
                onChange={handleChange}
                value={form.max_score}
              />
            </div>
            <div className="my-2">
              <p>Time (In seconds)</p>
              <input
                type="text"
                name="duration"
                placeholder="like 1 min 60 sec than 60 min 3600"
                className="input"
                onChange={handleChange}
                value={form.duration}
              />
            </div>
            <div>
              <p>Paper Status</p>
              <select
                type="text"
                name="paper_status"
                onChange={handleChange}
                value={form.paper_status}
                className="input"
              >
                <option value={"Pending"}>Pending</option>
                <option value={"Inprogress"}>Inprogress</option>
                <option value={"Complete"}>Complete</option>
              </select>
            </div>

            <div className="mt-3 flex justify-end">
              <Button
                name="Create"
                className={"create-btn"}
                handleClick={handleCreatePaper}
                isLoading={isLoading}
              />
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default CreatePaperModal;
