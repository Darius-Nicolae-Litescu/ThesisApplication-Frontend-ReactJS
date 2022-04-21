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
import "./story-search-card.css";

export default class StorySearchCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a
        href={`/story/${this.props.story.id}`}
        style={{ textDecoration: "none" }}
      >
        <Card bg="light" text="dark" className="mb-2" style={{ width: "100%" }}>
          <Card.Body>
            <div className="card-block px-2">
              <Card.Title>
                {this.props.story.title}
                <h3 class="subtitle">
                  {this.props.story.softwareApplicationName}
                </h3>
              </Card.Title>

              <Card.Text>{this.props.story.description}</Card.Text>
              <Card.Footer>
                <div class="level center">{this.props.story.priorityTitle}</div>
                <div class="points center">
                  {this.props.story.priorityLevel}
                </div>
              </Card.Footer>
            </div>
          </Card.Body>
        </Card>
      </a>
    );
  }
}
