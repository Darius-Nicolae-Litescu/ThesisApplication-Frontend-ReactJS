import React from "react";
import StorySubtask from "./story-subtask.component";
import { Container } from "react-bootstrap"
import "./subtask.css"

export default function SubtaskList(props) {
  return (
    props.storySubtasks ?
      <Container><h5 className="text-muted mb-4">
        {" "}
        Subtask{props.storySubtasks.length > 0 ? "s count: " : " count : "}
        <span>{props.storySubtasks.length}</span>
      </h5>
        <div className="subtaskList">
          {props.storySubtasks.map((subtask, index) => (
            <StorySubtask key={index} subtask={subtask} />
          ))}
        </div>
      </Container>
      :
      <div></div>
  );
}