import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import { FetchCategoryData } from "../../hooks/fetch-all-categories";
import { FetchPriorityData } from "../../hooks/fetch-all-priorities";
import { FetchSoftwareApplicationData } from "../../hooks/fetch-all-software-applications";
import StoryService from "../../../services/story.service";
import "./add-story.css";

export const AddStory = (props) => {
  const navigate = useNavigate();

  const {
    fetchCategoryDataStatus,
    data: categoriesData,
    fetchCategoryDataError,
  } = FetchCategoryData();
  const {
    fetchPriorityDataStatus,
    data: priorityData,
    fetchPriorityDataError,
  } = FetchPriorityData();
  const {
    fetchSoftwareApplicationDataStatus,
    data: softwareApplicationData,
    fetchSoftwareApplicationDataError,
  } = FetchSoftwareApplicationData();

  const handleSubmit = (event) => {
    event.preventDefault();
    var target = event.target;
    var categoriesIds = [];
    for (var i = 0, l = target.categories.length; i < l; i++) {
      if (target.categories[i].selected) {
        categoriesIds.push(parseInt(target.categories[i].value));
      }
    }

    let title = target.title.value;
    let description = target.description.value;
    let priorityId = parseInt(target.priority.value);
    let softwareApplicationId = parseInt(target.softwareApplication.value);

    StoryService.addStory(
      title,
      description,
      categoriesIds,
      priorityId,
      softwareApplicationId
    )
      .then((response) => {
        navigate(`/story/${response.id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <h1>Add a story</h1>
      <Form className="add-story-form" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="title">Title</Form.Label>
          <Form.Control
            required
            type="text"
            className="form-control"
            id="title"
            aria-describedby="titleHelp"
            placeholder="Enter title"
          />
          <small id="titleHelp" className="form-text text-muted">
            Enter the title of the story
          </small>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="description">Description</Form.Label>
          <Form.Control
            required
            type="text"
            className="form-control"
            id="description"
            aria-describedby="descriptionHelp"
            placeholder="Enter description"
          />
          <small id="descriptionHelp" className="form-text text-muted">
            Enter the description of the story
          </small>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="categories">Categories</Form.Label>
          <Form.Control
            required
            as="select"
            multiple
            className="form-control"
            id="categories"
            aria-describedby="categoriesHelp"
          >
            {categoriesData.map((category) => (
              <option key={category.id} value={category.id}>
                {category.categoryName}
              </option>
            ))}
          </Form.Control>
          <small id="categoriesHelp" className="form-text text-muted">
            Select the categories of the story
          </small>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="priority">Priority</Form.Label>
          <Form.Control
            required
            as="select"
            className="form-control"
            id="priority"
            aria-describedby="priorityHelp"
          >
            {priorityData.map((priority) => (
              <option key={priority.id} value={priority.id}>
                {priority.title}
              </option>
            ))}
          </Form.Control>
          <small id="priorityHelp" className="form-text text-muted">
            Select the priority of the story
          </small>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="softwareApplication">
            Software Application
          </Form.Label>
          <Form.Control
            required
            as="select"
            className="form-control"
            id="softwareApplication"
            aria-describedby="softwareApplicationHelp"
          >
            {softwareApplicationData.map((softwareApplication) => (
              <option
                key={softwareApplication.id}
                value={softwareApplication.id}
              >
                {softwareApplication.name}
              </option>
            ))}
          </Form.Control>
          <small id="softwareApplicationHelp" className="form-text text-muted">
            Select the software application of the story
          </small>
        </Form.Group>

        <br />
        <button type="submit" className="btn btn-primary">
          Add story
        </button>
        <br />
      </Form>
    </Container>
  );
};
