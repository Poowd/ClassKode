import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import bootstrap from "bootstrap"; //do not remove -- will disable some frontend functionalities like dropdowns
import "./css/CustomColours.css";
import "./css/Colours.css";
import "./css/StandardColours.css";
import "./css/Animation.css";
import "./App.css";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
