import React from "react";

import { withTheme } from "@rjsf/core";
import { Theme as Bootstrap4Theme } from "@rjsf/bootstrap-4";
const Form = withTheme(Bootstrap4Theme);

const JSONSchema = {
  title: "Insert or update a priority",
  description: "You can update or insert a priority",
  type: "object",
  required: ["title", "description", "level"],
  properties: {
    title: {
      type: "string",
      title: "Title",
    },
    description: {
      type: "string",
      title: "Description",
    },
    level: {
      type: "number",
      title: "Level",
    },
  },
};

const UISchema = {
  title: {
    "ui:autofocus": true,
    "ui:emptyValue": "",
    "ui:autocomplete": "title-name",
  },
  description: {
    "ui:emptyValue": "",
    "ui:autocomplete": "description",
  },
  level: {
    "ui:emptyValue": "",
    "ui:autocomplete": "priority-level",
  },
};

function InsertUpdatePriorityForm() {
  return (
    <div className="InsertOrUpdatePriority">
      <Form schema={JSONSchema} uiSchema={UISchema} />
    </div>
  );
}

export default InsertUpdatePriorityForm;
