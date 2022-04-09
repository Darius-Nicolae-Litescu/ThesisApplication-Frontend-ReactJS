//React form that add a story
import React from "react";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Container, Form } from "react-bootstrap";
import { FetchBasicUserData } from "../../hooks/fetch-users";
import StoryTaskService from "../../../services/story-task.service";
import './add-story-task.css';

export const AddStoryTask = () => {
    const { storyId } = useParams();
    const navigate = useNavigate();

    const { fetchUserDataStatus, data: usersData, fetchUserDataError } = FetchBasicUserData();


    const handleSubmit = (event) => {
        event.preventDefault();

        var target = event.target;
        var assignedToId = parseInt(target.user.value);
        var title = target.title.value;
        var description = target.description.value;
        var storyPoints = parseInt(target.storyPoints.value);
        var status = target.status.value;

        StoryTaskService.addStoryTask(title, description, storyPoints, assignedToId, status, storyId)
            .then(response => {
                navigate(`/story-task/${response.id}`);
            })
            .catch(error => {
                console.log(error);
            });

    };

    return (
        <Container>
            <h1>Add a story task for story id: {storyId}</h1>
            <Form className="add-story-form" onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label htmlFor="story">Story</Form.Label>
                    <Form.Control required disabled as="select" className="form-control" id="story" aria-describedby="storyHelp">
                        <option key={storyId} value={storyId}>{storyId}</option>
                    </Form.Control>
                    <small id="storyHelp" className="form-text text-muted">Story task for story id</small>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="title">Title</Form.Label>
                    <Form.Control required type="text" className="form-control" id="title" aria-describedby="titleHelp" placeholder="Enter title" />
                    <small id="titleHelp" className="form-text text-muted">Enter the title of the story task</small>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="description">Description</Form.Label>
                    <Form.Control required type="text" className="form-control" id="description" aria-describedby="descriptionHelp" placeholder="Enter description" />
                    <small id="descriptionHelp" className="form-text text-muted">Enter the description of the story task</small>
                </Form.Group>
                <Form.Group >
                    <Form.Label>Story Points</Form.Label>
                    <Form.Control required type="number" id="storyPoints" className="form-control" placeholder="Enter story points" aria-describedby="storyPointsHelp" />
                    <small id="storyPointsHelp" className="form-text text-muted">Enter the story points of story task</small>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="status">Status</Form.Label>
                    <Form.Control required type="text" className="form-control" id="status" aria-describedby="statusHelp" placeholder="Enter status" />
                    <small id="statusHelp" className="form-text text-muted">Enter the status of the story task</small>
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="user">Assigned to</Form.Label>
                    <Form.Control required as="select" className="form-control" id="user" aria-describedby="userHelp" placeholder="Select a user" >
                        {usersData && usersData.map(user => {
                            return (
                                <option key={user.id} value={user.id}>{user.username}</option>
                            )
                        })}
                    </Form.Control>
                </Form.Group>

                <br />
                <button type="submit" className="btn btn-primary">Add story</button>
                <br />
            </Form>
        </Container>
    )
}