import { useEffect, useState } from "react";
import DashboardTemplate from "../../../components/DashboardTemplate";
import { getReq, postApiReq } from "@utils/apiHandlers";
import Paper from "../../../components/common/Paper";
import CreateSubjectModal from "./components/CreateSubjectModal";
import CreateTopicModal from "./components/CreateTopicModal";
import { toast } from "react-toastify";

const initialState = {
  question_text: "",
  answer_text: "",
  subject_ref: "",
  options: [
    {
      text: "",
      is_correct: false,
    },
  ],
  topic: "",
};

const CreateQuestion = () => {
  const [subjectList, setSubjectList] = useState([]);
  const [form, setForm] = useState(initialState);
  const [open, setOpen] = useState(false);
  const [openTopic, setOpenTopic] = useState(false);
  const [topicList, setTopicList] = useState([]);

  const handleGetSubjectList = async () => {
    try {
      const response = await getReq(`/subject/`);
      if (response.status) {
        setSubjectList(response.data);
      }
    } catch {}
  };

  const handleCreateQuestion = async () => {
    try {
      const response = await postApiReq(`/questions/`, form);
      if(response.status){
        toast.success("Question has been successfully created!")
        setForm(initialState);
      }
    } catch (err) {}
  };

  useEffect(() => {
    handleGetSubjectList();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOption = () => {
    setForm((prev) => ({
      ...prev,
      options: [...prev.options, { text: "", is_correct: false }],
    }));
  };

  const handleRemoveOption = () => {};


  const handleGetTopicList = async() => {
      try{
         const response = await getReq(`/topic/?subject_ref=${form.subject_ref}`);
         if(response.status){
          setTopicList(response.data.data);
         }
      }catch(err){
  
      }
    }
  
    useEffect(() => {
         handleGetTopicList();
    }, [form.subject_ref])

  return (
    <DashboardTemplate>
      <CreateSubjectModal open={open} setOpen={setOpen} handleReload={handleGetSubjectList}  />
      <CreateTopicModal openTopic={openTopic} setOpenTopic={setOpenTopic} handleReload={handleGetTopicList} subjectList={subjectList}  />
      <Paper>
        <div className="p-2">
          <div className="flex gap-2 place-content-between">
           <div className="flex gap-2  items-center  my-2">
            <h1 className="font-bold">Subject</h1>
            <select
              name="subject_ref"
              onChange={handleChange}
              value={form.subject_ref}
              className="border p-1 cursor-pointer rounded-sm"
            > 
              <option value={''}>Select</option>
              {subjectList.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            <button className="create-btn" onClick={() => setOpen(true)} >Create Subject</button>
          </div>
          <div className="flex gap-2  items-center  my-2">
            <h1 className="font-bold">Topic</h1>
            <select
              name="topic"
              onChange={handleChange}
              value={form.topic}
              className="border p-1 cursor-pointer rounded-sm"
            > 
             <option value={""}>Select</option>
              {topicList.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            <button className="create-btn" onClick={() => setOpenTopic(true)} >Create Topic</button>
          </div>
          </div>
          <div>
            <h2 className="font-bold">Question Text</h2>
            <textarea
              className="w-full border p-2"
              name="question_text"
              value={form.question_text}
              onChange={handleChange}
            />
          </div>
          <div className="mt-2">
            <h2 className="font-bold">Options :</h2>
            <div className="flex-col grid-col-2 mt-2">
              {form.options.map((item, index) => {
                return (
                  <div key={index} className="col-span-1">
                    <div>
                      <textarea
                        className="border p-2"
                        value={item.text}
                        onChange={(e) => {
                          const newOptions = [...form.options];
                          newOptions[index] = {
                            ...newOptions[index],
                            text: e.target.value,
                          };
                          setForm((prev) => ({
                            ...prev,
                            options: newOptions,
                          }));
                        }}
                      />
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="checkbox"
                        checked={item.is_correct || false}
                        onChange={(e) => {
                          const newOptions = [...form.options];
                          newOptions[index] = {
                            ...newOptions[index],
                            is_correct: e.target.checked,
                          };
                          setForm((prev) => ({
                            ...prev,
                            options: newOptions,
                          }));
                        }}
                      />
                      <span>Is Correct</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-2">
              <button className="cursor-pointer" onClick={handleAddOption}>
                Add
              </button>
              <button>Remove</button>
            </div>
          </div>
          <div>
            <h2 className="font-bold">Answer</h2>
            <textarea onChange={handleChange} name="answer_text" value={form.answer_text} className="border "/>
          </div>
          <div className="d-flex justify-end">
             <button className="create-btn" onClick={handleCreateQuestion}>Create</button>
          </div>
        </div>
      </Paper>
    </DashboardTemplate>
  );
};

export default CreateQuestion;
