import React from "react";

import { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container } from 'react-bootstrap'
import SearchAutocomplete from "../search/search-autocomplete.component";

export const BootStrapNavBar = (props) => {
    const { showAdminBoard: showAdminBoard, showModeratorBoard: showModeratorBoard, currentUser: currentUser, logOut: logOut } = props;

    return (
        <Navbar bg="light" expand="lg" sticky="top" style={{ minWidth: "97vw" }} >
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="container-fluid">
                    <Nav.Link href="/ticket-list">Ticket list</Nav.Link>
                    <Nav.Link href="/kanban-board">Boards</Nav.Link>
                    <Nav.Link href="/statistics">Statistics</Nav.Link>
                    {showAdminBoard && <Nav.Link href="/admin">Admin board</Nav.Link>}
                    <Form style={{ width: "70%" }}>
                        <div className="search-bar-form">
                            <SearchAutocomplete > </SearchAutocomplete>
                        </div>
                    </Form>
                </Nav>
                {currentUser ? (<NavDropdown className="ml-auto" title="User actions" id="responsive-nav-dropdown" align="end" style={{ paddingRight: "3vw" }}>
                    <NavDropdown.Item href="/profile">User profile</NavDropdown.Item>
                    <NavDropdown.Item href="/edit/user">Edit account details</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/login" onClick={logOut}>Logout</NavDropdown.Item>
                </NavDropdown>) :
                    (<NavDropdown className="ml-auto" title="Account" id="responsive-nav-dropdown" align="end">
                        <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/register">Register</NavDropdown.Item>
                    </NavDropdown>
                    )}
            </Navbar.Collapse>
        </Navbar>
    )
}