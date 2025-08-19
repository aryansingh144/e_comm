import React, { useState, useContext, useEffect } from 'react';
import Nav from '../component/Nav';
import Sidebar from '../component/Sidebar';
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';

function Home() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const { serverUrl } = useContext(authDataContext);

  const fetchCounts = async () => {
    try {
      const products = await axios.get(`${serverUrl}/api/product/list`, { withCredentials: true });
      setTotalProducts(products.data.length);

      const orders = await axios.post(`${serverUrl}/api/order/list`, {}, { withCredentials: true });
      setTotalOrders(orders.data.length);
    } catch (err) {
      console.error("Failed to fetch counts", err);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <div className="w-[100vw] h-[100vh] min-h-screen bg-gradient-to-br from-[#181e24] via-[#0b0f12] to-[#0a0606aa] text-white relative">
      <Nav />
      <Sidebar />

      <div className="w-[72vw] min-w-[320px] h-[100vh] absolute left-[24%] flex items-center justify-start flex-col gap-[40px] py-[100px] px-[30px]">
        <h1 className="text-[38px] text-white font-bold drop-shadow-xl mb-2 tracking-tight">
          Mercazo Admin Panel
        </h1>

        <div className="flex items-center justify-evenly gap-[40px] flex-col md:flex-row">

          <div
            className="
              w-[340px] max-w-[90vw] h-[180px]
              rounded-2xl border border-white/30
              bg-white/20 backdrop-blur-lg shadow-xl
              flex flex-col items-center justify-center gap-[22px]
              text-[22px] font-semibold text-white transition
              hover:scale-[1.04] hover:shadow-2xl
              ">
            <span className="opacity-90">Total No. of Products</span>
            <span className="px-[26px] py-[10px] bg-black rounded-lg border border-white/30 text-[32px] font-extrabold shadow-2xl backdrop-blur-3xl">
              {totalProducts}
            </span>
          </div>

          <div
            className="
              w-[340px] max-w-[90vw] h-[180px]
              rounded-2xl border border-white/30
              bg-white/20 backdrop-blur-lg shadow-xl
              flex flex-col items-center justify-center gap-[22px]
              text-[22px] font-semibold text-white transition
              hover:scale-[1.04] hover:shadow-2xl
              ">
            <span className="opacity-90">Total No. of Orders</span>
            <span className="px-[26px] py-[10px] bg-black rounded-lg border border-white/30 text-[32px] font-extrabold shadow-2xl backdrop-blur-3xl">
              {totalOrders}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
