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
import "./story-search-card.css"

export default class BoardStoryCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <a href={`/story/${this.props.story.id}`} style={{ textDecoration: "none" }}>
                <Card
                    bg="light"
                    text="dark"
                    className="mb-2"
                    style={{ width: '100%', height: '100%' }}
                >
                    <Card.Body style={{ background: this.props.story.isFinished ? "crimson" : "#00008B", color: "white" }}>
                        <div className="card-block px-2">
                            <Card.Title>{this.props.story.title}</Card.Title>
                            <h3 className="subtitle">Created by username: {this.props.story.createdBy.username}</h3>
                            <h3 className="subtitle">Created by email: {this.props.story.createdBy.email}</h3>
                            <div className="p-4">
                                <p className="uppercase tracking-wide text-sm font-bold text-gray-700">
                                    {this.props.story.isFinished ? "Status: Finished" : "Status: Not finished"}
                                </p>

                                <p className="text-3xl text-gray-900">Total points: {this.props.story.totalStoryPoints}</p>
                            </div>


                            <Card.Footer>
                                <div className="level center">
                                    {this.props.story.priority.title}
                                </div>
                                <div className="points center">
                                    {this.props.story.priority.level}
                                </div>
                            </Card.Footer>
                        </div>
                    </Card.Body>
                </Card>
            </a>
        );
    }
}