import React from 'react'
import { Routes, Route } from 'react-router-dom';
import AuthVerify from "../common/auth-verify";
import Login from "./login.component";
import Register from "./register.component";
import Home from "./home.component";
import BoardUser from "./board-user.component";
import BoardModerator from "./board-moderator.component";
import SearchAutocomplete from "./search/search-autocomplete.component";
import BoardAdmin from "./board-admin.component";
import { Navbar, Nav, NavItem, MenuItem, NavDropdown, Form, FormControl, Button, Container, Drawer, ListGroup, DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap'
import { Row, Col, Card } from "react-bootstrap";

import Profile from './user/profile.component';
import { logout } from "../actions/auth";
import { clearMessage } from "../actions/message";
import { connect } from "react-redux";

import { history } from '../helpers/history';

import EventBus from "../common/EventBus";
import Admin from './board-admin.component';

import './sidebar.css';


class BootstrapLeftNavbar extends React.Component {
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
        if (this.state.isMounted == true) {
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
            <nav className="d-none d-md-block col-sm-2 col-md-2 col-lg-2 col-xl-2 sidebar">
                <div className="sidebar-sticky">
                    <ListGroup style={{ marginTop: "50%" }}>
                        <ListGroup.Item style={{ display: "grid", textAlign: "right", justifyItems: "end", textAlignLast: "end"}}>
                            {this.props.optionsData.map((item) => {
                                return <DropdownButton
                                    variant="primary"
                                    className="nav-item dropleft"
                                    style={{ marginLeft: "10%", width: "100%", border:"double" }}
                                    as={ButtonGroup}
                                    key={item.value}
                                    id={`dropdown-variants-${item.value}`}
                                    title={item.value}
                                    drop="end">

                                    {item.options.map((itemOptions) => {
                                        return <Dropdown.Item onClick={
                                            () => {
                                                this.handleClick(item.key, itemOptions.key);
                                                this.displayTable();
                                            }
                                        }
                                            key={itemOptions.value}>{itemOptions.value + ` "${item.value}" Data`}</Dropdown.Item>
                                    })}
                                </DropdownButton>
                            })}
                        </ListGroup.Item>
                    </ListGroup>
                </div>
            </nav>
        )
    }

}
function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user,
    };
}

export default connect(mapStateToProps)(BootstrapLeftNavbar);