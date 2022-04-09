import React from "react";
import { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    useParams,
    useNavigate
} from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import PositionService from "../../../services/position.service";
import { FetchPositionData } from "../../hooks/fetch-position";
import "./position.css"

export const AddOrUpdatePosition = () => {
    const navigate = useNavigate();
    const { positionId } = useParams();
    const { status, data, error } = FetchPositionData(positionId);
    const [name, setName] = useState('');
    const [seniorityLevel, setSeniorityLevel] = useState('');
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (data.name) {
            setName(data.name);
        }
        if (data.seniorityLevel) {
            setSeniorityLevel(data.seniorityLevel);
        }
    }, [data])

    const handleSubmit = (event) => {
        event.preventDefault();
        var target = event.target;
        var name = target.name.value;
        var seniorityLevel = target.seniorityLevel.value;
        if (positionId) {
            var id = positionId;
            PositionService.updatePosition(id, name, seniorityLevel)
                .then(response => {
                    if (response.id) {
                        setMessage("Position updated successfully");
                    } else {
                        setMessage("Error updating position");
                    }
                }).catch(error => {
                    setMessage("Error updating position");
                });
        } else {
            PositionService.addPosition(name, seniorityLevel)
                .then(response => {
                    if (response.id) {
                        setMessage("Position added successfully, id:" + response.id);
                    } else {
                        setMessage("Error adding position");
                    }
                }).catch(error => {
                    setMessage("Error adding position");
                });
        }
    }

    return (
        <Container>
            <h1>{positionId ? "Update position" : "Add position"}</h1>
            {message ? <div className="alert alert-success">{message}</div> :
                <Form className="position-form" onSubmit={handleSubmit}>
                    {positionId &&
                        <Form.Group controlId="positionId">
                            <Form.Label>Position Id</Form.Label>
                            <Form.Control type="text" name="positionId" value={positionId} readOnly />
                        </Form.Group>
                    }
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter position name" name="name" value={name} onChange={(event) => setName(event.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="seniorityLevel">
                        <Form.Label>Seniority Level</Form.Label>
                        <Form.Control type="text" placeholder="Enter seniority level" name="seniorityLevel" value={seniorityLevel} onChange={(event) => setSeniorityLevel(event.target.value)} />
                    </Form.Group>
                    <br />
                    <button type="submit" className="btn btn-primary">{positionId ? "Update position" : "Add position"}</button>
                    <br />
                </Form>
            }
        </Container>
    );
}
