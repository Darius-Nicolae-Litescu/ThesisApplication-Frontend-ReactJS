import React from "react";
import { useState, useEffect } from "react";
import AuthVerify from "../common/auth-verify";
import AuthService from "../services/auth.service";
import { Container } from "react-bootstrap";
import { getUserFromLocalStorage } from "../common/auth-verify";

import { BootStrapNavBar } from "./navbar/bootstrap-navbar.component";
import "./navbar.css";

export const MainComponent = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = getUserFromLocalStorage();
    console.log(user);
    if (user != null) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("MODERATOR"));
      setShowAdminBoard(user.roles.includes("ADMIN"));
    } else {
      AuthService.logout();
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowAdminBoard(false);
    setShowModeratorBoard(false);
    setCurrentUser(null);
  };

  return (
    <Container fluid>
      <BootStrapNavBar
        showAdminBoard={showAdminBoard}
        showModeratorBoard={showModeratorBoard}
        currentUser={currentUser}
        logOut={logOut}
      ></BootStrapNavBar>
      <AuthVerify logOut={logOut} />
    </Container>
  );
};
