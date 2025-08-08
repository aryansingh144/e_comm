import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

function BestSeller() {
    let {products} = useContext(shopDataContext)
    let [bestSeller,setBestSeller] = useState([])

    useEffect(()=>{
    let filterProduct = products.filter((item) => item.bestseller)

    setBestSeller(filterProduct.slice(0,4));
    },[products])
  return (
    <div>
        <div className='h-[8%] w-[100%] text-center mt-[50px] '>
             <p className='text-[40px] font-bold text-white/80 '>BEST SELLERS</p>
        <p className='text-[20px] text-white/60'>Step Into Style – New Collection Dropping This Season!</p>
        </div>
        <div className='w-[100%] h-[50%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px]'>
            {
             bestSeller.map((item,index)=>(
                <Card key={index} name={item.name} id={item._id} price={item.price} image={item.image1}/>
             ))
            }
        </div>
      
    </div>
  )
}

export default BestSeller
