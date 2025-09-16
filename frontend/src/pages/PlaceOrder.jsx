import React, { useContext, useState } from "react";
import Title from "../component/Title";
import CartTotal from "../component/CartTotal";
import razorpay from "../assets/Razorpay.jpg";
import { shopDataContext } from "../context/ShopContext";
import { AuthDataContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../component/Loading";

function PlaceOrder() {
  const [method, setMethod] = useState("");
  const navigate = useNavigate();
  const { cartItem, setCartItem, getCartAmount, delivery_fee, products } =
    useContext(shopDataContext);
  const { serverUrl } = useContext(authDataContext);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        const { data } = await axios.post(
          serverUrl + "/api/order/verifyrazorpay",
          response,
          { withCredentials: true }
        );
        if (data) {
          navigate("/order");
          setCartItem({});
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!method) {
    setLoading(false);
    toast.error("Please select a payment method");
    return;
  }
    setLoading(true);
    try {
      let orderItems = [];
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItem[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      if (method === "cod") {
        const result = await axios.post(
          serverUrl + "/api/order/placeorder",
          orderData,
          { withCredentials: true }
        );
        if (result.data) {
          // setCartItem({});
          toast.success("Order Placed");
          navigate("/order");
        } else {
          toast.error("Order Placement Error");
        }
      } else if (method === "razorpay") {
        const resultRazorpay = await axios.post(
          serverUrl + "/api/order/razorpay",
          orderData,
          { withCredentials: true }
        );
        if (resultRazorpay.data) {
          initPay(resultRazorpay.data);
          toast.success("Order Placed");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Please Login to place order.");
      // navigate("/login");
      // setCartItem({});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#191a1fd8] to-[#0c2025] py-20 px-2 md:px-10 flex flex-col lg:flex-row items-center justify-center gap-12">
      <div className="w-full max-w-xl rounded-2xl shadow-2xl bg-white/80 backdrop-blur-lg px-6 py-8 border border-white/10 relative">
        <Title text1="DELIVERY" text2="INFORMATION" />
        <form onSubmit={onSubmitHandler} className="mt-6 flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={onChangeHandler}
              placeholder="First Name"
              required
              className="bg-white/80 text-black px-4 py-2 rounded-md font-semibold placeholder:text-gray-700 focus:outline-none shadow"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={onChangeHandler}
              placeholder="Last Name"
              required
              className="bg-white/80 text-black px-4 py-2 rounded-md font-semibold placeholder:text-gray-700 focus:outline-none shadow"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChangeHandler}
              placeholder="Email Address"
              required
              className="col-span-2 bg-white/80 text-black px-4 py-2 rounded-md font-semibold placeholder:text-gray-700 focus:outline-none shadow"
            />
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={onChangeHandler}
              placeholder="Street"
              required
              className="col-span-2 bg-white/80 text-black px-4 py-2 rounded-md font-semibold placeholder:text-gray-700 focus:outline-none shadow"
            />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={onChangeHandler}
              placeholder="City"
              required
              className="bg-white/80 text-black px-4 py-2 rounded-md font-semibold placeholder:text-gray-700 focus:outline-none shadow"
            />
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={onChangeHandler}
              placeholder="State"
              required
              className="bg-white/80 text-black px-4 py-2 rounded-md font-semibold placeholder:text-gray-700 focus:outline-none shadow"
            />
            <input
              type="text"
              name="pinCode"
              value={formData.pinCode}
              onChange={onChangeHandler}
              placeholder="Pincode"
              required
              className="bg-white/80 text-black px-4 py-2 rounded-md font-semibold placeholder:text-gray-700 focus:outline-none shadow"
            />
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={onChangeHandler}
              placeholder="Country"
              required
              className="bg-white/80 text-black px-4 py-2 rounded-md font-semibold placeholder:text-gray-700 focus:outline-none shadow"
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={onChangeHandler}
              placeholder="Phone"
              required
              className="col-span-2 bg-white/80 text-black px-4 py-2 rounded-md font-semibold placeholder:text-gray-700 focus:outline-none shadow"
            />
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className={`bg-black/90 text-white px-8 py-3 rounded-2xl font-extrabold hover:bg-white hover:text-black border-2 border-white/20 transition-all text-lg shadow-lg w-full sm:w-auto
              ${!method ? 'opacity-50':''}`}
              >
              {loading ? <Loading /> : "PLACE ORDER"}
            </button>
          </div>
        </form>
      </div>

      <div className="w-full max-w-md flex flex-col gap-8 justify-center items-center">
        <div className="w-full rounded-2xl bg-white/80 border border-white/10 backdrop-blur-xl shadow-xl py-7 px-6 flex flex-col items-center justify-center">
          <CartTotal />
        </div>

        <div className="w-full bg-white/80 border border-white/10 rounded-2xl px-6 py-7 shadow-xl backdrop-blur relative flex flex-col items-center">
          <Title text1="PAYMENT" text2="METHOD" />
          <div className="flex flex-col sm:flex-row gap-6 mt-5 items-center justify-center">
            <button
              type="button"
              onClick={() => setMethod("razorpay")}
              className={`duration-200 font-bold w-48 h-14 px-5 rounded-xl 
                ${method === "razorpay" ? "bg-black text-white scale-105 shadow-xl" : "bg-white/80 text-black border border-transparent hover:bg-black hover:text-white"}
              `}
              tabIndex={0}
            >
              RAZORPAY
            </button>

            <button
              type="button"
              onClick={() => setMethod("cod")}
              className={`duration-200 font-bold w-48 h-14 px-5 rounded-xl 
                ${method === "cod" ? "bg-black text-white scale-105 shadow-xl" : "bg-white/80 text-black border border-transparent hover:bg-black hover:text-white"}
              `}
              tabIndex={0}
            >
              CASH ON DELIVERY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
