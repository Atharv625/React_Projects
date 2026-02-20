import React from "react";

const Options = ({ question, dispatch, answer }) => {
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          key={option}
          className={`btn btn-option 
            ${answer === index ? "answer" : ""} 
            ${
              answer !== null
                ? index === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          disabled={answer !== null}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
