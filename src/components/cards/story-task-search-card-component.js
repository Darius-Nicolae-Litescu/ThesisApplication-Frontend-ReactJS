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
import Moment from 'react-moment';
import "./story-task-search-card.css"

export default class StoryTaskSearchCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <a href={`/story-task/${this.props.storytask.id}`} style={{ textDecoration: "none" }}>
                <Card
                    bg="light"
                    text="dark"
                    className="mb-2"
                    style={{ width: '100%' }}
                >
                    <Card.Body>
                        <div className="card-block px-2">
                            <Card.Title>{this.props.storytask.title}
                                <h3 class="subtitle">Created by: {this.props.storytask.createdByUsername}</h3>
                                <h3 class="subtitle">Assigned to: {this.props.storytask.assignedToUsername}</h3>
                            </Card.Title>

                            <Card.Text>
                                {this.props.storytask.description}
                            </Card.Text>
                            <Card.Footer>
                                <div class="level center">
                                    Status: {this.props.storytask.status}
                                </div>
                                <div class="points center">
                                    Task points: {this.props.storytask.storyPoints}
                                </div>
                                <Moment className="createdDate" format="YYYY-MM-DD HH:mm">{this.props.storytask.createdAt}</Moment>
                            </Card.Footer>
                        </div>
                    </Card.Body>
                </Card>
            </a>
        );
    }
}