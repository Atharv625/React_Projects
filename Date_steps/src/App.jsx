import React, { useState } from "react";

const App = () => {
  const [step, setStep] = useState(1);
  const [count, setcount] = useState(1);
  const date = new Date();
  date.setDate(date.getDate() + count - 1);
  function changestep(c) {
    setStep(c);
  }

  return (
    <div>
      <div className="flex justify-center">
        <button
          className="border-2 bg-red-300 p-2 mt-4 rounded-4xl text-5xl hover:bg-pink-400 active:translate-1"
          onClick={() => {
            changestep(step - 1);
          }}
        >
          -
        </button>
        <h2 className="mt-4 ml-2 text-6xl ">Step:{step}</h2>
        <button
          className="border-2 bg-red-300 p-2 mt-4 rounded-4xl text-5xl hover:bg-pink-400 active:translate-1"
          onClick={() => {
            changestep(step + 1);
          }}
        >
          +
        </button>
      </div>
      <div className="flex justify-center">
        <button
          className="border-2 bg-blue-300 p-2 mt-4 rounded-4xl text-5xl hover:bg-pink-400 active:translate-1"
          onClick={() => {
            setcount(count - step);
          }}
        >
          -
        </button>
        <h2 className="mt-4 ml-2 text-6xl ">Count:{count}</h2>
        <button
          className="border-2 bg-blue-300 p-2 mt-4 rounded-4xl text-5xl hover:bg-pink-400 active:translate-1"
          onClick={() => {
            setcount(count + step);
          }}
        >
          +
        </button>
      </div>
      <div className="flex justify-center">
        <h2 className="mt-2 text-5xl">
          {" "}
          <span>
            {count === 0
              ? "Today is "
              : count > 0
              ? `${count} days from today is `
              : `${Math.abs(count)} days ago was `}
          </span>
          <span>{date.toDateString()}</span>
        </h2>
      </div>
    </div>
  );
};

export default App;
