import React, { useState } from 'react';

// eslint-disable-next-line
const Button = (prop: { onClick: any; text: string; type: string }) => {
  const { onClick, text, type } = prop;
  const [rotate, setRotate] = useState(true);
  const IconsPathD: { [key: string]: string } = {
    refresh:
      'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    clipboard:
      'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  };

  function handleClick() {
    onClick();
    setRotate(true);
  }

  return (
    <div className="text-center">
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 font-semibold text-white bg-red-400 rounded-lg shadow-md hover:bg-red-600 focus:outline-none"
        onClick={handleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-8 h-8 transition duration-300 ease-in-out transform-gpu ${
            rotate ? 'animate-spin-360' : ''
          } `}
          onAnimationEnd={() => {
            setRotate(false);
          }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={IconsPathD[type]}
          />
        </svg>
        <span className="ml-1 text-xl font-semibold ">{text}</span>
      </button>
    </div>
  );
};

export default Button;
