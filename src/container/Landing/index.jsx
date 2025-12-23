import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginRegModal from "./components/LoginRegModal";
import Carousel from "../../components/common/Carousel";
import Categories from "./components/Categories";
import Footer from "../../components/common/Footer";
import { useSelector } from "react-redux";

const slides = [
  { src: "/images/landing/carousel.png", title: "", subtitle: "" },
  { src: "/images/landing/carousel1.png", title: "", subtitle: "" },
];

const Landing = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("Registration");
  const userDetails = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();


  // useEffect(() => {
  //   if(userDetails?.access){
  //       navigate('/dashboard')
  //   }
  // }, [userDetails])
  return (
    <>
    <div className="text-gray-700 w-full">
      <div className="p-5 bg-[#154065] ">
        <div className="flex justify-between align-items-center">
          <div>
            <h1 className="text-xl font-bold text-orange-300">Test Know</h1>
          </div>
          <LoginRegModal open={open} setOpen={setOpen} type={type} />
          <div className="flex gap-2">
            {/* <Link to='/login'> */}
            <button
              className="text-black font-[500] py-2 border-gray-50 bg-gray-50 hover:bg-[#f9ab00] hover:text-white hover:border-[#f9ab00] px-2 rounded-sm"
              onClick={() => {
                setType("Login");
                setOpen(true);
              }}
            >
              Login
            </button>
            {/* </Link> */}
            {/* <Link to='/register'> */}
            <button
              className="text-black font-[500] py-2 border-gray-50 bg-gray-50 hover:bg-[#f9ab00] hover:text-white hover:border-[#f9ab00] px-2 rounded-sm"
              onClick={() => {
                setOpen(true);
                setType("Registration");
              }}
            >
              Register
            </button>
            {/* </Link> */}
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-center align-item-center  mt-5">
          <div >
            <Carousel slides={slides} autoPlay interval={3000} />
          </div>
        </div>
        <div className="flex my-3 mx-auto justify-center">
          <div className="mx-auto">
            <Categories />
          </div>
        </div>
      </div>
    </div>
     <Footer />
    </>
  );
};

export default Landing;
