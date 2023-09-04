import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app";
import { ContextProvider } from "./contexts/ContextProvider";

// entry point
ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <App />
  </ContextProvider>
);
