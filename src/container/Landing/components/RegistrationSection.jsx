import { useState } from "react";
import { postReq } from "../../../utils/apiHandlers";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import CircleLoader from "../../../components/common/Loader";

const initialState = {
  email: "",
  password: "",
  role: "aspirant",
  mobile: "",
};

const initialError = {
  email: "",
  password: "",
  mobile: "",
};
const RegistrationSection = ({ setOpen }) => {
  const [form, setForm] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(initialError);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async () => {
    setError(initialError);
    if (!form.email) {
      setError((prev) => ({ ...prev, email: "This field is required" }));
      return;
    } else if (!form.mobile) {
      setError((prev) => ({ ...prev, mobile: "This field is required" }));
      return;
    } else if (!form.password) {
      setError((prev) => ({ ...prev, password: "This field is required" }));
      return;
    }
    try {
      setIsLoading(true);
      const response = await postReq(`/register/`, form);
      setIsLoading(false);
      console.log("----------------response ", response);
      if (response.status) {
        // Cookies.set("is_user_token", response.data.access, { expires: 1 });
        // Cookies.set("is_user_refresh", response.data.refresh, { expires: 1 }); // expires in 1 day
        // dispatch(userDetails(response.data));
        // // navigate('/dashboard')
        // window.location.href = '/dashboard'
        setOpen(false);
      } else if (!response.status) {
        console.log("------------responser ", response);
        toast.error(response.error.email[0]);
      }
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="my-2">
        <label className="font-semibold">
          {" "}
          Email <strong className="text-red-600">*</strong>
        </label>
        <br></br>
        <input
          type="text"
          name="email"
          className="border rounded-sm w-full p-1"
          onChange={handleChange}
        />
        <span className="text-red-600">{error.email}</span>
      </div>
      <div>
        <label className="font-semibold">
          Mobile <strong className="text-red-600">*</strong>
        </label>
        <br></br>
        <input
          type="text"
          name="mobile"
          className="border rounded-sm w-full p-1"
          onChange={handleChange}
        />
        <span className="text-red-600">{error.mobile}</span>
      </div>
      <div className="my-2">
        <label className="font-semibold">
          Password <strong className="text-red-600">*</strong>
        </label>
        <br></br>
        <input
          type="password"
          name="password"
          className="border rounded-sm w-full p-1"
          onChange={handleChange}
        />
        <span className="text-red-600">{error.password}</span>
      </div>
      <div className="pt-2">
        <button
          className="btn border rounded-sm w-full px-2"
          onClick={handleRegister}
        >
          <div className="justify-center w-full py-1 flex ">
            <span>Register</span> {isLoading && <CircleLoader size={10} />}
          </div>
        </button>
      </div>
    </div>
  );
};

export default RegistrationSection;
