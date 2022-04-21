import React, { Component } from "react";
import { history } from "../helpers/history";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export function setUserToLocalStorage(user) {
  localStorage.setItem("user", JSON.stringify(user));
  if (getUserFromLocalStorage()) {
    return true;
  }
  return false;
}

export function getUserFromLocalStorage() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user;
}

export default function AuthVerify(props) {
  const { logOut } = props;

  history.listen(() => {
    const user = getUserFromLocalStorage();
    if (user) {
      const decodedJwt = parseJwt(user.accessToken);
      if (decodedJwt.exp * 1000 < Date.now()) {
        logOut();
      }
    }
  });
  return <div></div>;
}
