import React, { useState } from "react";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis.",
  },
];

const App = () => {
  const [openIndex, setOpenIndex] = useState(null);

  function AccordionItem({ num, title, text, isOpen, onToggle }) {
    return (
      <div className="flex flex-col m-4 border border-gray-400 w-[350px] p-3">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={onToggle}
        >
          <div className="flex gap-2">
            <span className="font-bold">{num + 1}.</span>
            <h1 className="font-medium">{title}</h1>
          </div>
          <span className="text-xl font-bold">{isOpen ? "−" : "+"}</span>
        </div>

        {isOpen && <p className="mt-2 text-gray-600">{text}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {faqs.map((ele, index) => (
        <AccordionItem
          key={index}
          num={index}
          title={ele.title}
          text={ele.text}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
};

export default App;
