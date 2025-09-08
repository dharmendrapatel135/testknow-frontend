import { useState } from "react";
import { postReq } from "../../../utils/apiHandlers";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


const initialState = {
    email:'',
    password:'',
    role:'aspirant',
    mobile:'',
}
const RegistrationSection = ({setOpen}) => {
    const [form, setForm] = useState(initialState)
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm((prev) => ({...prev, [name]:value}))
    }

    const handleRegister = async() => {
        try{
            setIsLoading(true);
            const response = await postReq(`/register/`, form);
            setIsLoading(false);
            console.log("----------------response ", response);
            if(response.status){
                // Cookies.set("is_user_token", response.data.access, { expires: 1 });
                // Cookies.set("is_user_refresh", response.data.refresh, { expires: 1 }); // expires in 1 day
                // dispatch(userDetails(response.data));
                // // navigate('/dashboard')
                // window.location.href = '/dashboard'
                setOpen(false);

            }else if(!response.status){
               
            }
        }catch(err){
           setIsLoading(false);
        }
       
    }

    return(
        <div>
           <div>
             <label> Email</label><br></br>
             <input type="text" name="email" className="border rounded-1 p-1" onChange={handleChange} />
           </div>
           <div>
             <label>Mobile</label><br></br>
             <input type="text" name="mobile" className="border rounded-1 p-1" onChange={handleChange} />
           </div>
           <div>
             <label>Password</label><br></br>
             <input type="password" name="password" className="border rounded-1 p-1" onChange={handleChange} />
           </div>
           <div className="pt-2">
            <button className="btn border rounded-1 px-2" onClick={handleRegister}>Register</button>
           </div>
        </div>
    )
}

export default RegistrationSection;