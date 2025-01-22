import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import "@fontsource/poppins/100.css";
import "@fontsource/poppins/200.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/900.css";

const STRICT_MODE = import.meta.env.VITE_REACT_APP_ENABLE_STRICT_MODE;
const rootComponent =
  STRICT_MODE === "true" ? (
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  ) : (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
createRoot(document.getElementById("root")).render(rootComponent);
