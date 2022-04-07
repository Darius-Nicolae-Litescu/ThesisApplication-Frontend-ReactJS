import React from "react";

import { withTheme } from '@rjsf/core';
import { Theme as Bootstrap4Theme } from '@rjsf/bootstrap-4';
import BoardService from "../../../services/board.service";
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

function insertBoardData(board) {
  BoardService.insertBoard(board).then(
    response => {
      if (response != null) {
        console.log(response);
      }
    },
    error => {
      console.log(error);
    }
  );
}

function processFormData(formData) {
  let board = {};
  board = { name: formData.name, ...board };
  formData.columnList.map((columnName, index) => {
    let column = {
      columnOrder: index + 1, title: columnName
    };
    board.columnList = board.columnList || [];
    board.columnList.push(column);
  });
  return board;
}

const processDetailsAndSubmit = ({ formData }) => {
  let board = processFormData(formData);
  console.log(board)
  insertBoardData(board);
}

function AddBoardForm() {
  return (
    <div className="AddBoardForm">
      <Form onSubmit={processDetailsAndSubmit} schema={JSONSchema} uiSchema={UISchema} />
    </div>
  );
}

export default AddBoardForm;


