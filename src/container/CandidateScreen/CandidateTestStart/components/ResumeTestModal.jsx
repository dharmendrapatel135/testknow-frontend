import { Dialog, DialogContent } from "@mui/material";

import Button from "../../../../components/FormElements/Button";
import { reactIcons } from "../../../../utils/icons";



const ResumeTestModal = ({
  open,
  setOpen,
  handleSectionSubmission,
 
}) => {
 

 

  return (
    <Dialog
      open={open}
      aria-labelledby="responsive-dialog-title"
    >
      <div className="bg-white w-[400px] md:w-[450px] rounded-[20px] ">
        <div className="flex justify-between items-center bg-black h-8 rounded-t-sm  px-3">
          <span className="flex-1 text-center text-white">Resume Test</span>
          <div className="w-5 h-5 bg-white flex items-center justify-center rounded-sm">
            <span
              className="text-black cursor-pointer"
              onClick={() => {
               
               
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
                <span>Are you sure you want to resume the test</span>
             </div>
            <div className="mt-3 flex justify-end">
              <Button
                 name="Resume"
                 className="create-btn"
                 handleClick={() => handleSectionSubmission(false, true)}
              />
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default ResumeTestModal;
