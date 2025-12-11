import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginRegModal from "./components/LoginRegModal";

const Landing = ()=>{
    const [open, setOpen] = useState(false);
    const [type, setType] = useState('Registration');
    return(
        <div className="text-gray-700 w-full h-[100vh]">
            <div  className="p-5 bg-[#60B5FF]" >
            <div className="flex justify-between align-items-center" >
             <div>
                <h1 className="text-xl font-bold text-orange-300">Test Know</h1>
             </div>
             <LoginRegModal open={open} setOpen={setOpen} type={type} />
             <div className="flex gap-2">
                {/* <Link to='/login'> */}
                <button className="text-black font-[500] py-2 border-gray-50 bg-gray-50 hover:bg-blue-800 hover:text-white hover:border-blue-800 px-2 rounded-sm" onClick={() =>{ 
                    setType('Login')
                    setOpen(true)
                    }}>Login</button>
                {/* </Link> */}
                {/* <Link to='/register'> */}
                <button className="text-black font-[500] py-2 border-gray-50 bg-gray-50 hover:bg-blue-800 hover:text-white hover:border-blue-800 px-2 rounded-sm" onClick={() =>{
                    setOpen(true)
                    setType('Registration')
                } 
                }>Register</button>
                {/* </Link> */}
             </div>
            </div>
            </div>
            <div className="flex justify-center align-item-center  mt-5 h-[100%]">
               <h1 className="font-bold text-3xl">Landing Page Comming soon....</h1>
            </div>
        </div>
    )
}

export default Landing;