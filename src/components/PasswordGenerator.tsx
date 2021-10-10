/* eslint-disable no-nested-ternary */
import React, { useCallback, useEffect, useState } from 'react';
import zxcvbn from 'zxcvbn';
import Switch from './Switch';
import Button from './Button';
import ButtonUpDown from './ButtonUpDown';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const PasswordGenerator = () => {
  const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+=';
  const [passLen, setPassLen] = useState(16);
  const [pwd, setPwd] = useState('');
  const [isUpperLetterChecked, setIsUpperLetterChecked] = useState(true);
  const [isLowerLetterChecked, setIsLowerLetterChecked] = useState(true);
  const [isNumberChecked, setIsNumberChecked] = useState(true);
  const [isSymbolsChecked, setIsSymbolsChecked] = useState(true);
  const [pwdStrength, setPwdStrength] = useState(0);
  const getLowercase = () => lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
  const getUppercase = () => upperLetters[Math.floor(Math.random() * upperLetters.length)];
  const getNumber = () => numbers[Math.floor(Math.random() * numbers.length)];
  const getSymbol = () => symbols[Math.floor(Math.random() * symbols.length)];

  const generatePassword = useCallback(
    (passLength: number) => {
      let password = '';

      for (let i = password.length; i < passLength; i += 1) {
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
        password += chars[Math.floor(Math.random() * chars.length)];
      }
      const zxc = zxcvbn(password);
      setPwdStrength(zxc.score);
      setPwd(password);
      return undefined;
    },
    [
      isLowerLetterChecked,
      isNumberChecked,
      isSymbolsChecked,
      isUpperLetterChecked,
    ],
  );

  const handleUpDownPassLen = (isUp: boolean) => {
    if (isUp) {
      if (passLen < 50) {
        setPassLen(passLen + 1);
      }
    } else if (passLen > 1) {
      setPassLen(passLen - 1);
    }
  };

  const handlePWGButton = () => {
    generatePassword(passLen);
  };

  const handleCopyButton = () => {
    navigator.clipboard.writeText(pwd);
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
  }, [generatePassword, passLen]);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-gray-700 to-gray-800">
      <div className="relative flex flex-col items-center justify-center w-full p-4 bg-teal-100 rounded-xl md:w-4/6">
        <h1 className="relative inline-flex text-5xl font-bold text-center text-red-500 ">
          Generate a Secure Password
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center w-full p-4 m-4 bg-green-100 rounded-xl md:w-4/6">
        <div className="items-center w-full px-10 py-8 overflow-hidden text-center md:w-3/4 rounded-xl">
          <input
            className="w-full text-2xl font-normal text-center border border-green-500 rounded-lg md:w-11/12 focus:outline-none focus:ring-2 focus:ring-green-200"
            value={pwd}
            readOnly
            type="text"
          />
          <div className="w-full mt-3 shadow bg-grey-light">
            <div
              // eslint-disable-next-line no-nested-ternary
              className={`py-1 h-3 rounded-xl text-xs leading-none text-center text-white ${
                pwdStrength === 0
                  ? 'bg-red-400'
                  : pwdStrength === 1
                    ? 'bg-orange-400'
                    : pwdStrength === 2
                      ? 'bg-blue-400'
                      : pwdStrength === 3
                        ? 'bg-teal-400'
                        : 'bg-green-400'
              }`}
              style={{
                width: `${(pwdStrength !== 0 ? pwdStrength * 100 : 400) / 4}%`,
              }}
            />
          </div>
          <div className="text-xl">
            {pwdStrength === 0
              ? 'Password too short!'
              : pwdStrength === 1
                ? 'Weak'
                : pwdStrength === 2
                  ? 'Medium'
                  : pwdStrength === 3
                    ? 'Strong'
                    : 'Super Strong'}
          </div>
        </div>
        <div className="flex flex-row justify-around w-full p-4 m-2 overflow-hidden md:w-3/4 rounded-t-xl ">
          <Button type="clipboard" text="Copy" onClick={handleCopyButton} />
          <Button type="refresh" text="Create" onClick={handlePWGButton} />
        </div>

        <div className="flex flex-row justify-around w-full p-4 mx-2 overflow-hidden md:w-3/4 rounded-xl">
          <div>
            <div className="relative flex flex-row w-full h-10 mt-1 bg-transparent rounded-lg">
              <ButtonUpDown
                type="down"
                onClick={() => {
                  handleUpDownPassLen(false);
                }}
              />
              <input
                type="text"
                className="flex items-center w-full font-semibold text-center text-gray-700 bg-white border-t border-b border-red-300 outline-none md:w-11/12 focus:ring-2 focus:ring-red-200 focus:outline-none text-md hover:text-black focus:text-black md:text-basecursor-default"
                name="custom-input-number"
                value={passLen}
                onChange={handlePassLenChange}
              />
              <ButtonUpDown
                type="up"
                onClick={() => {
                  handleUpDownPassLen(true);
                }}
              />
            </div>
          </div>
          <div className="flex flex-col ">
            <Switch
              isChecked={isUpperLetterChecked}
              label="Upper Letter"
              onChange={() => {
                setIsUpperLetterChecked(!isUpperLetterChecked);
              }}
            />
            <Switch
              isChecked={isLowerLetterChecked}
              label="Lower Letter"
              onChange={() => {
                setIsLowerLetterChecked(!isLowerLetterChecked);
              }}
            />
            <Switch
              isChecked={isNumberChecked}
              label="Number"
              onChange={() => {
                setIsNumberChecked(!isNumberChecked);
              }}
            />
            <Switch
              isChecked={isSymbolsChecked}
              label="Symbols"
              onChange={() => {
                setIsSymbolsChecked(!isSymbolsChecked);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
