import React from 'react'

import { Navbar, Nav, NavItem, MenuItem, NavDropdown, Form, FormControl, Button, Container, Drawer, ListGroup, DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap'
import { Row, Col, Card } from "react-bootstrap";



import '../../sidebar.css';

const generalInformationOptionsData = [
    { key: '1', value: 'Change name' },
    { key: '2', value: 'Change profile picture' },
];

const securityOptionsData = [
    { key: '3', value: 'Change password' },
    { key: '4', value: 'Change email' },
];

const deleteAccountOptionsData = [
    { key: '5', value: 'Delete account' }
];

const optionsData = [
    { key: '1', value: 'General information', options: generalInformationOptionsData },
    { key: '2', value: 'Security', options: securityOptionsData },
    { key: '3', value: 'Delete account', options: deleteAccountOptionsData },
];


export default function EditUserLeftBar() {
    const onItemClick = (itemKey, optionsKey) => {
        this.handleClick(itemKey, optionsKey);
        this.displayTable();
    }

    return (
        <nav className="d-none d-md-block col-sm-2 col-md-2 col-lg-2 col-xl-2 sidebar">
            <div className="sidebar-sticky">
                <ListGroup style={{ marginTop: "50%" }}>
                    <ListGroup.Item style={{ display: "grid", textAlign: "right", justifyItems: "end", textAlignLast: "end" }}>
                        {optionsData.map((item) => {
                            return <DropdownButton
                                variant="primary"
                                className="nav-item dropleft"
                                style={{ marginLeft: "10%", width: "100%", backgroundColor: "white", color: "black" }}
                                as={ButtonGroup}
                                key={item.value}
                                id={`dropdown-variants-${item.value}`}
                                title={item.value}
                                drop="end">

                                {item.options.map((itemOptions) => {
                                    return <Dropdown.Item key={itemOptions.value} onClick={() => onItemClick(item.key, itemOptions.key)}>
                                        {itemOptions.value}
                                        </Dropdown.Item>
                                })}
                            </DropdownButton>
                        })}
                    </ListGroup.Item>
                </ListGroup>
            </div>
        </nav>
    );
}
