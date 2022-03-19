import React from "react";
import { useState, useEffect } from 'react';
import { withTheme } from '@rjsf/core';
import { Theme as Bootstrap4Theme } from '@rjsf/bootstrap-4';
const Form = withTheme(Bootstrap4Theme);

const softwareApplicationSchema = {
  title: "Software Application filter",
  description: "Filter possible Software Applications",
  type: "object",
  properties: {
    name: {
      type: "string",
      title: "Name"
    },
    description: {
      type: "string",
      title: "Description"
    }
  }
};

export const SoftwareApplicationFilter = (props) => {
  const { addUniqueFilterElseReplace } = props.addUniqueFilterElseReplace;

  const [filterValue, setFilterValue] = useState();


  return (
    <div className="SoftwareApplicationFilter">
      <Form schema={softwareApplicationSchema}>
        <button className="FilterButton" type="submit">Filter</button>
      </Form>
    </div>
  );
}