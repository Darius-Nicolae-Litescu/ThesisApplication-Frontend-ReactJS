import React from "react";
import { useState, useEffect } from "react";
import { withTheme } from "@rjsf/core";
import { Theme as Bootstrap4Theme } from "@rjsf/bootstrap-4";
import FilterCommentDto from "../../../services/filterDtos/filterCommentDto";

const Form = withTheme(Bootstrap4Theme);

const commentSchema = {
  title: "Comment filter",
  description: "Filter comments",
  type: "object",
  properties: {
    content: {
      type: "string",
      title: "Content",
    },
  },
};

export const CommentFilter = (props) => {
  const { setCommentFilter, keepFormData, setKeepFormData } = props;

  const [filterValue, setFilterValue] = useState();

  const getFilterValues = ({ formData }) => {
    let filterCommentDto = new FilterCommentDto(formData.content);

    setKeepFormData({ ...keepFormData, commentFilterFormData: formData });
    setCommentFilter(filterCommentDto);
  };

  const keepFormDataLogic = () => {
    if (keepFormData) {
      if (keepFormData.commentFilterFormData) {
        return keepFormData.commentFilterFormData;
      }
    }
    return {};
  };

  return (
    <div className="CommentFilter">
      <Form
        schema={commentSchema}
        formData={keepFormDataLogic()}
        onSubmit={getFilterValues}
      >
        <button className="FilterButton" type="submit">
          Filter
        </button>
      </Form>
    </div>
  );
};
