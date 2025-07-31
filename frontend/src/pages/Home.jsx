import React, { useEffect, useState } from 'react'
import Backgound from '../component/Backgound'
import Hero from '../component/Hero'
import Product from './Product'
import OurPolicy from '../component/OurPolicy'
import NewLetterBox from '../component/NewLetterBox'
import Footer from '../component/Footer'


function Home() {
  let heroData = [
  {
    text1: "50% OFF – Limited Time Only!",
    text2: "Don't miss out on exclusive deals!",
  },
  {
    text1: "Unleash Your Bold Side",
    text2: "Where Streetwear Meets Elegance",
  },
  {
    text1: "Explore the Hottest Collections",
    text2: "Shop the Looks Everyone's Talking About",
  },
  {
    text1: "Find Your Perfect Fit",
    text2: "Trendy. Timeless. Totally You.",
  }
];


  let [heroCount,setHeroCount] = useState(0)

  useEffect(()=>{
    let interval = setInterval(()=>{
      setHeroCount(prevCount => (prevCount === 3 ? 0 : prevCount + 1));
    },3000);
    return () => clearInterval(interval)
  },[])
  
  return (
  <div className="overflow-x-hidden pt-[70px]">
    <div className="w-full lg:h-[100vh] md:h-[50vh] sm:h-[30vh] bg-gradient-to-l from-[#141414] to-[#0c2025]">
      <Backgound heroCount={heroCount} />
      <Hero
        heroCount={heroCount}
        setHeroCount={setHeroCount}
        heroData={heroData[heroCount]}
      />
    </div>
    <Product />
    <OurPolicy />
    <NewLetterBox />
    <Footer />
  </div>
);

}

export default Home
