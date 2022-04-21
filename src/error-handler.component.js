import React from "react";
import UserAuthService from "./services/auth.service";
import Button from "react-bootstrap/Button";

export default class ErrorHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
    this.setState({
      hasError: true,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{ display: "table", marginLeft: "auto", marginRight: "auto" }}
        >
          <h1>Something went wrong.</h1>
          <p>Please try to log in again/try again later.</p>
          <Button
            onClick={() => {
              UserAuthService.logout();
              window.location.href = "/login";
            }}
          >
            Logout
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}
