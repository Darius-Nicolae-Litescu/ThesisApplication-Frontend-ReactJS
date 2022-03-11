import React from "react";
import { Component } from "react";
import { Container } from "react-bootstrap";
import { TextField, Button } from 'react-bootstrap'

import { useParams } from "react-router";
import { withTheme } from '@rjsf/core';
import StoryTaskService from "../../../services/story-task.service";
import TextareaAutosize from 'react-textarea-autosize';






export default class AddComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFiles: undefined,
      currentFiles: undefined,
      comment: null,
      progress: 0,
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
    this.setState({
      comment: event.target.value
    });
  }

  handleSubmit({ formData }) {
    console.log(formData);

    const storyTaskId = this.props.storyTaskId;
    const files = this.state.currentFiles;
    const comment = this.state.comment;

    StoryTaskService.addComment(comment, storyTaskId, files, (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    })
      .then((response) => {
        this.props.refreshComments(response);
        console.log(response);

      })
      .then((files) => {
        this.setState({
          fileInfos: files.data,
        });
      })
      .catch(() => {
        this.setState({
          progress: 0,
          message: "Could not upload the file!",
          currentFile: undefined,
        });
      });
    this.setState({
      selectedFiles: undefined,
    });
  };

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
      </Container>
    );
  }

}






