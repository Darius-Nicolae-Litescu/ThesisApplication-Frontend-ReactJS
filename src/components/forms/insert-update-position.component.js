import React from "react";

import { withTheme } from '@rjsf/core';
import { Theme as Bootstrap4Theme } from '@rjsf/bootstrap-4';
const Form = withTheme(Bootstrap4Theme);

const JSONSchema = {
    "title": "Insert or update a position",
    "description": "You can update or insert a position",
    "type": "object",
    "required": [
      "name",
      "seniorityLevel"
    ],
    "properties": {
      "name": {
        "type": "string",
        "title": "Name"
      },
      "seniorityLevel": {
        "type": "string",
        "title": "Seniority Level"
      }
    }
  };

const UISchema = {
    "name": {
      "ui:autofocus": true,
      "ui:emptyValue": "",
      "ui:autocomplete": "position-name"
    },
    "seniorityLevel": {
      "ui:emptyValue": "",
      "ui:autocomplete": "position-seniority-level"
    }
  };

function InsertUpdatePositionForm() {
    return (
        <div className="InsertOrUpdatePosition">
            <Form schema={JSONSchema} uiSchema={UISchema} />
        </div>
    );
}

export default InsertUpdatePositionForm;


