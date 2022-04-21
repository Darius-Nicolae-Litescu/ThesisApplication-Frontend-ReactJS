import React from "react";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  useParams,
  useNavigate,
} from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import PriorityService from "../../../services/priority.service";
import { FetchPriorityData } from "../../hooks/fetch-priority";
import "./priority.css";

export const AddOrUpdatePriority = () => {
  const navigate = useNavigate();
  const { priorityId } = useParams();
  const { status, data, error } = FetchPriorityData(priorityId);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("");
  const [message, setMessage] = useState(null);
  useEffect(() => {
    if (data.title) {
      setTitle(data.title);
    }
    if (data.description) {
      setDescription(data.description);
    }
    if (data.level) {
      setLevel(data.level);
    }
  }, [data]);

  const handleSubmit = (event) => {
    event.preventDefault();
    var target = event.target;
    var title = target.title.value;
    var description = target.description.value;
    var level = parseInt(target.level.value);
    if (priorityId) {
      var id = priorityId;
      PriorityService.updatePriority(id, title, description, level)
        .then((response) => {
          if (response.id) {
            setMessage("Priority updated successfully");
          } else {
            setMessage("Error updating priority");
          }
        })
        .catch((error) => {
          setMessage("Error updating priority");
        });
    } else {
      PriorityService.addPriority(title, description, level)
        .then((response) => {
          if (response.id) {
            setMessage("Priority added successfully, id:" + response.id);
          } else {
            setMessage("Error adding priority");
          }
        })
        .catch((error) => {
          setMessage("Error adding priority");
        });
    }
  };

  return (
    <Container>
      <h1>{priorityId ? "Update priority" : "Add priority"}</h1>
      {message ? (
        <div className="alert alert-success">{message}</div>
      ) : (
        <Form className="priority-form" onSubmit={handleSubmit}>
          {priorityId && (
            <Form.Group>
              <Form.Label htmlFor="priorityId">Priority Id</Form.Label>
              <Form.Control
                required
                disabled
                as="select"
                className="form-control"
                id="priorityId"
                aria-describedby="priorityIdHelp"
              >
                <option value={data.id}>{data.id}</option>
              </Form.Control>
            </Form.Group>
          )}
          <Form.Group>
            <Form.Label htmlFor="title">Title</Form.Label>
            <Form.Control
              required
              type="text"
              className="form-control"
              id="title"
              placeholder="Enter title"
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="description">Description</Form.Label>
            <Form.Control
              required
              type="text"
              className="form-control"
              id="description"
              placeholder="Enter description"
              name="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="level">Level</Form.Label>
            <Form.Control
              required
              type="number"
              className="form-control"
              id="level"
              placeholder="Enter level"
              name="level"
              value={level}
              onChange={(event) => setLevel(event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <br />
            <button type="submit" className="btn btn-primary">
              {priorityId ? "Update priority" : "Add priority"}
            </button>
            <br />
          </Form.Group>
        </Form>
      )}
    </Container>
  );
};
