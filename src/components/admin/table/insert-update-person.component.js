import React from "react";

import { withTheme } from "@rjsf/core";
import { Theme as Bootstrap4Theme } from "@rjsf/bootstrap-4";
const Form = withTheme(Bootstrap4Theme);

const JSONSchema = {
  title: "Insert or update a person object",
  description: "You can update or insert a person object",
  type: "object",
  required: ["firstName", "lastName", "birthDate"],
  properties: {
    firstName: {
      type: "string",
      title: "First name",
    },
    lastName: {
      type: "string",
      title: "Last name",
    },
    birthDate: {
      type: "string",
      title: "Birth date",
      format: "date",
    },
  },
};

const UISchema = {
  firstName: {
    "ui:autofocus": true,
    "ui:emptyValue": "",
    "ui:autocomplete": "first-name",
  },
  lastName: {
    "ui:emptyValue": "",
    "ui:autocomplete": "last-name",
  },
  birthDate: {
    "ui:emptyValue": "",
    "ui:autocomplete": "birthdate",
  },
};

function InsertUpdatePersonForm() {
  return (
    <div className="InsertOrUpdatePerson">
      <Form schema={JSONSchema} uiSchema={UISchema} />
    </div>
  );
}

export default InsertUpdatePersonForm;
