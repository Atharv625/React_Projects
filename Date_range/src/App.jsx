import React, { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const date = new Date();
  date.setDate(date.getDate() + count);

  return (
    <div>
      {/* Slider */}
      <div className="flex justify-center items-center">
        <input
          type="range"
          min="-10"
          max="10"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        />
        <p className="p-2">Value: {step}</p>
      </div>

      {/* Buttons + Input */}
      <div className="flex justify-center gap-2">
        <button onClick={() => setCount((c) => c + step)}>+</button>

        <input
          type="number"
          className="border border-blue-400 text-center w-20"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />

        <button onClick={() => setCount((c) => c - step)}>-</button>
      </div>

      {/* Date */}
      <div className="flex justify-center">
        <h2 className="mt-2 text-4xl">
          {count === 0
            ? "Today is "
            : count > 0
            ? `${count} days from today is `
            : `${Math.abs(count)} days ago was `}
          {date.toDateString()}
        </h2>
      </div>

      {/* Reset */}
      {count !== 0 || step !== 1 ? (
        <div className="flex justify-center">
          <button
            onClick={() => {
              setCount(0);
              setStep(1);
            }}
          >
            Reset
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default App;
