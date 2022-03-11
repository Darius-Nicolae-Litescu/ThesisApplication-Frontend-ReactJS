import React, { Component } from "react";
import {
    AsyncTypeahead,
    Highlighter,
    Menu,
    MenuItem,
} from 'react-bootstrap-typeahead';
import ReactDOM from 'react-dom';
import '../search/live-search-bar.css';
import { Card } from 'react-bootstrap'

export default class StorySearchCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card
                bg="light"
                text="dark"
                className="mb-2"
                style={{ width: '100%' }}
            >
                <div className="card-header border-0">
                    <h2>Story</h2>
                    <img src="//placehold.it/100" alt="" />
                </div>
                <Card.Body>
                    <div className="card-block px-2">
                        <Card.Title>{this.props.story.title}</Card.Title>
                        <Card.Text>
                            {this.props.story.description}
                        </Card.Text>
                        <Card.Footer>{this.props.story.description}</Card.Footer>
                    </div>
                </Card.Body>
            </Card>
        );
    }
}