import React, { useContext, useEffect, useState } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'

function Lists() {
  const [list, setList] = useState([])
  const { serverUrl } = useContext(authDataContext)

  const fetchList = async () => {
    try {
      let result = await axios.get(`${serverUrl}/api/product/list`)
      setList(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  const removeList = async (id) => {
    try {
      let result = await axios.post(
        `${serverUrl}/api/product/remove/${id}`,
        {},
        { withCredentials: true }
      )
      if (result.data) fetchList()
      else console.log('Failed to remove Product')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-black to-neutral-900 text-black">
      <Nav />
      <div className="flex pt-[70px] pl-[18%]">
        <Sidebar />

        <main className="flex-1 px-4 sm:px-6 md:px-8 py-10">
          <h1 className="text-[26px] sm:text-[32px] md:text-[40px] font-extrabold text-center text-white mb-8">
            All Listed Products
          </h1>

          {list.length > 0 ? (
            <div className="flex flex-col gap-6">
              {list.map((item, index) => (
                <div
                  key={item._id || index}
                  className="bg-white/90 text-black rounded-2xl shadow-lg border border-gray-300 flex flex-row items-center justify-between gap-4 p-4 md:p-6"
                >

                  <img
                    src={item.image1}
                    className="w-20 h-20 md:w-28 md:h-28 object-cover rounded-lg border border-gray-200 shadow"
                    alt={item.name}
                  />


                  <div className="flex-1 min-w-0">
                    <div className="text-base md:text-lg font-bold text-blue-900 truncate">
                      {item.name}
                    </div>
                    <div className="text-sm text-green-700 font-semibold">
                      {item.category}
                    </div>
                    <div className="text-sm md:text-base text-[#111] font-bold">
                      ₹{item.price}
                    </div>
                  </div>


                  <button
                    className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-md bg-red-600 hover:bg-red-800 text-white text-xl font-bold shadow-md transition"
                    title="Remove product"
                    onClick={() => removeList(item._id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-white text-lg text-center my-12">
              No products available.
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Lists
