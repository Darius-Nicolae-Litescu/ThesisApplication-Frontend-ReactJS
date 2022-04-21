import React from "react";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import { Board } from "./board.component";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { FetchBoardsData } from "../hooks/fetch-boards";
import Container from "react-bootstrap/Container";
import AddBoardForm from "./form/insert-board-form";
import { Button } from "react-bootstrap";
import "./board-selection.css";
//ToDo: Live search instead of get all boards

export const BoardSelection = (props) => {
  const { status, data, error } = FetchBoardsData();

  const [enableBoardForm, setEnableBoardForm] = useState(false);
  const openBoard = (boardId) => {
    window.open("/kanban-board/" + boardId);
  };

  return (
    <Container>
      <Button
        className="AddBoardButton"
        onClick={() => {
          setEnableBoardForm(!enableBoardForm);
        }}
      >
        Add board
      </Button>
      <div className="board-selection">
        <AsyncTypeahead
          id="board-selection"
          labelKey="name"
          onSearch={(query) => {
            console.log(query);
          }}
          options={data}
          placeholder="Select a board"
          renderMenuItemChildren={(option, props) => (
            <div>
              <span>{option.name}</span>
            </div>
          )}
          onChange={(selected) => {
            if (selected.length > 0) {
              openBoard(openBoard(selected[0].id));
            }
          }}
        />
      </div>
      <div className="AddBoardForm">
        {enableBoardForm ? <AddBoardForm></AddBoardForm> : null}
      </div>
    </Container>
  );
};
