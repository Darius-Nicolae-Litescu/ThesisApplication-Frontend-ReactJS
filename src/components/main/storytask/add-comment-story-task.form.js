import React from "react";
import { Component } from "react";
import { Container } from "react-bootstrap";
import { TextField, Button } from 'react-bootstrap'

import { useParams } from "react-router";
import { withTheme } from '@rjsf/core';
import StoryTaskService from "../../../services/story-task.service";
import TextareaAutosize from 'react-textarea-autosize';
import isEmpty from "../../../helpers/stringUtils"





export default class AddComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFiles: undefined,
      currentFiles: undefined,
      message: null,
      comment: "",
      fileInfos: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileToDataURL = this.fileToDataURL.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  fileToDataURL(event) {
    this.setState({
      progress: 0,
      currentFiles: event.target.files,
    });
  };

  handleChange(event) {
    if (this.state.comment === '') {
      this.setState({ message: null });
    }
    this.setState({
      comment: event.target.value
    });
  }

  handleSubmit({ formData }) {
    if (isEmpty(this.state.comment)) {
      this.setState({ message: "Text box cannot be empty" });
      return;
    }

    console.log(formData);

    const storyTaskId = this.props.storyTaskId;
    const files = this.state.currentFiles;
    const comment = this.state.comment;

    if (this.state.comment) {
      this.state.message = ""
      StoryTaskService.addComment(comment, storyTaskId, files)
        .then((response) => {
          this.props.refreshComments(response);
          console.log(response);

        })
        .catch(() => {
          this.setState({
            message: "Could not add comment!",
          });
        });
      this.setState({
        selectedFiles: undefined,
      });
    };
  }

  render() {
    return (
      <Container>
        <h2>Add a comment</h2>
        <TextareaAutosize onChange={this.handleChange} style={{ width: "100%" }} maxRows={50} minRows={5}></TextareaAutosize>
        <input multiple="multiple" type='file' name='files[]' onChange={(event) => this.fileToDataURL(event)}></input>
        <div>
          <br></br>
          <Button onClick={this.handleSubmit} variant="primary">Add comment</Button>{' '}
        </div>
        {this.state.message && (
          <p className="error"> {this.state.message} </p>
        )}
      </Container>
    );
  }

}






