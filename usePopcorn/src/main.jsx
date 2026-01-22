import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import StarRating from "./Component/StarRating.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StarRating maxRating={10} />
  </StrictMode>,
);
