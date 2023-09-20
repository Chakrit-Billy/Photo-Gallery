import React from "react";
import ReactDOM from "react-dom/client";
import { AppContextProvider } from "../AppContext.jsx";
import "./index.css";

import Authen from "../Authen.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppContextProvider>
      <Authen />
    </AppContextProvider>
  </React.StrictMode>
);
