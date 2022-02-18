import React from 'react'
import { Routes, Route } from 'react-router-dom';
import AuthVerify from "../common/auth-verify";
import Login from "./login.component";
import Register from "./register.component";
import Home from "./home.component";
import BoardUser from "./board-user.component";
import BoardModerator from "./board-moderator.component";
import SearchAutocomplete from "./search/search-autocomplete.component";
import SearchResult from "./search/search-result.component"
import BoardAdmin from "./board-admin.component";
import EditProfile from "./user/edit-user-details.component"
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container } from 'react-bootstrap'
import Profile from './user/profile.component';
import { logout } from "../actions/auth";
import { clearMessage } from "../actions/message";
import { connect } from "react-redux";

import { history } from '../helpers/history';

import EventBus from "../common/EventBus";
import Admin from './board-admin.component';

import './navbar.css';


class BootstrapNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
            isMounted: false
        };

        history.listen((location) => {
            props.dispatch(clearMessage());
        });
    }

    componentDidMount() {
        this.state.isMounted = true;
        const user = this.props.user;

        if (user) {
            this.setState({
                currentUser: user,
                showModeratorBoard: user.roles.includes("MODERATOR"),
                showAdminBoard: user.roles.includes("ADMIN"),
            });
        }

        EventBus.on("logout", () => {
            this.logOut();
        });
    }

    componentWillUnmount() {
        if(this.state.isMounted == true)
        {
            this.state.isMounted = false;
            EventBus.remove("logout");
        }
    }

    logOut() {
        this.props.dispatch(logout());
        this.setState({
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        });
    }

    render() {
        const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
        console.log({ currentUser, showModeratorBoard, showAdminBoard });
        return (
            <div>
                <Container fluid >
                    <Navbar bg="light" expand="lg" sticky="top" >
                        <Navbar.Brand href="/">Home</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse  id="responsive-navbar-nav">
                            <Nav className="container-fluid" >
                                <Nav.Link href="/ticket">Ticket list</Nav.Link>
                                <Nav.Link href="/kanban">Kanban board</Nav.Link>
                                {showAdminBoard && <Nav.Link href="/admin">Admin board</Nav.Link>}
                                <Form style={{width:"70%"}}>
                                    <div className="search-bar-form">
                                    <SearchAutocomplete > </SearchAutocomplete>
                                    <Button variant="outline-success">Search</Button>
                                    </div>
                                </Form>
                            </Nav>
                            {currentUser ? (<NavDropdown className="ml-auto" title="User actions" id="responsive-nav-dropdown" align="end">
                                <NavDropdown.Item href="/profile">User profile</NavDropdown.Item>
                                <NavDropdown.Item href="/profile/edit">Edit account details</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/login" onClick={this.logOut}>Logout</NavDropdown.Item>
                            </NavDropdown>) :
                                (<NavDropdown className="ml-auto" title="Account" id="responsive-nav-dropdown" align="end">
                                    <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/register">Register</NavDropdown.Item>
                                </NavDropdown>
                                )}
                        </Navbar.Collapse>
                    </Navbar>

                    <br />
                    <div className="container mt-3">
                        <Routes>
                            <Route exact path="/" element={<Home />} />
                            <Route exact path="/login" element={<Login />} />
                            <Route exact path="/register" element={<Register />} />
                            <Route exact path="/profile" element={<Profile />} />
                            <Route exact path="/profile/edit" element={<EditProfile />} />
                            <Route exact path="/search-result" element={<SearchResult />} />
                            <Route path="/user" element={<BoardUser />} />
                            <Route path="/mod" element={<BoardModerator />} />
                            <Route path="/admin" element={<BoardAdmin />} />
                        </Routes>
                    </div>
                    <AuthVerify logOut={this.logOut} />
                </Container>
            </div>
        )
    }

}
function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user,
    };
}

export default connect(mapStateToProps)(BootstrapNavbar);