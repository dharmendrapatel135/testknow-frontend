import { Dialog, DialogContent } from "@mui/material";
import LoginSection from "./LoginSection";
import RegistrationSection from "./RegistrationSection";
import { reactIcons } from "../../../utils/icons";




const LoginRegModal = ({ open, setOpen, type }) => {
  
  return (
    <Dialog
      open={open}
      // onClose={{}}
      aria-labelledby="responsive-dialog-title"
    >
      <div className="bg-white w-[400px] md:w-[450px] rounded-[20px] ">
        {/* <DialogTitle id="responsive-dialog-title"> */}
        <div className="flex justify-between items-center bg-black h-8 rounded-t-sm py-5 px-3">
          <span className="flex-1 text-center text-white font-semibold">{type}</span>
          <div className="w-5 h-5 bg-white flex items-center justify-center rounded-sm">
            <span
              className="text-black cursor-pointer"
              onClick={() => {
                // setCode('');
                setOpen(false);
              }}
            >
            {reactIcons.close}
            </span>
          </div>
        </div>
        <DialogContent>
          <div>
            {type == "Login"
            ?
             <LoginSection setOpen={setOpen} />
            :   
            <RegistrationSection setOpen={setOpen} />
            }
            {/* <div className="mt-3 flex justify-end">
              <button name="Create" className={'create-btn'} handleClick={handleCreateCategory} isLoading={isLoading} />
            </div> */}
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default LoginRegModal;
