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
import "./software-application-card.css";

export default class SoftwareApplicationCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a
        href={`/software-application/${this.props.softwareapplication.id}`}
        style={{ textDecoration: "none" }}
      >
        <Card bg="light" text="dark" className="mb-2" style={{ width: "100%" }}>
          <Card.Body>
            <div className="card-block px-2">
              <Card.Title>{this.props.softwareapplication.name}</Card.Title>

              <Card.Text>
                {this.props.softwareapplication.description}
              </Card.Text>
            </div>
          </Card.Body>
        </Card>
      </a>
    );
  }
}
