import { useState } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userDetails } from "../../../features/user/userSlice";
import { postReq } from "../../../utils/apiHandlers";
import CircleLoader from "../../../components/common/Loader";
import { toast } from "react-toastify";


const initialState = {
    email:'',
    password:''
}

const initialError = {
    email:'',
    password:''
}
const LoginSection = ({setOpen}) => {
    const [form, setForm] = useState(initialState)
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const [error, setError] = useState(initialError)

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm((prev) => ({...prev, [name]:value}))
    }

    const handleLogin = async() => {
        setError(initialError);
        if(!form.email){
            setError((prev) => ({...prev, email:"This field is required"}));
            return;
        }else if(!form.password){
            setError((prev) => ({...prev, password:"This field is required"}));
            return;
        }


        try{
            setIsLoading(true);
            const response = await postReq(`/login/`, form);
            setIsLoading(false);
            if(response.status){
                Cookies.set("is_user_token", response.data.access, { expires: 1 });
                Cookies.set("is_user_refresh", response.data.refresh, { expires: 1 }); // expires in 1 day
                dispatch(userDetails(response.data));
                // navigate('/dashboard')
                window.location.href = '/dashboard'
                setOpen(false);

            }else if(!response.status){
               toast.error(response.error.message);
            }
        }catch(err){
           setIsLoading(false);
        }
       
    }

    return(
        <div className="text-center">
           <div className="text-left">
             <label className="my-2 font-semibold font-lg">Login with Email<strong className="text-red-600">*</strong> </label><br></br>
             <input type="text" name="email" className="border w-full rounded-sm p-1" onChange={handleChange} />
             <span className="text-red-600">{error.email}</span>
           </div>
           <div className="text-left my-2">
             <label className="my-2 font-semibold">Password<strong className="text-red-600">*</strong></label><br></br>
             <input type="password" name="password" className="border w-full  rounded-sm p-1" onChange={handleChange} />
             <span className="text-red-600">{error.password }</span>
           </div>
           <div className="pt-2 ">
            <button className="btn w-full  border rounded-sm px-2 flex gap-2" onClick={handleLogin}>
            <div className="justify-center w-full py-1 flex ">
                <span>Login</span> {isLoading && <CircleLoader size={10} />}
            </div>
            </button>
           </div>
           <div className="my-5">
              <p>Forgot password ?</p>
           </div>
        </div>
    )
}

export default LoginSection;