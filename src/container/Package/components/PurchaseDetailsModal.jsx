// import { Dialog, DialogContent } from "@mui/material";
// import { reactIcons } from "../../../utils/icons";
// import { useSelector } from "react-redux";
// import Button from "../../../components/FormElements/Button";
// import { getReq, postApiReq } from "../../../utils/apiHandlers";
// import { useEffect, useState } from "react";

// import axios from "axios";

// const PurchaseDetailsModal = ({
//   open,
//   setOpen,
//   packageDetails,
//   planDetails,
// }) => {
//   const userDetails = useSelector((state) => state.user.userInfo);
//   const [data, setData] = useState({
//     package_id: "",
//     plan_id: "",
//   });

//   const handlePurchasePlan = async () => {
//     const response = await postApiReq(`/buy/`, data);
//     if (response.status) {
//     }
//   };

//   useEffect(() => {
//     if (packageDetails) {
//       setData((prev) => ({
//         ...prev,
//         package_id: packageDetails?.id,
//         plan_id: planDetails?.id,
//       }));
//     }
//   }, [packageDetails]);

//   function PayButton() {
//     const payNow = async () => {
//       // 1) Create order on backend
//       const { data } = await axios.post(
//         "/api/payments/create-order/",
//         { amount: 499, currency: "INR", receipt: `rcpt_${Date.now()}` },
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         }
//       );

//       const options = {
//         key: data.key,
//         amount: data.amount,
//         currency: data.currency,
//         name: "Your App Name",
//         description: "Package Purchase",
//         order_id: data.order_id,
//         handler: async function (response) {
//           // 2) Verify on backend
//           const verifyRes = await axios.post(
//             "/api/payments/verify/",
//             response,
//             {
//               headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//               },
//             }
//           );

//           alert("Payment verified: " + verifyRes.data.status);
//         },
//         theme: { color: "#3399cc" },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     };

//     return <button onClick={payNow}>Pay with Razorpay</button>;
//   }

//   return (
//     <Dialog
//       open={open}
//       // onClose={{}}
//       aria-labelledby="responsive-dialog-title"
//     >
//       <div className="bg-white w-[400px] md:w-[400px] rounded-[20px] ">
//         {/* <DialogTitle id="responsive-dialog-title"> */}
//         <div className="flex justify-between items-center bg-black h-8 rounded-t-sm py-5 px-3">
//           <span className="flex-1 text-center text-white font-semibold"></span>
//           <div className="w-5 h-5 bg-white flex items-center justify-center rounded-sm">
//             <span
//               className="text-black cursor-pointer"
//               onClick={() => {
//                 // setCode('');
//                 setOpen(false);
//               }}
//             >
//               {reactIcons.close}
//             </span>
//           </div>
//         </div>
//         <DialogContent>
//           <div>
//             <div>
//               <h1 className="font-bold text-lg py-2">Email</h1>
//               <input
//                 type="text"
//                 className="border p-1 text-lg border-blue-600 text-blue-600 rounded-sm"
//                 value={userDetails.email}
//               />
//             </div>
//             <div>
//               <h1 className="font-bold py-2 text-lg">Amount</h1>
//               <p className="font-semibold text-lg text-blue-600">
//                 &#8377; {planDetails?.price}
//               </p>
//             </div>
//             <div className="text-end">
//               <Button
//                 name="Make Payment"
//                 className="create-btn"
//                 handleClick={PayButton}
//               />
//             </div>
//           </div>
//         </DialogContent>
//       </div>
//     </Dialog>
//   );
// };

// export default PurchaseDetailsModal;

import { Dialog, DialogContent } from "@mui/material";
import { reactIcons } from "../../../utils/icons";
import { useSelector } from "react-redux";
import Button from "../../../components/FormElements/Button";
import { postApiReq } from "../../../utils/apiHandlers";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../utils/endpoints";

function loadRazorpayScript() {
  return new Promise((resolve) => {
    // If already loaded
    if (window.Razorpay) return resolve(true);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

const PurchaseDetailsModal = ({
  open,
  setOpen,
  packageDetails,
  planDetails,
}) => {
  const userDetails = useSelector((state) => state.user.userInfo);

  const [data, setData] = useState({ package_id: "", plan_id: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (packageDetails?.id && planDetails?.id) {
      setData({ package_id: packageDetails.id, plan_id: planDetails.id });
    }
  }, [packageDetails?.id, planDetails?.id]);

  const amountRupees = useMemo(() => {
    const price = planDetails?.price;
    const n = Number(price);
    return Number.isFinite(n) ? n : 0;
  }, [planDetails?.price]);

  const payNow = async () => {
    if (!data.package_id || !data.plan_id) {
      alert("Package/Plan missing. Please select a plan again.");
      return;
    }
    if (!amountRupees || amountRupees <= 0) {
      alert("Invalid amount.");
      return;
    }

    setLoading(true);
    try {
      const scriptOk = await loadRazorpayScript();
      if (!scriptOk) {
        alert("Razorpay SDK failed to load. Check internet and try again.");
        return;
      }


      // 1) Create Razorpay order on backend (use your backend endpoint)
      // Recommended: backend should accept package_id/plan_id and compute amount itself.
      // If your backend currently expects amount, send amount as rupees.
      const orderRes = await postApiReq("/payments/create-order/", {
        // best: send ids, backend calculates amount
        package_id: data.package_id,
        plan_id: data.plan_id,

        // fallback (only if your backend needs amount)
        amount: amountRupees,
        currency: "INR",
        receipt: `pkg_${data.package_id}`,
      });
     
      console.log("-------------order res ", orderRes);
      const orderData = orderRes.data;

      const options = {
        key: orderData.key, // Razorpay Key ID (public)
        amount: orderData.amount, // in paise (from backend)
        currency: orderData.currency || "INR",
        name: "TestKnow",
        description: `${packageDetails?.name || "Package"} - ${
          planDetails?.name || "Plan"
        }`,
        order_id: orderData.order_id,
        prefill: {
          email: userDetails?.email || "",
          name: userDetails?.full_name || userDetails?.name || "dharmendra patel",
          contact: userDetails?.mobile,
        },
        theme: { color: "#3399cc" },

        handler: async function (response) {
          try {
            // 2) Verify on backend
            const verifyRes = await postApiReq(`/payments/verify/`, {
              ...response,
              package_id: data.package_id,
              plan_id: data.plan_id,
            });

            if (verifyRes.data?.status !== "success") {
              alert("Payment verification failed.");
              return;
            }

            // 3) Now call your /buy/ to activate package (or you can do this inside verify API itself)
            const buyRes = await postApiReq(`/buy/`, {
              ...data,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
            });

            if (buyRes?.status) {
              alert("Payment successful & package activated!");
              setOpen(false);
            } else {
              alert(
                buyRes?.message ||
                  "Payment done, but activation failed. Contact support."
              );
            }
          } catch (e) {
            console.error(e);
            alert(
              "Payment done, but verification/activation failed. Contact support."
            );
          }
        },
        modal: {
          ondismiss: function () {
            // user closed payment window
          },
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (resp) {
        console.error("Payment failed", resp?.error);
        alert(resp?.error?.description || "Payment failed. Try again.");
      });

      rzp.open();
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.error || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} aria-labelledby="responsive-dialog-title">
      <div className="bg-white w-[400px] md:w-[400px] rounded-[20px]">
        <div className="flex justify-between items-center bg-black h-8 rounded-t-sm py-5 px-3">
          <span className="flex-1 text-center text-white font-semibold"></span>
          <div className="w-5 h-5 bg-white flex items-center justify-center rounded-sm">
            <span
              className="text-black cursor-pointer"
              onClick={() => setOpen(false)}
            >
              {reactIcons.close}
            </span>
          </div>
        </div>

        <DialogContent>
          <div>
            <div>
              <h1 className="font-bold text-lg py-2">Email</h1>
              <input
                type="text"
                className="border p-1 text-lg border-blue-600 text-blue-600 rounded-sm w-full"
                value={userDetails?.email || ""}
                readOnly
              />
            </div>

            <div>
              <h1 className="font-bold py-2 text-lg">Amount</h1>
              <p className="font-semibold text-lg text-blue-600">
                &#8377; {amountRupees}
              </p>
            </div>

            <div className="text-end mt-4">
              <Button
                name={loading ? "Processing..." : "Make Payment"}
                className="create-btn"
                handleClick={() => {
                    setOpen(false);
                    payNow();
                }
            } // ✅ correct
                disabled={loading}
              />
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default PurchaseDetailsModal;
