import React, { useCallback, useEffect, useRef, useState } from "react";

export default function App() {
  const [length, setLength] = useState(7);
  const [isNumbers, setIsNumbers] = useState(false);
  const [isCharacters, setIsCharacters] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (isNumbers) str += "1234567890";
    if (isCharacters) str += "~`!@#$%^&*-_+={}[]";

    for (let i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * str.length);
      pass += str.charAt(index);
    }

    setPassword(pass);
  }, [isNumbers, isCharacters, length]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  });

  useEffect(() => {
    passwordGenerator();
  }, [isNumbers, isCharacters, length]);

  return (
    <div className="h-screen bg-black flex justify-center items-center">
      <div className="w-[70%] max-w-xl h-[17%] bg-gray-600 rounded-2xl">
        <div className="h-[70%] flex justify-center items-center">
          <input
            className="bg-white w-[80%] h-[60%] md:h-[65%] outline-none rounded-l-2xl md:text-xl overflow-auto pl-3 pr-3"
            type="text"
            readOnly
            value={password}
            ref={passwordRef}
          />
          <button
            onClick={copyPassword}
            className="bg-blue-700 w-[15%] h-[60%] md:h-[65%] rounded-r-2xl text-white text-xs md:text-sm cursor-pointer"
            type="button"
          >
            copy
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-2 md:gap-5 justify-center items-center ">
          <div className="md:w-[40%] flex gap-x-1 ">
            <input
              className="cursor-pointer"
              type="range"
              name="lengthBar"
              id="lengthBar"
              value={length}
              min={5}
              max={14}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="text-xs md:text-sm" htmlFor="lengthBar">Length ({length})</label>
          </div>

          <Checkers
            name={"numbers"}
            string={"Numbers"}
            isChacker={isNumbers}
            setChecker={setIsNumbers}
          />
          <Checkers
            name={"characters"}
            string={"Charaters"}
            isChacker={isCharacters}
            setChecker={setIsCharacters}
          />
        </div>
      </div>
    </div>
  );
}

function Checkers({ name, isChacker, setChecker, string }) {
  return (
    <div className="flex gap-x-1 text-xs md:text-sm">
      <input
        className="cursor-pointer"
        type="checkbox"
        name={name}
        id={name}
        defaultChecked={isChacker}
        onChange={() => {
          setChecker((prev) => !prev);
        }}
      />
      <label htmlFor={name}>{string}</label>
    </div>
  );
}
