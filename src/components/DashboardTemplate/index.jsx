import { useState } from "react";
import SideBar from "../Sidebar";
import { toast } from "react-toastify";
import { postReq } from "../../utils/apiHandlers";
import { useSelector } from "react-redux";
// import { reactIcons } from "../../utils/icons";

function DashboardTemplate({ active, children }) {
  const [open, setOpen] = useState(false);
  const [openOpt, setOpenOpt] = useState(false);
  const token = useSelector((state) => state.user.userInfo);

    const handleLogout = async() => {
         let data = {
          refresh:token.refresh
    }
          try{
              const response = await postReq(`/logout/`, data);
              if(response.status){
                  Cookies.remove("is_user_token");
                  Cookies.remove("is_user_refresh"); // expires in 1 day
                  // navigate('/dashboard')
                  window.location.href = '/'  
              }else if(!response.status){
                 toast.error(response.error.message);
              }
          }catch(err){
          }
         
      }
  


  return (
    <>
    <div className="grid grid-cols-12">
      <div className="col-span-full md:col-span-12 xl:col-span-12">
        <div className="h-[60px]">
          <div className="flex text-white justify-between items-center px-5" style={{background:"#60B5FF"}}>
            <div className="">
              <h1 className="text-24 lg:text-36 font-extrabold">{active}</h1>
            </div>
            <div className="flex justify-center items-center relative">
              <div className="px-5">
                {/* <SelectField selectClass="bg-bluewhale text-white h-9 p-2 rounded-lg" /> */}
              </div>
              <div
                className="block text-black md:hidden"
                onClick={() => setOpen(true)}
              >
                <p>menu</p>
              </div>
              <div className="hidden md:flex justify-center items-center  py-3">
                <div className="px-2">
                  {/* <img src="/images/icons/dummy.png" alt="prof_img" /> */}
                </div>
                <div className="hidden lg:block">
                  <h1 className="text-20 font-bold">Dummy Jhon</h1>
                  <span className="text-16 text-lightgray">
                    xyz@gmail.com
                  </span>
                  <span onClick={() => setOpenOpt(!openOpt)}>log</span>
                </div>
                {/* <div className="px-2">
                  <img
                    src="/images/icons/expand_more.png"
                    alt="down_arrow"
                    onClick={() => setOpenOpt(!openOpt)}
                  />
                </div> */}
                {openOpt && (
                  <div className="bg-white w-40 h-15 rounded-md top-20 z-30 border-[1px] text-black absolute">
                    <div className="p-5" onClick={handleLogout}>
                      <p>Logout</p>
                    </div>
                  </div>
                )}
              </div>
              {/* <Drawer
                anchor="right"
                PaperProps={{
                  style: {
                    width: '350px',
                    zIndex: 999999,
                  },
                }}
                open={open}
                onClose={() => setOpen(false)}
                className=""
              >
                <SideBar active={active} />
              </Drawer> */}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="flex h-[calc(100vh-80px)]">
      {/* <div className="hidden md:block md:col-span-3   h-[90vh] xl:col-span-2"> */}
        <div className="w-[15%]">
        <div className="">
        <SideBar active={active} />
        </div>
      </div>
      {/* <div className="col-span-9 xl:col-span-10  h-[90vh] overflow-y-auto"> */}
      <div className="w-[85%]">
          <div className="p-5 overflow-y-auto">{children}</div>
      </div>
    </div>
    </>
  );
}

export default DashboardTemplate;