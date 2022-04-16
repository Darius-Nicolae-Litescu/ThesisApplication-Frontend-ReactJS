import React from "react";
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  useParams
} from "react-router-dom";

import { Card, Container, ListGroup, Spinner } from 'react-bootstrap'
import UserService from "../../services/user.service";
import { UserActivity } from "./user-activity.component";
import "./center-spinner.css"
import "./profile.css"
import { serveImage, constructProfileImageUrl } from "../../helpers/downloadUtils";

export const Profile = () => {
  const { userId } = useParams();

  const [userInformation, setUserInformation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);


  const serveImageData = (url) => {
    serveImage(url)
      .then(response => {
        if (response != null) {
          setProfileImage(response.data);
        }
      });
  }

  useEffect(() => {
    if (userId) {
      UserService.getUserById(userId).then(
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
      serveImageData(constructProfileImageUrl(userId));
    }
    else {
      UserService.whoami().then(
        response => {
          if (response != null) {
            setUserInformation(response);
            serveImageData(constructProfileImageUrl(response.id));
            setIsLoading(false);
          }
        },
        error => {
          console.log(error);
          setIsLoading(false);
        }
      );
    }

  }, []);

  if (isLoading) {
    return <Spinner animation="grow" variant="primary" size="lg" className="center-spinner" />;
  }

  if (!isLoading && !userInformation) {
    return <div>Could not find user information</div>
  }

  return (
    isLoading && userInformation ? <Spinner animation="grow" variant="primary" size="lg" className="center-spinner" /> :
      <Container className="container-card" style={{ marginLeft: "15%" }}>
        <Card className="card-radius">
          <Card.Header>
            <h3>Profile</h3>
          </Card.Header>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <b>Username:</b> {userInformation.username}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Email:</b> {userInformation.email}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>First Name:</b> {userInformation.firstName}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Last Name:</b> {userInformation.lastName}
              </ListGroup.Item>
              <ListGroup.Item action variant="danger">Authorities: </ListGroup.Item>
              <ListGroup>
                {userInformation.roles &&
                  userInformation.roles.map((role, index) =>
                    <ListGroup.Item key={index} action variant="info">
                      {role}
                    </ListGroup.Item>
                  )}
              </ListGroup>
            </ListGroup>
          </Card.Body>
        </Card>
        <Card className="card-radius">
          {profileImage &&
            <Card.Img style={{ height: "auto", maxWidth: "1000px" }} variant="top" id="profilePicture" src={`data:image/jpeg;base64,${profileImage}`} />
          }
        </Card>
        {
          userInformation.id ?
            <UserActivity userId={userInformation.id} />
            :
            null
        }
      </Container>
  );
}