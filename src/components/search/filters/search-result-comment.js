import React from "react";
import { useState, useEffect } from 'react';
import { withTheme } from '@rjsf/core';
import { Theme as Bootstrap4Theme } from '@rjsf/bootstrap-4';
const Form = withTheme(Bootstrap4Theme);

const commentSchema = {
  title: "Comment filter",
  description: "Filter comments",
  type: "object",
  properties: {
    content: {
      type: "string",
      title: "Content"
    }
  }
};

export const CommentFilter = (props) => {
  const { addUniqueFilterElseReplace } = props.addUniqueFilterElseReplace;

  const [filterValue, setFilterValue] = useState();
  const getFilterValues = ({formData}) => {
      console.log(formData);
  }

  return (
    <div className="CommentFilter">
      <Form schema={commentSchema} onSubmit={this.getFilterValues} >
        <button className="FilterButton" type="submit">Filter</button>
      </Form>
    </div>
  );
}