import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userDetails } from "../../../features/user/userSlice";
import { postReq } from "../../../utils/apiHandlers";
import { toast } from "react-toastify";
import CircleLoader from "../../../components/Loader/CircleLoader";
import moment from "moment";

const initialState = {
  email: "",
  password: "",
};

const initialError = {
  email: "",
  password: "",
  new_password: "",
  otp: "",
  confirm_password: "",
};
const LoginSection = ({ setOpen }) => {
  const [form, setForm] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState(initialError);
  const [forgotPass, setForgotPass] = useState(1);
  const [verificationResponse, setVerificationResponse] = useState();
  const [resetForm, setResetForm] = useState({
    new_password: "",
    confirm_password: "",
    otp: "",
  });
  const [resetPassword, setResetPassword] = useState(false);
  const [resendTimer, setResendTimer] = useState();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetform = (e) => {
    console.log("--------e.", e.target.value);
    const { name, value } = e.target;
    setResetForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    setError(initialError);
    if (!form.email) {
      setError((prev) => ({ ...prev, email: "This field is required" }));
      return;
    } else if (!form.password) {
      setError((prev) => ({ ...prev, password: "This field is required" }));
      return;
    }

    try {
      setIsLoading(true);
      const response = await postReq(`/login/`, form);
      setIsLoading(false);
      if (response.status) {
        Cookies.set("is_user_token", response.data.access, { expires: 1 });
        Cookies.set("is_user_refresh", response.data.refresh, { expires: 1 }); // expires in 1 day
        dispatch(userDetails(response.data));
        // navigate('/dashboard')
        window.location.href = "/dashboard";
        setOpen(false);
      } else if (!response.status) {
        toast.error(response.error.message);
      }
    } catch (err) {
      setIsLoading(false);
    }
  };

  const handleSendOtp = async () => {
    let data = {
      email: form.email,
    };
    if (!form.email) {
      setError((prev) => ({ ...prev, emailErr: "This field is required" }));
      return;
    }

    try {
      setIsLoading(true);
      const response = await postReq("/send-otp/", data);
      setIsLoading(false);
      console.log("-resssssssssssssssssssponse ", response);
      if (response.data) {
        setForgotPass((prev) => prev + 1);
        setVerificationResponse(response.data);
        toast.success("OTP has been sent on email successfully");
      }
      if (!response.status) {
        toast.error(response.error.email[0] || "Something went wrong");
      }
    } catch (err) {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (resetPassword) {
      if (!resetForm.otp) {
        setError((prev) => ({ ...prev, otpErr: "This field is required." }));
        return;
      } else if (!resetForm.new_password) {
        setError((prev) => ({ ...prev, passErr: "This field is required." }));
        return;
      } else if (resetForm.new_password.length < 6) {
        setError((prev) => ({
          ...prev,
          passErr: "Minimum password length must be 6 digit",
        }));
        return;
      } else if (!(resetForm.confirm_password === resetForm.new_password)) {
        setError((prev) => ({
          ...prev,
          confPassErr: "Password is not matched.",
        }));
        return;
      }
    }

    const data = {
      otp: resetForm.otp,
      email: form.email,
      new_password: resetForm.new_password,
      confirm_password: resetForm.confirm_password,
    };

    try {
      setIsLoading(true);
      const response = await postReq("/verify-otp/", data);
      setIsLoading(false);

      if (resetPassword && response.data) {
        // setResetPassword(false);
        setOpen(false);
        setResendTimer(null);
        setResetForm((prev) => ({
          ...prev,
          otp: "",
          new_password: "",
          confirm_password: "",
        }));
        toast.success("Password has been reset successfully");
      }
    } catch (err) {
      setIsLoading(false);
      if (err.response.status == 400) {
        toast.error(err.response.data.error || "Something went wrong");
      }
    }
  };

  useEffect(() => {
    let resendCodeInterval;
    if (verificationResponse) {
      // Calculate the expiration time as a timestamp
      const expirationTime = moment(verificationResponse.expired_otp_time);

      resendCodeInterval = setInterval(() => {
        const currentTime = moment();

        // Calculate the difference in seconds between expiration and current time
        let totalSeconds = expirationTime.diff(currentTime, "seconds");

        // If time is still left before expiration
        if (totalSeconds >= 0) {
          const minutes = Math.floor(totalSeconds / 60);
          const seconds = totalSeconds % 60;

          // Set the formatted time remaining
          setResendTimer(
            `${minutes < 10 ? `0${minutes}` : minutes}:${
              seconds < 10 ? `0${seconds}` : seconds
            }`
          );
        } else {
          // Timer expired, clear the timer and allow resend
          setResendTimer(null);
          clearInterval(resendCodeInterval);
        }
      }, 1000);
    }

    if (!resetPassword && verificationResponse) {
      setVerificationResponse(null);
      if (resendCodeInterval) clearInterval(resendCodeInterval);
    }

    // Clear interval on unmount or when dependencies change
    return () => {
      if (resendCodeInterval) {
        clearInterval(resendCodeInterval);
      }
    };
  }, [forgotPass, verificationResponse]);

  return (
    <div className="text-center">
      <>
        {forgotPass == 1 && (
          <div>
            <div className="text-left">
              <label className="my-2 font-semibold font-lg">
                Login with Email<strong className="text-red-600">*</strong>{" "}
              </label>
              <br></br>
              <input
                type="text"
                name="email"
                className="border w-full rounded-sm p-1"
                onChange={handleChange}
              />
              <span className="text-red-600">{error.email}</span>
            </div>
            <div className="text-left my-3">
              <label className="my-2 font-semibold">
                Password<strong className="text-red-600">*</strong>
              </label>
              <br></br>
              <input
                type="password"
                name="password"
                className="border w-full  rounded-sm p-1"
                onChange={handleChange}
              />
              <span className="text-red-600">{error.password}</span>
            </div>
            <div className="pt-2 ">
              <button
                className="btn w-full  border rounded-sm px-2 flex gap-2"
                onClick={handleLogin}
              >
                <div className="justify-center align-items-center gap-2  w-full py-1 flex ">
                  <span>Login</span>{" "}
                  <span>{isLoading && <CircleLoader size={12} />}</span>
                </div>
              </button>
            </div>
            <div
              onClick={() => setForgotPass((prev) => prev + 1)}
              className="my-5 cursor-pointer text-blue-500"
            >
              <p>Forgot password ?</p>
            </div>
          </div>
        )}
        {forgotPass == 2 && (
          <div>
            <div className="text-left">
              <label className="my-2 font-semibold font-lg">
                Email<strong className="text-red-600">*</strong>{" "}
              </label>
              <br></br>
              <input
                type="text"
                name="email"
                className="border w-full rounded-sm p-1"
                onChange={handleChange}
              />
              <span className="text-red-600">{error.email}</span>
            </div>
            <div className="pt-2 ">
              <button
                className="btn w-full  border rounded-sm px-2 flex gap-2"
                onClick={handleSendOtp}
              >
                <div className="justify-center align-items-center gap-2  w-full py-1 flex ">
                  <span>Submit</span>{" "}
                  <span>{isLoading && <CircleLoader size={12} />}</span>
                </div>
              </button>
            </div>
          </div>
        )}
        {forgotPass == 3 && (
          <div>
            <div className="text-left">
              <label className="my-2 font-semibold font-lg">
                Otp<strong className="text-red-600">*</strong>{" "}
              </label>
              <br></br>
              <input
                type="text"
                name="otp"
                className="border w-full rounded-sm p-1"
                onChange={handleResetform}
              />
              <span className="text-red-600">{error.otp}</span>
            </div>
            <div className="text-left">
              <label className="my-2 font-semibold font-lg">
                New Password<strong className="text-red-600">*</strong>{" "}
              </label>
              <br></br>
              <input
                type="text"
                name="new_password"
                className="border w-full rounded-sm p-1"
                onChange={handleResetform}
              />
              <span className="text-red-600">{error.new_password}</span>
            </div>
            <div className="text-left">
              <label className="my-2 font-semibold font-lg">
                Confirm Password<strong className="text-red-600">*</strong>{" "}
              </label>
              <br></br>
              <input
                type="text"
                name="confirm_password"
                className="border w-full rounded-sm p-1"
                onChange={handleResetform}
              />
              <span className="text-red-600">{error.confirm_password}</span>
            </div>
            <div className="flex justify-end my-2">
                          <span
                            onClick={() => {
                              if (!resendTimer) {
                                handleSendOtp()
                              }
                            }}
                            className={`${
                              resendTimer
                                ? "text-red-500"
                                : "text-blue-500 cursor-pointer"
                            }`}
                          >
                            {resendTimer
                              ? `Time left ${resendTimer}`
                              : "Resend Otp ?"}{" "}
                          </span>
                        </div>
            <div className="pt-2 ">
              <button
                className="btn w-full  border rounded-sm px-2 flex gap-2"
                onClick={handleSubmit}
              >
                <div className="justify-center align-items-center gap-2  w-full py-1 flex ">
                  <span>Submit</span>{" "}
                  <span>{isLoading && <CircleLoader size={12} />}</span>
                </div>
              </button>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default LoginSection;
