import React from "react";
import { useState, useEffect } from "react";
import { withTheme } from "@rjsf/core";
import { Theme as Bootstrap4Theme } from "@rjsf/bootstrap-4";
import FilterStoryTaskDto from "../../../services/filterDtos/filterStoryTaskDto";

const Form = withTheme(Bootstrap4Theme);

const storyTaskSchema = {
  title: "Story Task filter",
  description: "Filter possible Story task details",
  type: "object",
  properties: {
    title: {
      type: "string",
      title: "Title",
    },
    description: {
      type: "string",
      title: "Description",
    },
    storyPoints: {
      type: "number",
      title: "Story points",
    },
    createdByUsername: {
      type: "string",
      title: "Created by",
    },
    assignedToUsername: {
      type: "string",
      title: "Assigned to",
    },
    status: {
      type: "string",
      title: "Status",
    },
  },
};

export const StoryTaskFilter = (props) => {
  const { setStoryTaskFilter, keepFormData, setKeepFormData } = props;

  const [filterValue, setFilterValue] = useState();

  const getFilterValues = ({ formData }) => {
    let filterStoryTaskDto = new FilterStoryTaskDto(
      formData.title,
      formData.description,
      formData.storyPoints,
      formData.createdByUsername,
      formData.assignedToUsername,
      formData.status
    );

    setKeepFormData({ ...keepFormData, storyTaskFilterFormData: formData });

    setStoryTaskFilter(filterStoryTaskDto);
  };

  const keepFormDataLogic = () => {
    if (keepFormData) {
      if (keepFormData.storyTaskFilterFormData) {
        return keepFormData.storyTaskFilterFormData;
      }
    }
    return {};
  };

  return (
    <div className="StoryTaskFilter">
      <Form
        schema={storyTaskSchema}
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
