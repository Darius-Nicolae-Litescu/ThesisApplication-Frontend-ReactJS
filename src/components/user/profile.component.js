import React, { Component } from "react";
import { Navigate } from 'react-router-dom';
import { connect } from "react-redux";
import { Card, Container, ListGroup, Spinner } from 'react-bootstrap'
import UserService from "../../services/user.service";
import "./center-spinner.css"

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      userInformation: null,
    };
    this.loadProfileInfo = this.loadProfileInfo.bind(this);

  }

  loadProfileInfo() {
    this.setState({ isLoading: true })
    UserService.whoami().then(
      response => {
        if (response != null) {
          this.setState({
            userInformation: response
          });
          this.setState({ isLoading: false })
        }
      },
      error => {
        console.log(error);
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  componentDidMount() {
    this.loadProfileInfo();
  }

  render() {
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return ( this.state.isLoading ? <Spinner animation="grow" variant="primary" size="lg" className="center-spinner" /> :
      <Container style={{ width: '100%' }}>
        <Card
          bg="light"
          text="dark"
          className="mb-2"
          style={{ width: '100%' }}
        >
          <div className="card-header border-0">
            <img className="rounded mx-auto d-block img-responsive" src="//placehold.it/200" alt="" />
          </div>
          <Card.Body>
            <div className="card-block px-2">
              <Card.Title>
                <ListGroup>
                  <ListGroup.Item action variant="light">Id: <strong>{currentUser.id}</strong></ListGroup.Item>
                  <ListGroup.Item action variant="light">First name: <strong>{currentUser.firstName}</strong></ListGroup.Item>
                  <ListGroup.Item action variant="light">Last name: <strong>{currentUser.lastName}</strong></ListGroup.Item>
                  <ListGroup.Item action variant="light">Position name: <strong>{currentUser.positionName}</strong></ListGroup.Item>
                  <ListGroup.Item action variant="light">Position seniority: <strong>{currentUser.positionSeniority}</strong></ListGroup.Item>
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
