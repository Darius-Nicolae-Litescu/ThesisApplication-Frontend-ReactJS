import React from "react";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  useParams,
  useNavigate,
} from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import SoftwareApplicationService from "../../../services/softwareapplication.service";
import { FetchSoftwareApplicationData } from "../../hooks/fetch-software-application";
import "./software-application.css";

export const AddOrUpdateSoftwareApplication = () => {
  const navigate = useNavigate();
  const { softwareApplicationId } = useParams();
  const { status, data, error } = FetchSoftwareApplicationData(
    softwareApplicationId
  );
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState(null);
  useEffect(() => {
    if (data.name) {
      setName(data.name);
    }
    if (data.description) {
      setDescription(data.description);
    }
  }, [data]);

  const handleSubmit = (event) => {
    event.preventDefault();
    var target = event.target;
    var name = target.name.value;
    var description = target.description.value;
    if (softwareApplicationId) {
      var id = softwareApplicationId;
      SoftwareApplicationService.updateSoftwareApplication(
        id,
        name,
        description
      )
        .then((response) => {
          if (response.id) {
            setMessage("Software application updated successfully");
          } else {
            setMessage("Error updating software application");
          }
        })
        .catch((error) => {
          setMessage("Error updating software application");
        });
    } else {
      SoftwareApplicationService.addSoftwareApplication(name, description)
        .then((response) => {
          if (response.id) {
            setMessage(
              "Software application added successfully, id:" + response.id
            );
          } else {
            setMessage("Error adding software application");
          }
        })
        .catch((error) => {
          setMessage("Error adding software application");
        });
    }
  };

  return (
    <Container>
      <h1>
        {softwareApplicationId
          ? "Update software application"
          : "Add software application"}
      </h1>
      {message ? (
        <div className="alert alert-success">{message}</div>
      ) : (
        <Form className="software-application-form" onSubmit={handleSubmit}>
          {softwareApplicationId && (
            <Form.Group>
              <Form.Label htmlFor="softwareApplicationId">
                Software Application Id
              </Form.Label>
              <Form.Control
                required
                disabled
                as="select"
                className="form-control"
                id="softwareApplicationId"
                aria-describedby="softwareApplicationIdHelp"
              >
                <option
                  key={softwareApplicationId}
                  value={softwareApplicationId}
                >
                  {softwareApplicationId}
                </option>
              </Form.Control>
              <small
                id="softwareApplicationIdHelp"
                className="form-text text-muted"
              >
                Software Application Id
              </small>
            </Form.Group>
          )}
          <Form.Group>
            <Form.Label htmlFor="name">Name</Form.Label>
            <Form.Control
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              type="text"
              className="form-control"
              id="name"
              aria-describedby="nameHelp"
              placeholder="Enter name"
            />
            <small id="nameHelp" className="form-text text-muted">
              Enter the name of the software application
            </small>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="description">Description</Form.Label>
            <Form.Control
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
              type="text"
              className="form-control"
              id="description"
              aria-describedby="descriptionHelp"
              placeholder="Enter description"
            />
            <small id="descriptionHelp" className="form-text text-muted">
              Enter the description of the software application
            </small>
          </Form.Group>
          <br />
          <button type="submit" className="btn btn-primary">
            {softwareApplicationId
              ? "Update software application"
              : "Add software application"}
          </button>
          <br />
        </Form>
      )}
    </Container>
  );
};
