import React from "react";
import { useState, useEffect } from 'react';
import { FetchUserActivity } from "./hooks/user-activity-fetch";
import { Card, Container, ListGroup, Spinner } from 'react-bootstrap';
import { render } from "@testing-library/react";
import Moment from "react-moment";
import "./user-activity.css";

export const UserActivity = (props) => {
    const { userId } = props;
    const { status, data, error } = FetchUserActivity(userId);

    if (status === "fetching") {
        return <Spinner animation="grow" variant="primary" size="lg" className="center-spinner" />;
    }
    if (status === "error") {
        return <div>{error.message}</div>;
    }

    if (status === "fetched") {
        return (
            <Container>
                <Card style={{ width: "100%" }}>
                    <Card.Header>
                        <Card.Title>User Activity</Card.Title>
                    </Card.Header>
                    <Card.Body>

                        <ListGroup variant="flush">
                            {data.map(story => (
                                <a key={story.id} style={{ textDecoration: "none" }} href={`/story/${story.id}`}>
                                    <ListGroup.Item>
                                        <Card.Title>{story.title}</Card.Title>
                                        <Card.Text>{story.description}</Card.Text>
                                        <Card.Text>
                                            <Moment format="MM/DD/YYYY">{story.createdAt}</Moment>
                                        </Card.Text>
                                        <Card.Text>{story.isFinished ? "Finished" : "Not Finished"}</Card.Text>
                                        <Card.Text>{story.totalStoryPoints ? `Total story points: ${story.totalStoryPoints}` : ''}</Card.Text>
                                    </ListGroup.Item>
                                </a>
                            ))}
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
    return null;

}
