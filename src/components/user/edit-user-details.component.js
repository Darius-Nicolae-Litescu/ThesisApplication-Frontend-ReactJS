import React from "react";
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  useParams,
  useNavigate,
} from "react-router-dom";

import { Card, Container, ListGroup, Spinner } from 'react-bootstrap'
import UserService from "../../services/user.service";
import EditUserLeftBar from "./edit-user-details-left-bar.component"
import { UserActivity } from "./user-activity.component";
import "./center-spinner.css"
import "./profile.css"

export const EditProfile = () => {
  const [userInformation, setUserInformation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    UserService.whoami().then(
      response => {
        if (response != null) {
          setUserInformation(response);
          setIsLoading(false);
        }
      },
      error => {
        console.log(error);
        setIsLoading(false);
      }
    );
  }, []);

  if (isLoading) {
    return <Spinner animation="grow" variant="primary" size="lg" className="center-spinner" />;
  }

  if (!userInformation) {
    return navigate('/login');
  }

  return (
    <Container className="container-card" style={{ marginLeft: "15%" }}>
          <EditUserLeftBar></EditUserLeftBar>
          <Card style={{ marginLeft: "15%", width: "50%" }}>
            <Card.Header>
              <h3>Profile</h3>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
              <ListGroup.Item>
                  <b>ID:</b> {userInformation.id}
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>First Name:</b> {userInformation.firstName}
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Last Name:</b> {userInformation.lastName}
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Position name:</b> {userInformation.positionName}
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Position seniority:</b> {userInformation.positionSeniority}
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Username:</b> {userInformation.username}
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Email:</b> {userInformation.email}
                </ListGroup.Item>
                <ListGroup.Item action variant="danger">Authorities: </ListGroup.Item>
                <ListGroup>
                  {userInformation.roles &&
                    userInformation.roles.map((role, index) => <ListGroup.Item action variant="info">{role}</ListGroup.Item>)}
                </ListGroup>
              </ListGroup>
            </Card.Body>
          </Card>
          {userInformation.id ? <UserActivity userId={userInformation.id}></UserActivity> : null}
        </Container>
  );
}