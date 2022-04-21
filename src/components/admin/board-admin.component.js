import React from "react";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  useParams,
} from "react-router-dom";

import AdminPanelDropdown from "./admin-panel-dropdown.component";

export const BoardAdmin = () => {
  return <AdminPanelDropdown />;
};
