 import React from "react";
import { useState, useEffect } from 'react';
import { withTheme } from '@rjsf/core';
import { Theme as Bootstrap4Theme } from '@rjsf/bootstrap-4';
const Form = withTheme(Bootstrap4Theme);

 const storySchema = {
  title: "Story filter",
  description: "Filter possible Story details",
  type: "object",
  properties: {
    title: {
      type: "string",
      title: "Title"
    },
    description: {
      type: "string",
      title: "Description"
    },
    category: {
      type: "string",
      title: "Category"
    },
    priorityTitle: {
      type: "string",
      title: "Priority Title"
    },
    priorityDescription: {
      type: "string",
      title: "Priority Description"
    },
    priorityLevel: {
      type: "number",
      title: "Priority Level"
    },
    softwareApplicationName: {
      type: "string",
      title: "Software Application Name"
    },
    softwareApplicationDescription: {
      type: "string",
      title: "Software Application Description"
    }
  }
};

export const StoryFilter = (props) => {
  const { addUniqueFilterElseReplace } = props.addUniqueFilterElseReplace;

  const [filterValue, setFilterValue] = useState();

  const getFilterValues = ({formData}) => {
    console.log(formData);
}

  return (
    <div className="StoryFilter">
    <Form schema={storySchema} onSubmit={getFilterValues}>
    <button className="FilterButton" type="submit">Filter</button>
    </Form>
  </div>
  );
}