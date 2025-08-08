import React from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegListAlt } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className='w-[18%] min-h-screen bg-white border-r border-gray-300 fixed top-0 left-0 pt-[60px]'>
      <div className='flex flex-col gap-3 pt-10 pl-[20%] text-sm font-medium text-black'>

        <div
          className='flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-black hover:text-white'
          onClick={() => navigate('/add')}
        >
          <IoIosAddCircleOutline className='w-6 h-6' />
          <p className='hidden md:block'>Add Items</p>
        </div>

        <div
          className='flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-black hover:text-white'
          onClick={() => navigate('/lists')}
        >
          <FaRegListAlt className='w-5 h-5' />
          <p className='hidden md:block'>List Items</p>
        </div>

        <div
          className='flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-black hover:text-white'
          onClick={() => navigate('/orders')}
        >
          <SiTicktick className='w-5 h-5' />
          <p className='hidden md:block'>View Orders</p>
        </div>

      </div>
    </div>
  );
}

export default Sidebar;
