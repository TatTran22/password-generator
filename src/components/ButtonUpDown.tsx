import React, { useState } from 'react';

// eslint-disable-next-line
function ButtonUpDown(prop: { type: string; onClick: any }) {
  const { type, onClick } = prop;
  const isUp = type === 'up';
  const [rotate, setRotate] = useState(true);

  const handleUpDown = () => {
    onClick();
    setRotate(true);
  };
  return (
    <button
      type="button"
      className={`flex items-center justify-center h-full text-white bg-red-400 shadow-md outline-none cursor-pointer hover:bg-red-600 w-14 focus:ring-2 focus:ring-red-200 ${
        isUp ? 'rounded-r-lg' : 'rounded-l-lg'
      }`}
      onClick={handleUpDown}
      onAnimationEnd={() => {
        setRotate(false);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-5 h-5 transition duration-300 ease-in-out  transform-gpu ${
          rotate ? 'animate-spin-360' : ''
        } `}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d={
            isUp
              ? 'M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z'
              : 'M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
          }
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}

export default ButtonUpDown;
