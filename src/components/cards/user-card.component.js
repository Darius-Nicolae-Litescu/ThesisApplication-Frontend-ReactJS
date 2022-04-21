import React, { Component } from "react";
import {
  AsyncTypeahead,
  Highlighter,
  Menu,
  MenuItem,
} from "react-bootstrap-typeahead";
import ReactDOM from "react-dom";
import "../search/live-search-bar.css";
import { Card } from "react-bootstrap";
import "./user-card.css";

export default class UserCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a
        href={`/user/${this.props.user.id}`}
        style={{ textDecoration: "none" }}
      >
        <Card bg="light" text="dark" className="mb-2" style={{ width: "100%" }}>
          <Card.Body>
            <div className="card-block px-2">
              <Card.Title>
                {this.props.user.username}
                <h3 class="subtitle">{this.props.user.email}</h3>
              </Card.Title>
            </div>
          </Card.Body>
        </Card>
      </a>
    );
  }
}
