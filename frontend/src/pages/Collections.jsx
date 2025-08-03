import React, { useContext, useEffect, useState } from 'react'
import { FaChevronRight } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import Title from '../component/Title';
import { shopDataContext } from '../context/ShopContext';
import Card from '../component/Card';

function Collections() {

    let [showFilter,setShowFilter] = useState(false)
    let {products,search} = useContext(shopDataContext)
    let [filterProduct,setFilterProduct] = useState([])
    let [category,setCategory] = useState([])
    let [subCategory,setSubCategory] = useState([])
    let [sortType,setSortType] = useState("relavent")

    const toggleCategory = (e) =>{
        if(category.includes(e.target.value)){
            setCategory(prev => prev.filter(item => item !== e.target.value))
        }else
         {
            setCategory(prev => [...prev,e.target.value])
         }
    }

    const toggleSubCategory = (e) =>{
         if(subCategory.includes(e.target.value)){
            setSubCategory(prev => prev.filter(item => item !== e.target.value))
        }else
         {
            setSubCategory(prev => [...prev,e.target.value])
         }
    }

    const applyFilter = ()=>{
        let productCopy = products.slice()

        if(search){
            productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        }
        if(category.length > 0)
        {
            productCopy = productCopy.filter(item => category.includes(item.category))
        }
        if(subCategory.length > 0)
        {
            productCopy = productCopy.filter(item => subCategory.includes(item.subCategory))
        }
        setFilterProduct(productCopy)

    }


    const sortProducts = (e)=>{
        let fbCopy = filterProduct.slice()

        switch(sortType){
         case 'low-high':
            setFilterProduct(fbCopy.sort((a,b)=>(a.price - b.price)))
        break;

         case 'high-low':
            setFilterProduct(fbCopy.sort((a,b)=>(b.price - a.price)))
        break;
        default:
            applyFilter()
        break;
        }

    }

    useEffect(()=>{
        sortProducts()
    },[sortType])


    useEffect(()=>{
    setFilterProduct(products)
    },[products])

    useEffect(()=>{
        applyFilter()
    },[category,subCategory,search ])






  return (
    <div className='w-[99vw]  min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-start flex-col md:flex-row justify-start  pt-[70px] overflow-x-hidden z-[2] pb-[110px]'>
      <div className={`
      md:w-[30vw] lg:w-[20vw] w-full
      md:min-h-[100vh] 
      ${showFilter ? "h-auto" : "h-[60px]"} 
      p-5
      border-r border-gray-800  
      bg-black
      text-white
      lg:fixed
      transition-all
      duration-300
      z-10
    `}>

  <p
    className='
      text-2xl font-bold flex gap-2 items-center
      cursor-pointer select-none tracking-wide
      pb-1 border-b border-gray-700
    '
    onClick={() => setShowFilter(prev => !prev)}
  >
    FILTERS
    <span className="md:hidden ml-2">
      {!showFilter ? (
        <FaChevronRight className='text-lg' />
      ) : (
        <FaChevronDown className='text-lg' />
      )}
    </span>
  </p>

  {/* Category Card */}
  <div className={`
    mt-6 shadow-sm
    rounded-lg
    transition-all duration-200
    bg-white/5
    border border-white/10
    ${showFilter ? "" : "hidden"} md:block
  `}>
    <p className='text-[15px] font-medium text-white px-5 pt-5 pb-[6px] tracking-wide' >CATEGORIES</p>
    <div className='px-5 pb-5 flex flex-col gap-3'>
      {['Men', 'Women', 'Kids'].map(cat => (
        <label key={cat} className="flex items-center gap-3 text-base font-light hover:text-white transition-colors cursor-pointer">
          <input
            type="checkbox"
            value={cat}
            onChange={toggleCategory}
            checked={category && category.includes(cat)}
            className='w-4 h-4 accent-white bg-black border border-gray-600 rounded-md'
          />
          <span className="text-gray-200">{cat}</span>
        </label>
      ))}
    </div>
  </div>


  <div className={`
    mt-5 shadow-sm
    rounded-lg
    transition-all duration-200
    bg-white/5
    border border-white/10
    ${showFilter ? "" : "hidden"} md:block
  `}>
    <p className='text-[15px] font-medium text-white px-5 pt-5 pb-[6px] tracking-wide'>SUB-CATEGORIES</p>
    <div className='px-5 pb-5 flex flex-col gap-3'>
      {['TopWear', 'BottomWear', 'WinterWear'].map(sub => (
        <label key={sub} className="flex items-center gap-3 text-base font-light hover:text-white transition-colors cursor-pointer">
          <input
            type="checkbox"
            value={sub}
            onChange={toggleSubCategory}
            checked={subCategory && subCategory.includes(sub)}
            className='w-4 h-4 accent-white bg-black border border-gray-600 rounded-md'
          />
          <span className="text-gray-200">{sub}</span>
        </label>
      ))}
    </div>
  </div>
</div>

      <div className='lg:pl-[20%] md:py-[10px] '>
        <div className=' md:w-[80vw] w-[100vw]    flex  justify-between flex-col lg:flex-row lg:px-[50px] '>
            <Title text1={"ALL"} text2={"COLLECTIONS"}/>

            <select name="" id="" className='bg-white text-black w-[60%] md:w-[200px] h-[50px] px-[10px]  rounded-lg hover:border-[#46d1f7] border-[2px]' onChange={(e)=>setSortType(e.target.value)}>
                <option value="relavent" className='w-[100%] h-[100%]'>Sort By: Relavent</option>
                <option value="low-high" className='w-[100%] h-[100%]'>Sort By: Low to High</option>
                <option value="high-low" className='w-[100%] h-[100%]'>Sort By: High to Low</option>
            </select>
        </div>
        <div className='lg:w-[80vw] md:w-[60vw]   w-[100vw] min-h-[70vh] flex items-center justify-center flex-wrap gap-[30px]'>
            {
             filterProduct.map((item,index)=>(
                <Card key={index} id={item._id} name={item.name} price={item.price} image={item.image1}/>
             ))
            }
        </div>
      </div>
    </div>
  )
}

export default Collections