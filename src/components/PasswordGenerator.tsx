import React, { useCallback, useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const PasswordGenerator = () => {
  const defaultPasswordLength = 12;
  const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+=';
  const [passLen, setPassLen] = useState(defaultPasswordLength);
  const [pwd, setPwd] = useState('');
  const [isUpperLetterChecked, setIsUpperLetterChecked] = useState(true);
  const [isLowerLetterChecked, setIsLowerLetterChecked] = useState(true);
  const [isNumberChecked, setIsNumberChecked] = useState(true);
  const [isSymbolsChecked, setIsSymbolsChecked] = useState(true);
  const IconsPathD: { [key: string]: string } = {
    minus: '123',
    plus: '456',
    refresh:
      'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    clipboard:
      'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  };
  const getLowercase = () => lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
  const getUppercase = () => upperLetters[Math.floor(Math.random() * upperLetters.length)];
  const getNumber = () => numbers[Math.floor(Math.random() * numbers.length)];
  const getSymbol = () => symbols[Math.floor(Math.random() * symbols.length)];

  const generateX = () => {
    const chars: string[] = [];
    if (isUpperLetterChecked) {
      chars.push(getUppercase());
    }

    if (isLowerLetterChecked) {
      chars.push(getLowercase());
    }

    if (isNumberChecked) {
      chars.push(getNumber());
    }

    if (isSymbolsChecked) {
      chars.push(getSymbol());
    }

    if (chars.length === 0) return '';

    return chars[Math.floor(Math.random() * chars.length)];
  };

  const generatePassword = useCallback((passLength: number) => {
    let password = '';

    for (let i = password.length; i < passLength; i += 1) {
      const x = generateX();
      password += x;
    }
    setPwd(password);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpDownPassLen = (isUp: boolean) => {
    if (isUp) {
      if (passLen < 50) {
        setPassLen(passLen + 1);
        generatePassword(passLen + 1);
      }
    } else if (passLen > 1) {
      setPassLen(passLen - 1);
      generatePassword(passLen - 1);
    }
  };

  const handlePWGButton = () => {
    generatePassword(passLen);
  };

  function ButtonUpDown(prop: { type: string }) {
    const { type } = prop;
    const isUp = type === 'up';

    let rotate = true;
    return (
      <button
        type="button"
        className={`flex items-center justify-center h-full text-white bg-red-400 shadow-md outline-none cursor-pointer hover:bg-red-600 w-14 focus:ring-2 focus:ring-red-200 ${
          isUp ? 'rounded-r-lg' : 'rounded-l-lg'
        }`}
        onClick={() => {
          handleUpDownPassLen(isUp);
        }}
        onAnimationEnd={() => {
          rotate = false;
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

  const ButtonPrimary = (prop: { text: string; type: string }) => {
    const { text, type } = prop;
    let rotate = true;
    return (
      <div className="text-center">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 font-semibold text-white bg-red-400 rounded-lg shadow-md hover:bg-red-600 focus:outline-none"
          onClick={handlePWGButton}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-8 h-8  transition duration-300 ease-in-out  transform-gpu ${
              rotate ? 'animate-spin-360' : ''
            } `}
            onAnimationEnd={() => {
              rotate = false;
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePassLenChange = (event: any) => {
    const regexpNumber = new RegExp('^[0-9]+$');
    const passLenString: string = event.target.value;
    if (regexpNumber.test(passLenString)) {
      let passLenValue = Number(passLenString);
      if (passLenValue < 1) {
        passLenValue = 1;
      } else if (passLenValue > 50) {
        passLenValue = 50;
      }
      if (passLenValue !== passLen) {
        setPassLen(passLenValue);
        generatePassword(passLenValue);
      }
    }
  };

  useEffect(() => {
    generatePassword(passLen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-green-100">
      <h2 className="mt-8 text-5xl font-bold text-center text-green-600">
        Generate a Secure Password
      </h2>

      <div className="flex flex-col items-center justify-center w-full p-4 m-4 bg-white rounded-xl md:w-4/6">
        <div className="items-center w-full px-10 py-8 overflow-hidden text-center md:w-3/4 rounded-xl">
          <input
            className="w-full text-2xl font-semibold text-center border border-green-500 rounded-lg md:w-11/12 focus:outline-none focus:ring-2 focus:ring-green-200"
            value={pwd}
            type="text"
          />
        </div>
        <div className="flex flex-row justify-around w-full p-4 m-2 overflow-hidden md:w-3/4 rounded-t-xl ">
          <ButtonPrimary type="clipboard" text="Copy" />
          <ButtonPrimary type="refresh" text="Create" />
        </div>

        <div className="flex flex-row justify-around w-full p-4 mx-2 overflow-hidden bg-teal-100 md:w-3/4 rounded-xl">
          <div>
            <div className="relative flex flex-row w-full h-10 mt-1 bg-transparent rounded-lg">
              <ButtonUpDown type="down" />
              <input
                type="text"
                className="flex items-center w-full font-semibold text-center text-gray-700 bg-white border-t border-b border-red-300 outline-none md:w-11/12 focus:ring-2 focus:ring-red-200 focus:outline-none text-md hover:text-black focus:text-black md:text-basecursor-default"
                name="custom-input-number"
                value={passLen}
                onChange={handlePassLenChange}
              />
              <ButtonUpDown type="up" />
            </div>
          </div>
          <div className="flex flex-col ">
            <div className="flex items-center px-2 flow-row">
              <label
                htmlFor="upperLetterCheckbox"
                className="ml-2 text-indigo-600"
              >
                <input
                  className="w-4 h-4"
                  id="upperLetterCheckbox"
                  name="upperLetterCheckbox"
                  type="checkbox"
                  defaultChecked={isUpperLetterChecked}
                  onChange={() => {
                    setIsUpperLetterChecked(!isUpperLetterChecked);
                  }}
                />
                Upper Letter
              </label>
            </div>
            <div className="flex items-center px-2 flow-row">
              <label
                htmlFor="lowerLetterCheckbox"
                className="ml-2 text-indigo-600"
              >
                <input
                  className="w-4 h-4"
                  id="lowerLetterCheckbox"
                  name="lowerLetterCheckbox"
                  type="checkbox"
                  defaultChecked={isLowerLetterChecked}
                  onChange={() => {
                    setIsLowerLetterChecked(!isLowerLetterChecked);
                  }}
                />
                Lower Letter
              </label>
            </div>
            <div className="flex items-center px-2 flow-row">
              <label htmlFor="numberCheckbox" className="ml-2 text-indigo-600">
                <input
                  className="w-4 h-4"
                  id="numberCheckbox"
                  name="numberCheckbox"
                  type="checkbox"
                  defaultChecked={isNumberChecked}
                  onChange={() => {
                    setIsNumberChecked(!isNumberChecked);
                  }}
                />
                Number
              </label>
            </div>
            <div className="flex items-center px-2 flow-row">
              <label htmlFor="symbolsCheckbox" className="ml-2 text-indigo-600">
                <input
                  className="w-4 h-4"
                  id="symbolsCheckbox"
                  name="symbolsCheckbox"
                  type="checkbox"
                  defaultChecked={isSymbolsChecked}
                  onChange={() => {
                    setIsSymbolsChecked(!isSymbolsChecked);
                  }}
                />
                Symbols
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
