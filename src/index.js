import React from "react";
import ReactDOM from "react-dom";
import { useNavigate, BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import "./index.css";
import { App } from "./App.js";
import * as serviceWorker from "./serviceWorker";
import ErrorHandler from "./error-handler.component";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorHandler>
        <Routes>
          <Route path="/*" element={<App />}>
          </Route>
        </Routes>
      </ErrorHandler>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();

