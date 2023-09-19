import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppContextProvider } from "../AppContext.jsx";
import AddAlbum from "./AddAlbum.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppContextProvider>
      <Router>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/add' element={<AddAlbum />} />
        </Routes>
      </Router>
    </AppContextProvider>
  </React.StrictMode>
);
