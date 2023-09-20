import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppContextProvider } from "../AppContext.jsx";
import AddAlbum from "./AddAlbum.jsx";
import SignInSide from "./SignInSide.jsx";
import SignUp from "./SignUp.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppContextProvider>
      <Router>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/add' element={<AddAlbum />} />
          <Route path='/login' element={<SignInSide />} />
          <Route path='/register' element={<SignUp />} />
        </Routes>
      </Router>
    </AppContextProvider>
  </React.StrictMode>
);
