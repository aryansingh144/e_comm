import React from 'react';

function Title({ text1, text2 }) {
  return (
    <div className="pt-2 inline-flex flex-wrap gap-2 mb-3 text-[18px] sm:text-[30px] md:text-[36px] lg:text-[36px] sm:justify-center font-bold w-full">
      <p
        className="text-black bg-[#a2a2a2] backdrop-blur-xl px-4 py-2 sm:px-1 sm:py-2 md:px-6 md:py-3 rounded-xl shadow-xl"
        style={{
          WebkitBackdropFilter: 'blur(8px)',
          backdropFilter: 'blur(8px)',
        }}
      >
        {text1}{' '}
        <span className="text-black/90">{text2}</span>
      </p>
    </div>
  );
}

export default Title;
