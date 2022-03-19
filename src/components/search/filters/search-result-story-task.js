import React from "react";
import { useState, useEffect } from 'react';
import { withTheme } from '@rjsf/core';
import { Theme as Bootstrap4Theme } from '@rjsf/bootstrap-4';
const Form = withTheme(Bootstrap4Theme);

 const storyTaskSchema = {
  title: "Story Task filter",
  description: "Filter possible Story task details",
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
    storyPoints: {
      type: "number",
      title: "Story points"
    },
    createdByUsername: {
      type: "string",
      title: "Created by"
    },
    assignedToUsername: {
      type: "string",
      title: "Assigned to"
    },
    status: {
      type: "string",
      title: "Status"
    }
  }
};

export const StoryTaskFilter = (props) => {
  const { addUniqueFilterElseReplace } = props.addUniqueFilterElseReplace;

  const [filterValue, setFilterValue] = useState();


  return (
    <div className="StoryTaskFilter">
    <Form schema={storyTaskSchema}>
    <button type="submit">Filter</button>
    </Form>
  </div>
  );
}