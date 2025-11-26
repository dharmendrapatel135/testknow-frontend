import { Dialog, DialogContent, duration } from "@mui/material";
import { useEffect, useState } from "react";
import Button from "../../../../components/FormElements/Button";
import { getReq, postApiReq } from "@utils/apiHandlers";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { deleteReq, patchReq } from "../../../../utils/apiHandlers";
import { reactIcons } from "../../../../utils/icons";

const initialState = {
  section_name: "",
  //   type:"",
  total_question: "",
  score: "",
  duration: "",
  paper_ref: "",
};

const CreateSectionModal = ({ open, setOpen, handleReload, section, setSection }) => {
  const [form, setForm] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { paperId } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreatePaperSection = async () => {
    form["paper_ref"] = paperId;
    try {
      setIsLoading(!isLoading);
      const response = await (section ? patchReq(`/paper/section/${section.id}/`, form) : postApiReq(`/paper/section/`, form));
      setIsLoading(!isLoading);
      if (response.status) {
        toast.success("Section has been successfully created!");
        setOpen(false);
        handleReload();
        setForm(initialState);
      } else if (!response.status) {
      }
    } catch (err) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (section) {
      setForm((prev) => ({
        ...prev,
        section_name: section.section_name,
        total_question: section.total_question,
        score: section.score,
        duration: section.duration.split(":").reduce((acc, time) => 60 * acc + +time),
      }));
    }
  }, [section]);


  return (
    <Dialog
      open={open}
      // onClose={{}}
      aria-labelledby="responsive-dialog-title"
    >
      <div className="bg-white w-[400px] md:w-[450px] rounded-[20px] ">
        {/* <DialogTitle id="responsive-dialog-title"> */}
        <div className="flex justify-between items-center bg-black h-8 rounded-t-sm  px-3">
          <span className="flex-1 text-center text-white">{section ? "Update" :"Create"} Section</span>
          <div className="w-5 h-5 bg-white flex items-center justify-center rounded-sm">
            <span
              className="text-black cursor-pointer"
              onClick={() => {
                // setCode('');
                setForm(initialState);
                setSection(null);
                setOpen(false);
              }}
            >
              {reactIcons.close}
            </span>
          </div>
        </div>
        <DialogContent>
          <div>
            <div>
              <p>Section Name</p>
              <input
                type="text"
                name="section_name"
                onChange={handleChange}
                value={form.section_name}
                className="input"
              />
            </div>
            {/* <div className="my-2">
              <p>Type</p>
              <input
                type="text"
                name="type"
                onChange={handleChange}
                value={form.type}
                className="input"
              />
            </div> */}
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
                name="score"
                className="input"
                onChange={handleChange}
                value={form.score}
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

            <div className="mt-3 flex justify-end">
              <Button
                name={section ? "Update" : "Create"}
                className={section? "update-btn" : "create-btn"}
                handleClick={handleCreatePaperSection}
                isLoading={isLoading}
              />
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default CreateSectionModal;
