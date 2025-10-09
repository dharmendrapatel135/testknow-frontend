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
  question_text_hindi: "",
  que_description: "",
  que_description_hindi: "",
  image: "",
  options: [
    {
      text: "",
      text_hindi: "",
      is_correct: false,
      image: "",
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
    const formData = new FormData();
    formData.append("question_text", form.question_text);
    formData.append("question_text_hindi", form.question_text_hindi);
    formData.append("que_description", form.que_description);
    formData.append("que_description_hindi", form.que_description_hindi);
    formData.append("subject_ref", form.subject_ref);
    formData.append("answer_text", form.answer_text);
    formData.append("topic", form.topic);
    formData.append("image", form.image);
    console.log("-------------options ", form.options);

    //     form.options.forEach((option, index) => {
    //       formData.append(`options[${index}][text]`, option.text);
    //       formData.append(`options[${index}][text_hindi]`, option.text_hindi || '');
    //       formData.append(`options[${index}][is_correct]`, option.is_correct);

    //   // Only append image if it's a valid File (not an empty string)
    //   if (option.image instanceof File) {
    //     formData.append(`options[${index}][image]`, option.image);
    //   }
    // });

  
  const options = form.options.map((opt, index) => {
  return {
    text: opt.text,
    text_hindi: opt.text_hindi || "",
    is_correct: opt.is_correct,
    image_index: index  // To map files later
  };
});

formData.append("options", JSON.stringify(options));

// Attach files separately
form.options.forEach((opt, index) => {
  if (opt.image instanceof File) {
    formData.append(`option_image_${index}`, opt.image);
  }
});

    try {
      const response = await postApiReq(`/questions/`, formData);
      if (response.status) {
        toast.success("Question has been successfully created!");
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
      options: [
        ...prev.options,
        { text: "", is_correct: false, text_hindi: "", image: "" },
      ],
    }));
  };

  const handleRemoveOption = () => {};

  const handleGetTopicList = async () => {
    try {
      const response = await getReq(`/topic/?subject_ref=${form.subject_ref}`);
      if (response.status) {
        setTopicList(response.data.data);
      }
    } catch (err) {}
  };

  useEffect(() => {
    handleGetTopicList();
  }, [form.subject_ref]);

  return (
    <DashboardTemplate>
      <CreateSubjectModal
        open={open}
        setOpen={setOpen}
        handleReload={handleGetSubjectList}
      />
      <CreateTopicModal
        openTopic={openTopic}
        setOpenTopic={setOpenTopic}
        handleReload={handleGetTopicList}
        subjectList={subjectList}
      />
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
                <option value={""}>Select</option>
                {subjectList.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
              <button className="create-btn" onClick={() => setOpen(true)}>
                Create Subject
              </button>
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
              <button className="create-btn" onClick={() => setOpenTopic(true)}>
                Create Topic
              </button>
            </div>
          </div>
           <div>
            <h2 className="font-bold">Question Description</h2>
            <textarea
              className="w-full border p-2"
              name="que_description"
              value={form.que_description}
              onChange={handleChange}
            />
          </div>
          <div>
            <h2 className="font-bold">Question Description Hindi</h2>
            <textarea
              className="w-full border p-2"
              name="que_description_hindi"
              value={form.que_description_hindi}
              onChange={handleChange}
            />
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
          <div>
            <h2 className="font-bold">Question Text Hindi</h2>
            <textarea
              className="w-full border p-2"
              name="question_text_hindi"
              value={form.question_text_hindi}
              onChange={handleChange}
            />
          </div>
          <div>
            <h2 className="font-bold">Question Image</h2>
            <input
              type="file"
              className="w-full border p-2"
              name="image"
              // value={form.}
              onChange={(e) => {
                setForm((prev) => ({ ...prev, image: e.target.files[0] }));
              }}
            />
          </div>
          <div className="mt-2">
            <h2 className="font-bold">Options :</h2>
            <div className="flex-col grid-col-2 mt-2">
              {form.options.map((item, index) => {
                return (
                  <div key={index} className="col-span-1">
                    <div className="flex gap-2">
                    <div>
                      <textarea
                        className="border p-2"
                        placeholder="wirte options in english"
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
                     <div>
                      <textarea
                        className="border p-2"
                        placeholder="write options in hindi"
                        value={item.text_hindi}
                        onChange={(e) => {
                          const newOptions = [...form.options];
                          newOptions[index] = {
                            ...newOptions[index],
                            text_hindi: e.target.value,
                          };
                          setForm((prev) => ({
                            ...prev,
                            options: newOptions,
                          }));
                        }}
                      />
                    </div>
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
            <textarea
              onChange={handleChange}
              name="answer_text"
              value={form.answer_text}
              className="border "
            />
          </div>
          <div className="d-flex justify-end">
            <button className="create-btn" onClick={handleCreateQuestion}>
              Create
            </button>
          </div>
        </div>
      </Paper>
    </DashboardTemplate>
  );
};

export default CreateQuestion;
