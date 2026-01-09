import React, { useState } from "react";
import "./index.css";

const messages = [
  "Learn React ✡️",
  "Apply for jobs 🙈",
  "Invest your new income 🤑💵",
];

const App = () => {
  const [step, setStep] = useState(1);

  function nextStep() {
    if (step < messages.length) setStep(step + 1);
  }

  function prevStep() {
    if (step > 1) setStep(step - 1);
  }

  return (
    <div className="steps">
      <div className="numbers">
        {[1, 2, 3].map((num) => (
          <div key={num} className={step >= num ? "active" : ""}>
            {num}
          </div>
        ))}
      </div>

      <p className="message">{messages[step - 1]}</p>

      <div className="buttons">
        <button
          onClick={prevStep}
          className="bg-[#7950f2] active:translate-y-1"
        >
          Previous
        </button>

        <button
          onClick={nextStep}
          className="bg-[#7950f2] active:translate-y-1"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
