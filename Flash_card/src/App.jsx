import React, { useState } from "react";

const questions = [
  {
    id: 3457,
    question: "What language is React based on?",
    answer: "JavaScript",
  },
  {
    id: 7336,
    question: "What are the building blocks of React apps?",
    answer: "Components",
  },
  {
    id: 8832,
    question: "What's the name of the syntax we use to describe a UI in React?",
    answer: "JSX",
  },
  {
    id: 1297,
    question: "How to pass data from parent to child components?",
    answer: "Props",
  },
  {
    id: 9103,
    question: "How to give components memory?",
    answer: "useState hook",
  },
  {
    id: 2002,
    question:
      "What do we call an input element that is completely synchronised with state?",
    answer: "Controlled element",
  },
];
const App = () => {
  return (
    <div className="border-box font-sans">
      <FlashCard />
    </div>
  );
};
function FlashCard() {
  const [selected, setSelected] = useState(null);
  function handle(id) {
    setSelected(id !== selected ? id : null);
  }
  return (
    <div className="grid grid-cols-3 gap-5 m-4">
      {questions.map((item) => (
        <div
          key={item.id}
          onClick={() => handle(item.id)}
          className={
            item.id === selected
              ? "selected"
              : " border border-[#e7e7e7] bg-[#f7f7f7] rounded-[7px] aspect-[2/1] flex items-center justify-center  text-center p-[20px] cursor-pointer"
          }
        >
          <p>{item.id === selected ? item.answer : item.question}</p>
        </div>
      ))}
    </div>
  );
}
export default App;
