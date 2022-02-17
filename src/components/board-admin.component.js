import React, { Component } from "react";
import EventBus from "../common/EventBus";

import UserService from "../services/user.service";

import InsertUpdatePositionForm from "./forms/insert-update-position.component";
import AdminPanelDropdown from "./forms/admin-panel-dropdown.component";

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }
/*
  componentDidMount() {
    UserService.getAdminBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }
*/
  render() {
    return (
      <AdminPanelDropdown></AdminPanelDropdown>
    );
  }
}
