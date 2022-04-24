import React, { useEffect, useState, useReducer, Fragment } from "react";
import { Button, Container } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  useParams,
} from "react-router-dom";

import BoardService from "../../services/board.service";
import "./board.css";

export default function SubmitBoardChanges(props) {
  const { boardId, columns, updateColumns } = props;

  const [error, setError] = useState(null);

  const updateBoard = () => {
    const newColumns = columns.map((column) => {
      const newCards = column.cards.map((card) => {
        return {
          ...card,
          rank: column.cards.indexOf(card) * 10,
        };
      });
      return {
        ...column,
        cards: newCards,
      };
    });

    BoardService.updateBoard({ id: boardId, columnList: newColumns }).then(
      (response) => {
        if (response != null) {
          if (!response.data.success) {
            setError(response.data.message);
          } else {
            updateColumns(response.data.success.columnList);
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <div className="changes-error-wrapper">
      <Button onClick={() => updateBoard()} className="submit-changes-button">
        Save changes
      </Button>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
