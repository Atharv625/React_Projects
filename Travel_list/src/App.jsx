import { div, h1, option } from "framer-motion/client";
import React, { useState, useEffect } from "react";
import "./index.css";
const App = () => {
  const initial = [
    { id: 1, desc: "Passport", quantity: 2, packed: false },
    { id: 2, desc: "Flight Tickets", quantity: 1, packed: false },
    { id: 3, desc: "Travel Insurance Documents", quantity: 1, packed: false },
    { id: 4, desc: "Clothes", quantity: 7, packed: false },
    { id: 5, desc: "Toiletry Kit", quantity: 1, packed: false },
    { id: 6, desc: "Phone Charger & Power Bank", quantity: 1, packed: false },
  ];

  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem("packingItems");
    return storedItems ? JSON.parse(storedItems) : initial;
  });
  useEffect(() => {
    localStorage.setItem("packingItems", JSON.stringify(items));
  }, [items]);

  function Logo() {
    return <h1>🌴 Far Away 💼</h1>;
  }
  function handleToggle(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function handleDelete(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleSort(type) {
    if (type === "input") {
      setItems(initial);
    }

    if (type === "desc") {
      setItems((items) =>
        [...items].sort((a, b) => a.desc.localeCompare(b.desc))
      );
    }

    if (type === "packed") {
      setItems((items) =>
        [...items].sort((a, b) => Number(a.packed) - Number(b.packed))
      );
    }

    if (type === "quantity") {
      setItems((items) => [...items].sort((a, b) => b.quantity - a.quantity));
    }
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
            <li key={item.id}>
              <input
                type="checkbox"
                className="scale-150 accent-[#e5771f]"
                checked={item.packed}
                onChange={() => handleToggle(item.id)}
              />
              <Item item={item} onDelete={handleDelete} />
            </li>
          ))}
        </ul>
        {items.length !== 0 && (
          <div className="flex justify-end items-center gap-4 mt-4">
            <select
              className="px-3 py-1 border rounded"
              onChange={(e) => handleSort(e.target.value)}
            >
              <option value="input">Sort items</option>
              <option value="desc">Sort by Description</option>
              <option value="packed">Sort by Packed</option>
              <option value="quantity">Sort by Quantity</option>
            </select>

            <button onClick={Reset} className="px-3 py-1">
              Reset
            </button>
          </div>
        )}
      </div>
    );
  }
  function States() {
    const totalItems = items.length;
    const packedItems = items.filter((item) => item.packed).length;
    const percentage =
      totalItems === 0 ? 0 : Math.round((packedItems / totalItems) * 100);

    return (
      <footer className="stats">
        <em>
          💼 You have {totalItems} items on your list, and you already packed{" "}
          {packedItems} ({percentage}%)
        </em>
      </footer>
    );
  }

  function Item({ item, onDelete }) {
    return (
      <>
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          {item.quantity} {item.desc}
        </span>

        {!item.packed && <button onClick={() => onDelete(item.id)}>❌</button>}
      </>
    );
  }

  function Reset() {
    setItems([]);
    localStorage.removeItem("packingItems");
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
