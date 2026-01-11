import React, { useState } from "react";
import "./index.css";

const messages = [
  "Learn React ✡️",
  "Apply for jobs 🙈",
  "Invest your new income 🤑💵",
];

const App = () => {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function close() {
    setIsOpen(false);
  }

  function nextStep() {
    if (step < messages.length) setStep(step + 1);
  }

  function prevStep() {
    if (step > 1) setStep(step - 1);
  }

  return (
    <>
      {isOpen ? (
        <div className="steps">
          {/* Close button */}
          <button onClick={close} className="close">
            ✖
          </button>

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
      ) : (
        <button onClick={() => setIsOpen(true)}>Open</button>
      )}
    </>
  );
};

export default App;
