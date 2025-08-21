import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/authContext'
import axios from 'axios'

function Order() {
  const [orderData, setOrderData] = useState([])
  const { currency } = useContext(shopDataContext)
  const { serverUrl } = useContext(authDataContext)

  const loadOrderData = async () => {
    try {
      const result = await axios.post(serverUrl + '/api/order/userorder', {}, { withCredentials: true })
      if (result.data) {
        let allOrdersItem = []
        result.data.forEach((order) => {
          order.items.forEach((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse())
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [])

  return (
    <div className="w-full min-h-screen py-20 p-3 bg-gradient-to-l from-[#191a1fd8] to-[#0c2025]">
      <div className="text-center mb-10">
        <Title text1="MY" text2="ORDERS" />
      </div>
      <div className="w-full flex flex-col gap-8 items-center justify-center">
        {orderData.length === 0 ? (
          <div className="w-full max-w-xl min-h-[180px] flex flex-col gap-5 items-center justify-center bg-white/10 backdrop-blur rounded-2xl border border-white/10 shadow-lg p-12">
            <p className="text-lg md:text-2xl font-semibold text-gray-100">No orders found!</p>
          </div>
        ) : orderData.map((item, index) => (
          <div
            key={index}
            className="w-full max-w-3xl bg-white/80 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl p-4 flex flex-col md:flex-row gap-6 items-center relative transition-all hover:scale-[1.01] duration-200"
          >

            <img src={item.image1} alt="" className="w-28 h-28 md:w-36 md:h-36 object-cover rounded-xl border border-white/20 shadow-md"/>

            <div className="flex-1 flex flex-col gap-1 md:gap-2">
              <div className="flex items-center gap-4">
                <p className="text-xl font-bold text-black">{item.name}</p>
                <span className="text-xs md:text-base px-2 py-[2px] rounded bg-black text-white ml-3 border border-white/20">
                  Size: <span className="font-medium">{item.size}</span>
                </span>
                <span className="text-xs md:text-base px-2 py-[2px] ml-3 rounded bg-black text-white border border-white/20">
                  Qty: <span className="font-medium">{item.quantity}</span>
                </span>
              </div>
              <div className="flex items-center gap-6 flex-wrap">
                <span className="font-semibold text-black">{currency} {item.price}</span>
                <span className="text-gray-300">Payment: <span className="font-semibold">{item.paymentMethod}</span></span>
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-black">Date: <span className="text-black">{new Date(item.date).toLocaleDateString()}</span></span>
                <span className="text-gray-300">Status:
                  <span className={`ml-2 text-sm font-bold px-2 py-1 rounded-full
                    ${item.status === "Delivered"
                    ? "bg-black text-white"
                    : item.status === "Pending"
                      ? "bg-yellow-400/70 text-black"
                      : "bg-blue-400/80 text-black"
                    }`}>
                    {item.status}
                  </span>
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-3 md:mt-0 mt-2">
              <button
                className="px-4 py-2 bg-black text-white hover:bg-white hover:text-black rounded-xl border border-white/30 shadow font-bold transition-all text-sm mt-2 active:scale-95"
                onClick={loadOrderData}
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Order;
