import React from "react";
import { useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  useParams,
  useNavigate,
} from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { validateEmail } from "./validators";
import { getUserFromLocalStorage } from "../common/auth-verify";

import AuthService from "../services/auth.service";

export const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [successful, setSuccessful] = useState(false);
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
    if (email.length === 0) {
      setMessageToDisplay("Email is required");
      return false;
    }
    if (!validateEmail(email)) {
      setMessageToDisplay("Email is not valid");
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

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleRegister = (e) => {
    if (handleValidation()) {
      setLoading(true);
      AuthService.register(username, email, password)
        .then(
          (response) => {
            if (response != null) {
              navigate("/login");
              setSuccessful(true);
              setLoading(false);
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
    return navigate("/profile");
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

        <Form onSubmit={handleRegister}>
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

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={onChangeEmail}
            />
          </div>
          {successful && (
            <div className="form-group">
              <div className="alert alert-success">
                Account has been created sucesfully
              </div>
            </div>
          )}
          <br />
          <div className="form-group">
            <button
              className="btn btn-primary btn-block"
              disabled={loading}
              style={{ width: "100%" }}
            >
              Register
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};
