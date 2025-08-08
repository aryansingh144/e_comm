import React, { useContext, useEffect, useState } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { SiEbox } from "react-icons/si"

function Orders() {
  const [orders, setOrders] = useState([])
  const { serverUrl } = useContext(authDataContext)

  const fetchAllOrders = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/order/list`,
        {},
        { withCredentials: true }
      )
      setOrders(result.data.reverse())
    } catch (error) {
      console.log(error)
    }
  }

  const statusHandler = async (e, orderId) => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/order/status`,
        { orderId, status: e.target.value },
        { withCredentials: true }
      )
      if (result.data) fetchAllOrders()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-black to-neutral-900 text-white">
      <Nav />
      <div className="flex pt-[70px] pl-[18%]">
        <Sidebar />

        <main className="flex-1 px-4 sm:px-6 md:px-8 py-10">
          <h1 className="text-center text-[26px] sm:text-[32px] md:text-[40px] font-extrabold mb-10">
            All Orders List
          </h1>

          {orders.length === 0 ? (
            <div className='text-center text-lg text-white/80'>
              No orders found.
            </div>
          ) : (
            <div className='flex flex-col gap-6'>
              {orders.map((order, index) => (
                <div
                  key={order._id || index}
                  className='bg-white/90 text-black rounded-2xl shadow-lg border border-gray-300 p-5 md:p-8 flex flex-col gap-5 md:gap-6'
                >
                  {/* Top Section */}
                  <div className='flex items-start sm:items-center gap-4'>
                    <SiEbox className='w-[50px] h-[50px] text-[#222] bg-white rounded-lg shadow p-2' />
                    <div className='flex-1'>
                      <div className='text-blue-700 font-semibold text-sm sm:text-base flex flex-wrap gap-2'>
                        {order.items.map((item, i) => (
                          <span key={i}>
                            {item.name.toUpperCase()}
                            <span className='text-black/60 font-medium'>
                              × {item.quantity} <span className='text-sm'>{item.size}</span>
                            </span>
                            {i < order.items.length - 1 && (
                              <span className='mx-1 text-gray-500'>|</span>
                            )}
                          </span>
                        ))}
                      </div>
                      <div className='text-[14px] sm:text-[15px] text-black/80 mt-2 leading-5'>
                        <span className='font-bold text-green-700'>
                          {order.address.firstName} {order.address.lastName}
                        </span>
                        <br />
                        {order.address.street}, {order.address.city}, {order.address.state},{' '}
                        {order.address.country}, {order.address.pinCode}
                        <br />
                        <span className='text-black/70 font-mono'>
                          {order.address.phone}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order Info & Status */}
                  <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
                    <div className='text-sm text-black/90 font-semibold flex flex-col gap-1'>
                      <p>Items: <span className='font-bold'>{order.items.length}</span></p>
                      <p>Method: <span className='text-[#265aa6]'>{order.paymentMethod}</span></p>
                      <p>
                        Payment:
                        <span className={order.payment ? 'text-green-700 ml-1' : 'text-red-500 ml-1'}>
                          {order.payment ? 'Done' : 'Pending'}
                        </span>
                      </p>
                      <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                      <p className='text-[18px] font-bold text-black mt-1'>
                        ₹ {order.amount}
                      </p>
                    </div>

                    <div>
                      <select
                        value={order.status}
                        className='px-4 py-3 bg-white border border-black/20 hover:border-blue-500 transition rounded-lg text-black font-bold shadow-md'
                        onChange={(e) => statusHandler(e, order._id)}
                      >
                        <option value="Order Placed">Order Placed</option>
                        <option value="Packing">Packing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for delivery">Out for delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Orders
