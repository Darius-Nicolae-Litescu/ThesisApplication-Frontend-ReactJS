import React from "react";
import { useState, useEffect } from "react";

import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import { getUserFromLocalStorage } from "../common/auth-verify";

export const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageToDisplay, setMessageToDisplay] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = getUserFromLocalStorage();
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleValidation = () => {
    if (username.length === 0) {
      setMessageToDisplay("Username is required");
      return false;
    }
    if (password.length === 0) {
      setMessageToDisplay("Password is required");
      return false;
    }
    return true;
  };

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      setLoading(true);
      AuthService.login(username, password)
        .then(
          (response) => {
            if (response != null) {
              navigate("/profile");
              refreshPage();
            }
          },
          (error) => {
            setMessageToDisplay(error);
            setLoading(false);
          }
        )
        .catch(() => {
          setLoading(false);
        });
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        {messageToDisplay && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {messageToDisplay}
            </div>
          </div>
        )}

        <Form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
            />
          </div>
          <br></br>
          <div className="form-group">
            <a href="/register">Don't have an account? Register</a>
          </div>
          <br></br>
          <div className="form-group">
            <Button
              type="submit"
              variant="primary"
              size="col-sm-6"
              style={{ width: "100%" }}
              disabled={loading}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
