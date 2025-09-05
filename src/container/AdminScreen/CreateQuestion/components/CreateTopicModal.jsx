
import { Dialog, DialogContent } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "@components/FormElements/Button";
import { getReq, postApiReq } from "@utils/apiHandlers";


const initialState = {
   name: "",
   subject_ref:""
}

const CreateTopicModal = ({ openTopic, setOpenTopic, handleReload, subjectList }) => {
  const [form, setForm] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [topicList, setTopicList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateTopic = async () => {
    try {
      setIsLoading(!isLoading);
      const response = await postApiReq(`/topic/`, form);
      setIsLoading(!isLoading)
      if (response.status) {
        toast.success("Topic has been successfully created!");
        setOpenTopic(false);
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
      open={openTopic}
      aria-labelledby="responsive-dialog-title"
    >
      <div className="bg-white w-[400px] md:w-[450px] rounded-[20px] ">
        {/* <DialogTitle id="responsive-dialog-title"> */}
        <div className="flex justify-between items-center bg-black h-8 rounded-t-sm  px-3">
          <span className="flex-1 text-center text-white">Create Topic</span>
          <div className="w-5 h-5 bg-white flex items-center justify-center rounded-sm">
            <span
              className="text-black cursor-pointer"
              onClick={() => {
                // setCode('');
                setOpenTopic(false);
              }}
            >
              X
            </span>
          </div>
        </div>
        <DialogContent>
          <div>
            <div>
              <p>Topic Name</p>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={form.name}
                className="input"
              />
            </div>
            <div>
              <p>Subject</p>
              <select
                type="text"
                name="subject_ref"
                onChange={handleChange}
                value={form.subject_ref}
                className="input"
              >
                <option value={''}>Select Subject</option>
                {subjectList.map((item) => {
                    return(
                        <option key={item.id} value={item.id}>{item.name}</option>
                    )
                })
                }
            </select>
            </div>
            <div className="mt-3 flex justify-end">
              <Button name="Create" className={'create-btn'} handleClick={handleCreateTopic} isLoading={isLoading} />
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default CreateTopicModal;
