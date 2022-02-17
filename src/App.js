import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Link } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


import AuthVerify from "./common/auth-verify";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import BootstrapNavbar from "./components/bootstrap-navbar.component";



import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from './helpers/history';

import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router history={history}>
        <BootstrapNavbar></BootstrapNavbar>
      </Router>
    );
  }
}

export default App;
