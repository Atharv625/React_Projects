import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  return (
    <div className="w-[450px] m-10 border-[4px] border-[#222]">
      <img src="jonas.jpeg" alt="Jonas Schmedtmann" className="w-full block" />

      <div className="p-8 pt-6">
        <h1 className="mb-3 text-[32px] font-bold">Jonas Schmedtmann</h1>

        <p className="text-[16px]">
          Full-stack web developer and teacher at Udemy. When not coding or
          preparing a course, I like to play board games, to cook (and eat), or
          to just enjoy the Portuguese sun at the beach.
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          <Skill data="React" emoji="⚛️" color="#61dafb" />
          <Skill data="JavaScript" emoji="🟨" color="#f7df1e" />
          <Skill data="HTML" emoji="📄" color="#e34c26" />
          <Skill data="CSS" emoji="🎨" color="#264de4" />
        </div>
      </div>
    </div>
  );
}

function Skill({ data, emoji, color }) {
  return (
    <div
      className="flex items-center gap-2 font-medium rounded-[5px] py-[2px] px-[12px]"
      style={{ backgroundColor: color }}
    >
      <span>{data}</span>
      <span>{emoji}</span>
    </div>
  );
}

export default App;
