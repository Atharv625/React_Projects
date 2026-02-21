import React from "react";

const NextButton = ({ dispatch, answer, index, numQuestions }) => {
  // If no answer selected → don't show button
  if (answer === null) return null;

  // If last question → show Finish button
  if (index === numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
  }

  // Otherwise show Next
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      Next
    </button>
  );
};

export default NextButton;