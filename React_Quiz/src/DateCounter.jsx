import { useReducer, useState } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "inc":
      return state + action.payload;
    case "dec":
      return state - action.payload;
    case "setCount":
      return action.payload;
    default:
      return state;
  }
}

function DateCounter() {
  const [count, dispatch] = useReducer(reducer, 0);
  const [step, setStep] = useState(1);

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec", payload: step });
  };

  const inc = function () {
    dispatch({ type: "inc", payload: step });
  };

  const defineCount = function (e) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    setStep(Number(e.target.value));
  };

  const reset = () => {
    dispatch({ type: "setCount", payload: 0 });
    setStep(1);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-6 p-8 bg-gray-800 text-white rounded-2xl shadow-xl w-96 mx-auto mt-10">
      {/* Step Slider */}
      <div className="flex items-center gap-4 w-full">
        <input
          type="range"
          min="1"
          max="10"
          value={step}
          onChange={defineStep}
          className="w-full accent-teal-500"
        />
        <span className="text-lg font-semibold w-8 text-center">{step}</span>
      </div>

      {/* Counter Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={dec}
          className="bg-teal-600 hover:bg-teal-700 transition px-4 py-2 rounded-lg text-xl font-bold"
        >
          −
        </button>

        <input
          type="number"
          value={count}
          onChange={defineCount}
          className="w-20 text-center bg-gray-700 rounded-lg py-2"
        />

        <button
          onClick={inc}
          className="bg-teal-600 hover:bg-teal-700 transition px-4 py-2 rounded-lg text-xl font-bold"
        >
          +
        </button>
      </div>

      {/* Date Display */}
      <p className="text-xl font-medium">{date.toDateString()}</p>

      {/* Reset Button */}
      <button
        onClick={reset}
        className="bg-orange-500 hover:bg-orange-600 transition px-4 py-2 rounded-lg font-semibold"
      >
        Reset
      </button>
    </div>
  );
}
export default DateCounter;
