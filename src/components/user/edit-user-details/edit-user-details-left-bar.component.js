import React from "react";
import { useState, useEffect } from "react";

import {
  Navbar,
  Nav,
  NavItem,
  MenuItem,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Container,
  Drawer,
  ListGroup,
  DropdownButton,
  ButtonGroup,
  Dropdown,
} from "react-bootstrap";
import { Row, Col, Card } from "react-bootstrap";

import "../../sidebar.css";

const generalInformationOptionsData = [
  { key: "ChangeProfilePicture", value: "Change profile picture" },
];

const securityOptionsData = [
  { key: "ChangeEmail", value: "Change email" },
  { key: "ChangePassword", value: "Change password" },
];

const deleteAccountOptionsData = [
  { key: "DeleteAccount", value: "Delete account" },
];

const optionsData = [
  {
    key: "GeneralInformationSection",
    value: "General information",
    options: generalInformationOptionsData,
  },
  { key: "SecuritySection", value: "Security", options: securityOptionsData },
  {
    key: "DeleteAccountSection",
    value: "Delete account",
    options: deleteAccountOptionsData,
  },
];

export default function EditUserLeftBar(props) {
  const {
    setShowChangeEmailComponent,
    setShowChangePasswordComponent,
    setShowChangeProfilePictureComponent,
  } = props;

  const [itemKey, setItemKey] = useState("");
  const [optionsKey, setOptionsKey] = useState("");

  const onItemClick = (itemKey, optionsKey) => {
    //switch for each itemkey and optionsKey
    switch (itemKey) {
      case "GeneralInformationSection":
        switch (optionsKey) {
          case "ChangeProfilePicture":
            setShowChangeProfilePictureComponent(true);
            break;
          default:
            break;
        }
      case "SecuritySection":
        switch (optionsKey) {
          case "ChangePassword":
            setShowChangePasswordComponent(true);
            break;
          case "ChangeEmail":
            setShowChangeEmailComponent(true);
            break;
          default:
            break;
        }
      case "DeleteAccountSection":
        switch (optionsKey) {
          case "DeleteAccount":
            //
            break;
          default:
            break;
        }
    }
  };

  return (
    <nav className="d-none d-md-block col-sm-2 col-md-2 col-lg-2 col-xl-2 sidebar">
      <div className="sidebar-sticky">
        <ListGroup
          style={{
            marginLeft: "5px",
            marginTop: "50%",
            backgroundColor: "#e9ecef",
            borderRadius: "25px",
          }}
        >
          <ListGroup.Item
            style={{
              borderRadius: "25px",
              display: "grid",
              textAlign: "right",
              justifyItems: "end",
              textAlignLast: "end",
              backgroundColor: "white",
              color: "black",
            }}
          >
            {optionsData.map((item) => {
              return (
                <DropdownButton
                  variant="Secondary"
                  className="nav-item dropleft"
                  style={{
                    marginTop: "5px",
                    marginBottom: "5px",
                    borderRadius: "25px",
                    marginLeft: "10%",
                    width: "100%",
                    backgroundColor: "white",
                    color: "black",
                  }}
                  as={ButtonGroup}
                  key={item.value}
                  id={`dropdown-variants-${item.value}`}
                  title={item.value}
                  drop="end"
                >
                  {item.options.map((itemOptions) => {
                    return (
                      <Dropdown.Item
                        style={{ borderRadius: "25px" }}
                        key={itemOptions.value}
                        onClick={() => onItemClick(item.key, itemOptions.key)}
                      >
                        {itemOptions.value}
                      </Dropdown.Item>
                    );
                  })}
                </DropdownButton>
              );
            })}
          </ListGroup.Item>
        </ListGroup>
      </div>
    </nav>
  );
}
