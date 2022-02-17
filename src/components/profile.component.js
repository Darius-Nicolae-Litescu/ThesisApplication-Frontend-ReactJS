import React, { Component } from "react";
import { Navigate } from 'react-router-dom';
import { connect } from "react-redux";
import { Card, Container, ListGroup } from 'react-bootstrap'

class Profile extends Component {

  render() {
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return (
      <Container style={{ width: '100%' }}>
        <Card
          bg="light"
          text="dark"
          className="mb-2"
          style={{ width: '100%' }}
        >
          <div class="card-header border-0">
            <img className="rounded mx-auto d-block img-responsive" src="//placehold.it/300" alt="" />
          </div>
          <Card.Body>
            <div class="card-block px-2">
              <Card.Title>
                <ListGroup>
                  <ListGroup.Item action variant="light">Id: <strong>{currentUser.id}</strong></ListGroup.Item>
                  <ListGroup.Item action variant="light">Username: <strong>{currentUser.username}</strong></ListGroup.Item>
                  <ListGroup.Item action variant="light">Email: <strong>{currentUser.email}</strong></ListGroup.Item>
                </ListGroup>
              </Card.Title>
              <Card.Title>
                <ListGroup.Item action variant="danger">Authorities: </ListGroup.Item>
                <Card.Footer>
                  <ListGroup>
                    {currentUser.roles &&
                      currentUser.roles.map((role, index) => <ListGroup.Item action variant="info">{role}</ListGroup.Item>)}
                  </ListGroup>
                </Card.Footer>
              </Card.Title>
            </div>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Profile);
