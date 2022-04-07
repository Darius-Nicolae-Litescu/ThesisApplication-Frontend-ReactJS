import React from "react";
import ReactDOM from "react-dom";
import { useNavigate, BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import "./index.css";
import {App} from "./App.js";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />}>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
