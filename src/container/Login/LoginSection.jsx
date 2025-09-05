import { useState } from "react";
import { postReq } from "../../utils/apiHandlers";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userDetails } from "../../features/user/userSlice";


const initialState = {
    email:'',
    password:''
}
const LoginSection = () => {
    const [form, setForm] = useState(initialState)
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm((prev) => ({...prev, [name]:value}))
    }

    const handleLogin = async() => {
        try{
            setIsLoading(true);
            const response = await postReq(`/login/`, form);
            setIsLoading(false);
            console.log("----------------response ", response);
            if(response.status){
                Cookies.set("is_user_token", response.data.access, { expires: 1 });
                Cookies.set("is_user_refresh", response.data.refresh, { expires: 1 }); // expires in 1 day
                dispatch(userDetails(response.data));
                // navigate('/dashboard')
                window.location.href = '/dashboard'

            }else if(!response.status){
               
            }
        }catch(err){
           setIsLoading(false);
        }
       
    }

    return(
        <div>
           <div>
             <label>Login with Email</label><br></br>
             <input type="text" name="email" className="border rounded-1 p-1" onChange={handleChange} />
           </div>
           <div>
             <label>Password</label><br></br>
             <input type="password" name="password" className="border rounded-1 p-1" onChange={handleChange} />
           </div>
           <div className="pt-2">
            <button className="btn border rounded-1 px-2" onClick={handleLogin}>Login</button>
           </div>
        </div>
    )
}

export default LoginSection;