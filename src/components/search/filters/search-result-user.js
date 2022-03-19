import React from "react";
import { useState, useEffect } from 'react';
import { withTheme } from '@rjsf/core';
import { Theme as Bootstrap4Theme } from '@rjsf/bootstrap-4';
const Form = withTheme(Bootstrap4Theme);

const userSchema = {
  title: "User filter",
  description: "Filter Users",
  type: "object",
  properties: {
    username: {
      type: "string",
      title: "username"
    },
    email: {
      type: "string",
      title: "email"
    }
  }
};

export const UserFilter = (props) => {
  const { addUniqueFilterElseReplace } = props.addUniqueFilterElseReplace;

  const [filterValue, setFilterValue] = useState();


  return (
    <div className="UserFilter">
      <Form schema={userSchema}>
        <button className="FilterButton" type="submit">Filter</button>
      </Form>
    </div>
  );
}