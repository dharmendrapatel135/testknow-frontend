import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteReq, getReq, postApiReq } from "../../../utils/apiHandlers";
import Paper from "../../../components/common/Paper";
import DashboardTemplate from "../../../components/DashboardTemplate";
import AddQuestionInSectionModal from "../../../components/common/AddQuestionInSectionModal";

const QuestionLibrary = () => {
  const [questionsData, setQuestionsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [subjectList, setSubjectList] = useState([]);
  const [selectSub, setSelectSub] = useState("");
  const [topicList, setTopicList] = useState([]);
  const [selectTopic, setSelectTopic] = useState("");
  const [open, setOpen] = useState(false);
  const [questionId, setQuestionId] = useState("");
  const [allParam, setAllParam] = useState("");

  const handleGetQuestionList = async (param) => {
    try {
      setIsLoading(true);
      const response = await getReq(`/questions/${param ? param : ""}`);
      setIsLoading(false);
      console.log("-----------responser data", response.data);
      if (response.status) {
        setQuestionsData(response.data.data);
      } else if (!response.status) {
      }
    } catch (err) {
      setIsLoading(false);
    }
  };

  const handleGetSubjectList = async () => {
    const response = await getReq(`/subject/`);
    if (response.status) {
      setSubjectList(response.data);
    }
  };

  useEffect(() => {
    let param = "";
    if (selectSub) {
      param += `?subject_ref=${selectSub}`;
      handleGetQuestionList(param);
    }
    if (selectTopic) {
      param += param ? `&topic=${selectTopic}` : `?topic=${selectTopic}`;
      handleGetQuestionList(param);
    }
    setAllParam(param);
  }, [selectSub, selectTopic]);

  useEffect(() => {
    handleGetQuestionList();
    handleGetSubjectList();
  }, []);

  const handleDeleteQuestion = async (id) => {
    try {
      const response = await deleteReq(`/questions/${id}/`);
      if (response.status) {
        handleGetQuestionList();
      }
    } catch (err) {}
  };

  const handleGetTopicList = async () => {
    try {
      const response = await getReq(`/topic/?subject_ref=${selectSub}`);
      if (response.status) {
        setTopicList(response.data.data);
      }
    } catch (err) {}
  };

  useEffect(() => {
    if (selectSub) {
      handleGetTopicList(allParam);
    }
  }, [selectSub]);

  const handleFileUpload = async (e) => {
    const fileData = e.target.files[0];
    const formData = new FormData();
    formData.append("file", fileData);

    try {
      const response = await postApiReq(`/upload-questions/`, formData);
      if (response.status) {
      }
    } catch (err) {}
  };

  return (
    <DashboardTemplate>
      <AddQuestionInSectionModal
        open={open}
        setOpen={setOpen}
        questionId={questionId}
      />
      <div className="flex justify-between place-items-center my-1 bg-gray-100 rounded-lg px-2">
        <div className="flex gap-3 place-items-center">
          <h2 className="py-2  text-lg font-semibold">Questions Library</h2>
          <select
            onChange={(e) => setSelectSub(e.target.value)}
            className="border-green-200 p-1"
          >
            <option value={""}>Select Subject</option>
            {subjectList.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
          <select
            onChange={(e) => setSelectTopic(e.target.value)}
            className="border-green-200 p-1"
          >
            <option value={""}>Select Topic</option>
            {topicList.map((item) => {
              return (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="d-flex gap-2">
          <button className="create-btn">
            <Link
              className="create-btn"
              to={"/create-question"}
              target="_blank"
            >
              Create
            </Link>
          </button>
          {/* <input type="file" onChange={handleFileUpload} /> */}
        </div>
      </div>
      <div className="mt-3 min-h-[400px] max-h-[750px] overflow-y-auto">
        {questionsData.map((item, index) => {
          return (
            <Paper key={item.id}>
              <div>
                <div className="mb-2">
                  {item.que_description && (
                    <div className="my-2">{item.que_description}</div>
                  )}
                  {item.que_description_hindi && (
                    <div className="my-2">{item.que_description_hindi}</div>
                  )}
                  <h2 className="text-lg font-bold">
                    {index + 1} {item.question_text}
                  </h2>
                  <h2 className="text-lg font-bold">
                    {item.question_text_hindi}
                  </h2>
                </div>
                {item.image && (
                  <div className="my-2">
                    <img src={item.image} />
                  </div>
                )}
                <div className="row-start-2">
                  {item.options.map((_item, index) => {
                    return (
                      <div className="col-span-1">
                        <span
                          className={`${
                            _item.is_corret ? "text-green-800" : ""
                          }`}
                        >
                          {index + 1}. {_item.text}/ {_item.text_hindi}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-end mt-3">
                  <div className="flex gap-2">
                    <button
                      className="create-btn"
                      title="Add in paper section"
                      onClick={() => {
                        setOpen(true);
                        setQuestionId(item.id);
                      }}
                    >
                      Add
                    </button>
                    <button className="update-btn" title="Update Question">
                      Update
                    </button>
                    <button
                      className="delete-btn"
                      title="Delete Question"
                      onClick={() => handleDeleteQuestion(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </Paper>
          );
        })}
      </div>
    </DashboardTemplate>
  );
};

export default QuestionLibrary;
