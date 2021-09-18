import { useState, useEffect } from "react";

const PasswordGenerator = () => {
  const defaultPasswordLenght: number = 12;
  const upperLetters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerLetters: string = "abcdefghijklmnopqrstuvwxyz";
  const numbers: string = "0123456789";
  const symbols: string = "!@#$%^&*()_+=";

  let IconsPathD: { [key: string]: string } = {
    minus: "123",
    plus: "456",
    refresh:
      "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
    clipboard:
      "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  };
  const getLowercase = (): string => {
    return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
  };

  const getUppercase = (): string => {
    return upperLetters[Math.floor(Math.random() * upperLetters.length)];
  };

  const getNumber = (): string => {
    return numbers[Math.floor(Math.random() * numbers.length)];
  };

  const getSymbol = (): string => {
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  const generatePassword = (len: number): string => {
    let password: string = "";

    for (let i = password.length; i < len; i++) {
      const x = generateX();
      password += x;
    }

    return password;
  };

  const generateX = () => {
    let chars: string[] = [];
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

    if (chars.length === 0) return "";

    return chars[Math.floor(Math.random() * chars.length)];
  };

  const [passLen, setPassLen] = useState(defaultPasswordLenght);
  const [pwd, setPwd] = useState("");
  const [isUpperLetterChecked, setIsUpperLetterChecked] = useState(true);
  const [isLowerLetterChecked, setIsLowerLetterChecked] = useState(true);
  const [isNumberChecked, setIsNumberChecked] = useState(true);
  const [isSymbolsChecked, setIsSymbolsChecked] = useState(true);
  const [rotate, setRotate] = useState(false);

  interface ICheckbox {
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    symbols: boolean;
  }

  function ButtonUpDown(prop: { type: string }) {
    let isUp = prop.type === "up" ? true : false;

    return (
      <button
        className={`flex items-center justify-center h-full text-white bg-red-400 shadow-md outline-none cursor-pointer hover:bg-red-600 w-14 focus:ring-2 focus:ring-red-200 ${
          isUp ? "rounded-r-lg" : "rounded-l-lg"
        }`}
        onClick={() => {
          handleUpDownPasslen(isUp);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-5 h-5 transition duration-300 ease-in-out  transform-gpu ${
            rotate ? "animate-spin-360" : ""
          } `}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d={
              isUp
                ? "M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                : "M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            }
            clipRule="evenodd"
          />
        </svg>
      </button>
    );
  }

  const ButtonPrimaty = (prop: { text: string; type: string }) => {
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
              rotate ? "animate-spin-360" : ""
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
              d={IconsPathD[prop.type]}
            />
          </svg>
          <span className="ml-1 text-xl font-semibold ">{prop.text}</span>
        </button>
      </div>
    );
  };

  const handlePassLenChange = (event: any) => {
    let regexpNumber = new RegExp("^[0-9]+$");
    let passLenString: string = event.target.value;
    if (regexpNumber.test(passLenString)) {
      let passLenValue = Number(passLenString);
      if (passLenValue < 1) {
        passLenValue = 1;
      } else if (passLenValue > 50) {
        passLenValue = 50;
      }
      if (passLenValue !== passLen) {
        setPassLen(passLenValue);
        setRotate(true);
      }
    }
  };

  const handlePasswordChange = (event: any) => {};

  const handleUpDownPasslen = (isUp: boolean) => {
    if (isUp) {
      if (passLen < 50) {
        setPassLen(passLen + 1);
      }
    } else {
      if (passLen > 1) {
        setPassLen(passLen - 1);
      }
    }
  };

  const handlePWGButton = () => {
    setRotate(true);
    setPwd(generatePassword(passLen));
  };

  useEffect(() => {
    setPwd(generatePassword(passLen));
  }, [generatePassword, passLen]);
  return (
    <div className="flex flex-col items-center justify-center h-full bg-green-100">
      <h2 className="mt-8 text-5xl font-bold text-center text-green-600">
        Generate a Secure Password
      </h2>

      <div className="flex flex-col items-center justify-center w-full p-4 m-4 bg-white rounded-xl md:w-4/6">
        <div className="items-center w-full px-10 py-8 overflow-hidden text-center bg-gray-200 md:w-3/4 rounded-xl">
          <input
            className="w-full text-2xl font-semibold text-center border border-green-500 rounded-lg md:w-11/12 focus:outline-none focus:ring-2 focus:ring-green-200"
            value={pwd}
            type="text"
            onChange={handlePasswordChange}
          />
        </div>
        <div className="flex flex-row justify-around w-full p-4 m-2 overflow-hidden md:w-3/4 rounded-t-xl ">
          <ButtonPrimaty type="clipboard" text="Copy" />
          <ButtonPrimaty type="refresh" text="Create" />
        </div>

        <div className="flex flex-row justify-around w-full p-4 m-2 overflow-hidden bg-gray-100 md:w-3/4 rounded-xl">
          <div>
            <div className="relative flex flex-row w-full h-10 mt-1 bg-transparent rounded-lg">
              <ButtonUpDown type={"down"} />
              <input
                type="text"
                className="flex items-center w-full font-semibold text-center text-gray-700 bg-white border-t border-b border-red-300 outline-none md:w-11/12 focus:ring-2 focus:ring-red-200 focus:outline-none text-md hover:text-black focus:text-black md:text-basecursor-default"
                name="custom-input-number"
                value={passLen}
                onChange={handlePassLenChange}
              ></input>
              <ButtonUpDown type={"up"} />
            </div>
          </div>
          <div className="flex flex-col ">
            <div className="flex items-center px-2 flow-row">
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
              <label
                htmlFor="upperLetterCheckbox"
                className="ml-2 text-indigo-600"
              >
                Upper Letter
              </label>
            </div>
            <div className="flex items-center px-2 flow-row">
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
              <label
                htmlFor="lowerLetterCheckbox"
                className="ml-2 text-indigo-600"
              >
                Lower Letter
              </label>
            </div>
            <div className="flex items-center px-2 flow-row">
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
              <label htmlFor="numberCheckbox" className="ml-2 text-indigo-600">
                Number
              </label>
            </div>
            <div className="flex items-center px-2 flow-row">
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
              <label htmlFor="symbolsCheckbox" className="ml-2 text-indigo-600">
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
