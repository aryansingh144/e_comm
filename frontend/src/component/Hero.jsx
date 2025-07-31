import React from 'react';
import { FaCircle } from "react-icons/fa";

function Hero({ heroData, heroCount, setHeroCount }) {
  const words = heroData.text1.split(" ");
  const mid = Math.ceil(words.length / 2);
  const firstHalf = words.slice(0, mid).join(" ");
  const secondHalf = words.slice(mid).join(" ");

  return (
    <div className='w-full md:w-[40%] h-full relative pt-[5px]'>
      <div className='absolute text-white left-[5%] top-[10px] md:top-[70px] lg:top-[130px] text-[20px] md:text-[40px] lg:text-[55px] w-[80%] leading-snug'>
        <p>
          <span className='block sm:inline'>{firstHalf}</span>
          <span className='block sm:inline'> {secondHalf}</span>
        </p>
        <p className='hidden lg:block'>{heroData.text2}</p>
      </div>

      <div className='absolute top-[160px] sm:top-[40vh] md:top-[46vh] lg:top-[80vh] left-[10%] flex items-center justify-center gap-[10px] text-white text-[10px] md:text-[15px] lg:text-[25px]'>
        {[0, 1, 2, 3].map(i => (
          <FaCircle
            key={i}
            className={`w-[14px] cursor-pointer ${heroCount === i ? "fill-black" : "fill-white"}`}
            onClick={() => setHeroCount(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default Hero;
