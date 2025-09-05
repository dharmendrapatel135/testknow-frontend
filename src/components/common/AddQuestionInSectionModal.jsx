
import { Dialog, DialogContent } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "@components/FormElements/Button";
import { postApiReq } from "@utils/apiHandlers";
import { getReq } from "@utils/apiHandlers";


const initialState = {
   section: "",
   question_id:""
}

const AddQuestionInSectionModal = ({ open, setOpen, handleReload, questionId }) => {
  const [form, setForm] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [paperList, setPaperList] = useState([]);
  const [paperId, setPaperId] = useState('');
  const [sectionList, setSectionList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddQuestion = async () => {
    form["question_id"] = questionId
    try {
      setIsLoading(!isLoading);
      const response = await postApiReq(`/section-questions/`, form);
      setIsLoading(!isLoading)
      if (response.status) {
        toast.success("Question has been successfully added!");
        setOpen(false);
        handleReload();
        setForm(initialState)
      } else if (!response.status) {
      }
    } catch (err) {
        setIsLoading(false);
    }
  };

  const handleGetPaperList = async() => {
     const response = await getReq(`/paper/`);
     if(response.status){
        setPaperList(response.data);
     }
  }

  const handleGetSectionList = async() =>{
    const response = await getReq(`/paper/section/?paper_ref=${paperId}`);
    if(response.status){
        setSectionList(response.data);
    }
  }

  useEffect(() => {
     handleGetPaperList();
  }, [])

  useEffect(() => {
     if(paperId){
        handleGetSectionList();
     }
  },[paperId])


  return (
    <Dialog
      open={open}
      // onClose={{}}
      aria-labelledby="responsive-dialog-title"
    >
      <div className="bg-white w-[400px] md:w-[450px] rounded-[20px] ">
        {/* <DialogTitle id="responsive-dialog-title"> */}
        <div className="flex justify-between items-center bg-black h-8 rounded-t-sm  px-3">
          <span className="flex-1 text-center text-white">Add Question</span>
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
             <p className="font-bold">Paper</p>
              <select
                name=""
                onChange={(e) => setPaperId(e.target.value)}
                className="border rounded-xs w-full"
              >
                {paperList.map((item) => {
                    return(
                        <option key={item.id} value={item.id}>{item.paper_name}</option>
                    )
                })
                }
             </select>
            </div>
            <div className="mt-2">
              <p className="font-bold">Section Name</p>
              <select
                name="section"
                onChange={handleChange}
                value={form.section}
                className="border rounded-xs w-full"
              >
              <option value="">Select</option>
                {sectionList.map((item) => {
                    return(
                        <option key={item.id} value={item.id}>{item.section_name}</option>
                    )
                })
                }
             </select>
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
