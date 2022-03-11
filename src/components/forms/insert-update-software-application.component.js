import React from "react";

import { withTheme } from '@rjsf/core';
import { Theme as Bootstrap4Theme } from '@rjsf/bootstrap-4';
const Form = withTheme(Bootstrap4Theme);

const JSONSchema = {
  "title": "Insert or update a software application",
  "description": "You can update or insert a software application",
  "type": "object",
  "required": [
    "name",
    "description"
  ],
  "properties": {
    "name": {
      "type": "string",
      "title": "Name"
    },
    "description": {
      "type": "string",
      "title": "Description"
    }
  }
};

const UISchema = {
  "name": {
    "ui:autofocus": true,
    "ui:emptyValue": "",
    "ui:autocomplete": "first-name"
  },
  "description": {
    "ui:emptyValue": "",
    "ui:autocomplete": "last-name"
  }
};

function InsertUpdateSoftwareApplicationForm() {
    return (
        <div className="InsertOrUpdateSoftwareApplication">
            <Form schema={JSONSchema} uiSchema={UISchema} />
        </div>
    );
}

export default InsertUpdateSoftwareApplicationForm;


