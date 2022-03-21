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

import "./comment-card.css"

export default class CommentCard extends Component {

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
                <Card.Body>
                    <div className="card-block px-2">
                        <Card.Title>
                            Comment
                        </Card.Title>
                        <Card.Text>
                        "{this.props.comment.content}"
                            <h3 class="subtitle">Posted by username: {this.props.comment.postedByUsername}</h3>
                            <h3 class="subtitle">Posted by email: {this.props.comment.postedByEmail}</h3>
                            <Moment className="createdDate" format="YYYY-MM-DD HH:mm">{this.props.comment.postedAt}</Moment>
                        </Card.Text>
                    </div>
                </Card.Body>
            </Card>
        );
    }
}