import { Dialog, DialogContent } from "@mui/material";
import { reactIcons } from "../../utils/icons";
// import { reactIcons } from '@utils/icons.js';



const DeleteItemModal = ({ openDelModal, setOpenDelModal, handleClick }) => {
  return (
    <Dialog
      open={openDelModal}
      // onClose={{}}
      aria-labelledby="responsive-dialog-title"
    >
      <div className="bg-white w-[400px] md:w-[450px] rounded-[20px] ">
        {/* <DialogTitle id="responsive-dialog-title"> */}
        <div className="flex justify-between items-center bg-black h-8 rounded-t-sm  px-3">
          <span className="flex-1 text-center text-white">
           
          </span>
          <div className="w-5 h-5 bg-white flex items-center justify-center rounded-sm">
            <span
              className="text-black cursor-pointer"
              onClick={() => {
                setOpenDelModal(false);
              }}
            >
               {reactIcons.close}
            </span>
          </div>
        </div>
        <DialogContent>
          <div>
            <div className="text-center font-semibold">
                <h2>Are you sure ? You want to delete</h2>
            </div>
            <div className="mt-3 flex justify-center gap-3">
              <button  className="delete-btn" onClick={() => handleClick()}  >Yes</button>
              <button  className="update-btn" onClick={() => setOpenDelModal(false)} >No</button>
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default DeleteItemModal;
