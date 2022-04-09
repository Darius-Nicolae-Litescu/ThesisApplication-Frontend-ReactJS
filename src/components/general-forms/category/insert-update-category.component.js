import React from "react";
import { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    useParams,
    useNavigate
} from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import CategoryService from "../../../services/category.service";
import { FetchCategoryData } from "../../hooks/fetch-category";
import "./category.css"

export const AddOrUpdateCategory = () => {
    const navigate = useNavigate();
    const { categoryId } = useParams();
    const { status, data, error } = FetchCategoryData(categoryId);
    const [categoryName, setCategoryName] = useState('');
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (data.categoryName) {
            setCategoryName(data.categoryName);
        }
    }, [data])

    const handleSubmit = (event) => {
        event.preventDefault();
        var target = event.target;
        var categoryName = target.categoryName.value;
        if (categoryId) {
            var id = categoryId;
            CategoryService.updateCategory(id, categoryName)
                .then(response => {
                    if (response.id) {
                        setMessage("Category updated successfully");
                    } else {
                        setMessage("Error updating category");
                    }
                }).catch(error => {
                    setMessage("Error updating category");
                });
        } else {
            CategoryService.addCategory(categoryName)
                .then(response => {
                    if (response.id) {
                        setMessage("Category added successfully, id:" + response.id);
                    } else {
                        setMessage("Error adding category");
                    }
                }).catch(error => {
                    setMessage("Error adding category");
                });
        }
    }

    return (
        <Container>
            <h1>{categoryId ? "Update category" : "Add category"}</h1>
            {message ? <div className="alert alert-success">{message}</div> :
                <Form className="category-form" onSubmit={handleSubmit}>
                    {categoryId &&
                        <Form.Group controlId="categoryId">
                            <Form.Label>Category Id</Form.Label>
                            <Form.Control type="text" name="categoryId" value={categoryId} readOnly />
                        </Form.Group>
                    }
                    <Form.Group controlId="categoryName">
                        <Form.Label>Category Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter category name" name="categoryName" value={categoryName} onChange={(event) => setCategoryName(event.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="submit">
                        <br />
                        <button type="submit" className="btn btn-primary">{categoryId ? "Update category" : "Add category"}</button>
                        <br />
                    </Form.Group>
                </Form>}
        </Container>
    )
}