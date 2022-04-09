import React from "react";
import { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    useParams,
    useNavigate
} from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import PersonService from "../../../services/person.service";
import { FetchPersonData } from "../../hooks/fetch-person";
import "./person.css"

export const AddOrUpdatePerson = () => {
    const navigate = useNavigate();
    const { personId } = useParams();
    const { status, data, error } = FetchPersonData(personId);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (data.firstName) {
            setFirstName(data.firstName);
        }
        if (data.lastName) {
            setLastName(data.lastName);
        }
        if (data.birthDate) {
            setBirthDate(data.birthDate);
        }
    }, [data]);

    const handleSubmit = (event) => {
        event.preventDefault();
        var target = event.target;
        var firstName = target.firstName.value;
        var lastName = target.lastName.value;
        var birthDate = target.birthDate.value;
        if (personId) {
            var id = personId;
            PersonService.updatePerson(id, firstName, lastName, birthDate)
                .then(response => {
                    if (response.id) {
                        setMessage("Person updated successfully");
                    } else {
                        setMessage("Error updating person");
                    }
                }).catch(error => {
                    setMessage("Error updating person");
                });
        } else {
            PersonService.addPerson(firstName, lastName, birthDate)
                .then(response => {
                    if (response.id) {
                        setMessage("Person added successfully, id:" + response.id);
                    } else {
                        setMessage("Error adding person");
                    }
                }).catch(error => {
                    setMessage("Error adding person");
                });
        }
    }

    return (
        <Container>
            <h1>{personId ? "Update person" : "Add person"}</h1>
            {message ? <div className="alert alert-success">{message}</div> :
                <Form className="person-form" onSubmit={handleSubmit}>
                    {personId &&
                        <Form.Group controlId="personId">
                            <Form.Label>Id</Form.Label>
                            <Form.Control type="text" name="personId" value={personId} readOnly />
                        </Form.Group>
                    }
                    <Form.Group controlId="firstName">
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text" placeholder="Enter first name" name="firstName" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="lastName">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text" placeholder="Enter last name" name="lastName" value={lastName} onChange={(event) => setLastName(event.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="birthDate">
                        <Form.Label>Birth date</Form.Label>
                        <Form.Control type="date" placeholder="Enter birth date" name="birthDate" value={birthDate} onChange={(event) => setBirthDate(event.target.value)} />
                    </Form.Group>
                    <br />
                    <button type="submit" className="btn btn-primary">{personId ? "Update person" : "Add person"}</button>
                    <br />
                </Form>
            }
        </Container>);
}