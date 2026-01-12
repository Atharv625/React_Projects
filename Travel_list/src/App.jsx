import { div, h1, option } from "framer-motion/client";
import React from "react";
import "./index.css";
const App = () => {
  const initial = [
    { id: 1, desc: "Passport", quantity: 2, packed: true },
    { id: 2, desc: "Flight Tickets", quantity: 1, packed: false },
    { id: 3, desc: "Travel Insurance Documents", quantity: 1, packed: false },
    { id: 4, desc: "Clothes", quantity: 7, packed: false },
    { id: 5, desc: "Toiletry Kit", quantity: 1, packed: false },
    { id: 6, desc: "Phone Charger & Power Bank", quantity: 1, packed: false },
  ];

  function Logo() {
    return <h1>🌴 Far Away 💼</h1>;
  }
  function Form() {
    return (
      <form className="add-form">
        <h3>What do you need for Your 🤑 trip?</h3>
        <select name="" id="">
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input type="text" placeholder="Item..." />
        <button>Add</button>
      </form>
    );
  }
  function PackingList() {
    return (
      <div className="list">
        <ul>
          {initial.map((item) => (
            <Item item={item} key={item.id} />
          ))}
        </ul>
      </div>
    );
  }
  function States() {
    return (
      <>
        <footer className="stats">
          <em>💼 You have X items on your list, and you already packed</em>
        </footer>
      </>
    );
  }
  function Item({ item }) {
    return (
      <li>
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          {item.quantity} {item.desc}
        </span>
        <button>❌</button>
      </li>
    );
  }
  return (
    <>
      <Logo />
      <Form />
      <PackingList />
      <States />
    </>
  );
};

export default App;
