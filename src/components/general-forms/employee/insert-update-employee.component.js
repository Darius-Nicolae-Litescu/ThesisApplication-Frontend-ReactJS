import React from "react";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  useParams,
  useNavigate,
} from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import EmployeeService from "../../../services/employee.service";
import { FetchEmployeeBasicDetailsData } from "../../hooks/fetch-employee-basic-details";
import "./employee.css";

export const AddOrUpdateEmployee = () => {
  const navigate = useNavigate();
  const { employeeId } = useParams();
  const { status, data, error } = FetchEmployeeBasicDetailsData(employeeId);
  const [personId, setPersonId] = useState("");
  const [positionId, setPositionId] = useState("");
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (data.personId) {
      setPersonId(data.personId);
    }
    if (data.positionId) {
      setPositionId(data.positionId);
    }
    if (data.userId) {
      setUserId(data.userId);
    }
  }, [data]);

  const handleSubmit = (event) => {
    event.preventDefault();
    var target = event.target;
    var personId = target.personId.value;
    var positionId = target.positionId.value;
    var userId = target.userId.value;
    if (employeeId) {
      var id = employeeId;
      EmployeeService.updateEmployee(id, personId, positionId, userId)
        .then((response) => {
          if (response.id) {
            setMessage("Employee updated successfully");
          } else {
            setMessage("Error updating employee");
          }
        })
        .catch((error) => {
          setMessage("Error updating employee");
        });
    } else {
      EmployeeService.addEmployee(personId, positionId, userId)
        .then((response) => {
          if (response.id) {
            setMessage("Employee added successfully, id:" + response.id);
          } else {
            setMessage("Error adding employee");
          }
        })
        .catch((error) => {
          setMessage("Error adding employee");
        });
    }
  };

  return (
    <Container>
      <h1>{employeeId ? "Update employee" : "Add employee"}</h1>
      {message ? (
        <div className="alert alert-success">{message}</div>
      ) : (
        <Form className="employee-form" onSubmit={handleSubmit}>
          {employeeId && (
            <Form.Group controlId="employeeId">
              <Form.Label>Id</Form.Label>
              <Form.Control
                type="text"
                name="employeeId"
                value={employeeId}
                readOnly
              />
            </Form.Group>
          )}
          <Form.Group controlId="personId">
            <Form.Label>Person Id</Form.Label>
            <Form.Control
              type="text"
              name="personId"
              value={personId}
              onChange={(event) => setPersonId(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="positionId">
            <Form.Label>Position Id</Form.Label>
            <Form.Control
              type="text"
              name="positionId"
              value={positionId}
              onChange={(event) => setPositionId(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="userId">
            <Form.Label>User Id</Form.Label>
            <Form.Control
              type="text"
              name="userId"
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
            />
          </Form.Group>
          <br />
          <button type="submit" className="btn btn-primary">
            {employeeId ? "Update employee" : "Add employee"}
          </button>
          <br />
        </Form>
      )}
    </Container>
  );
};
