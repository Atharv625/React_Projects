import { div, h1, option } from "framer-motion/client";
import React, { useState } from "react";
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

  const [items, setItems] = useState(initial);
  function Logo() {
    return <h1>🌴 Far Away 💼</h1>;
  }
  function Form() {
    const [desc, setDesc] = useState("");
    const [quantity, setQuantity] = useState(1);
    function handleSubmit(e) {
      e.preventDefault();
      if (!desc) return;
      const newItem = { desc, quantity, packed: false, id: Date.now() };
      console.log(newItem);
      setItems((prevItems) => [...prevItems, newItem]);
      setDesc("");
      setQuantity(1);
    }
    return (
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>What do you need for Your 🤑 trip?</h3>
        <select
          name=""
          id=""
          value={quantity}
          onChange={(e) => {
            console.log(e.target.value);
            setQuantity(Number(e.target.value));
          }}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Item..."
          value={desc}
          onChange={(e) => {
            console.log(e.target.value);
            setDesc(e.target.value);
          }}
        />
        <button>Add</button>
      </form>
    );
  }
  function PackingList() {
    return (
      <div className="list">
        <ul>
          {items.map((item) => (
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
