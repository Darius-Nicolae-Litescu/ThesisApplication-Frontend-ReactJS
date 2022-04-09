import React from "react";
import { useState } from 'react';
import { withTheme } from '@rjsf/core';
import { Theme as Bootstrap4Theme } from '@rjsf/bootstrap-4';
import BoardService from "../../../services/board.service";
import { useNavigate } from 'react-router-dom';

import "../board-selection.css"
const Form = withTheme(Bootstrap4Theme);

const JSONSchema = {
  type: "object",
  required: [
    "name"
  ],
  properties: {
    name: {
      type: "string",
      title: "Board name",
      default: "Board name"
    },
    columnList: {
      type: "array",
      title: "Column names",
      items: {
        type: "string",
        default: "Column name"
      }
    }
  }
};

const UISchema = {
  "columnNames": {
    "items": {
      "ui:emptyValue": ""
    }
  },
  "name": {
    "ui:autofocus": true,
    "ui:emptyValue": ""
  }
};

function AddBoardForm() {
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const insertBoardData = (board) => {
    BoardService.insertBoard(board).then(
      response => {
        if (response != null) {
          navigate(`/kanban-board/${response.id}`);
        }
      },
      error => {
        setError(error);
      }
    );
  }

  const processFormData = (formData) => {
    let board = {};
    board = { name: formData.name, ...board };
    let columnList = formData.columnList;
    if (columnList) {
      columnList.map((columnName, index) => {
        let column = {
          columnOrder: index + 1, title: columnName
        };
        board.columnList = board.columnList || [];
        board.columnList.push(column);
      });
    }
    return board;
  }

  const processDetailsAndSubmit = ({ formData }) => {
    let board = processFormData(formData);
    if (board.columnList && board.columnList.length > 0) {
      insertBoardData(board);
    } else {
      setError("Board column list cannot be empty")
    }
  }

  return (
    error ?
      <div className="alert alert-danger">{error}</div>
      :
      <div className="AddBoardForm">
        <Form onSubmit={processDetailsAndSubmit} schema={JSONSchema} uiSchema={UISchema} />
      </div>
  );
}

export default AddBoardForm;


