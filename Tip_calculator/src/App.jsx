import React, { useState } from "react";

const App = () => {
  const [cost, setCost] = useState(0);
  const [tip1, setTip1] = useState(0);
  const [tip2, setTip2] = useState(0);

  const averageTip = (tip1 + tip2) / 2;
  const total = cost + (cost * averageTip) / 100;
  const tipa = (cost * averageTip) / 100;
  return (
    <div>
      <div className="flex m-4 gap-2">
        <h1>How much was the bill?</h1>
        <input
          type="number"
          className="border border-gray-500"
          value={cost}
          onChange={(e) => setCost(Number(e.target.value))}
        />
      </div>

      <div className="flex m-4 gap-2">
        <h1>How did you like the service?</h1>
        <select
          className="border border-gray-500"
          value={tip1}
          onChange={(e) => setTip1(Number(e.target.value))}
        >
          <option value="0">Dissatisfied (0%)</option>
          <option value="5">It was okay (5%)</option>
          <option value="10">It was good (10%)</option>
          <option value="20">Absolutely amazing (20%)</option>
        </select>
      </div>

      <div className="flex m-4 gap-2">
        <h1>How did your friend like the service?</h1>
        <select
          className="border border-gray-500"
          value={tip2}
          onChange={(e) => setTip2(Number(e.target.value))}
        >
          <option value="0">Dissatisfied (0%)</option>
          <option value="5">It was okay (5%)</option>
          <option value="10">It was good (10%)</option>
          <option value="20">Absolutely amazing (20%)</option>
        </select>
      </div>

      {cost > 0 && (
        <h2 className="m-4 font-bold">
          You pay ₹{total.toFixed(2)} (₹{cost}+₹{tipa})
        </h2>
      )}
      <button
        onClick={() => {
          setCost(0);
          setTip1(0);
          setTip2(0);
        }}
        className="border border-gray-400 m-4 bg-gray-400 active:translate-1 p-2 rounded-3xl"
      >
        Reset
      </button>
    </div>
  );
};

export default App;
