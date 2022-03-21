import React from "react";
import { useState, useEffect } from 'react';
import { withTheme } from '@rjsf/core';
import { Theme as Bootstrap4Theme } from '@rjsf/bootstrap-4';
import FilterStoryDto from '../../../services/filterDtos/filterStoryDto'

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
  const { setStoryFilter, keepFormData, setKeepFormData } = props;

  const [formData, setFormData] = useState();

  const getFilterValues = ({ formData }) => {
    let filterStoryDto = new FilterStoryDto(formData.title, formData.description, formData.category, formData.priorityId,
      formData.priorityTitle, formData.priorityDescription, formData.priorityLevel,
      formData.softwareApplicationName, formData.softwareApplicationDescription);

    setKeepFormData({ ...keepFormData, storyFilterFormData: formData });
    setStoryFilter(filterStoryDto);
  }

  const keepFormDataLogic = () => {
    if (keepFormData) {
      if (keepFormData.storyFilterFormData) {
        return keepFormData.storyFilterFormData;
      }
    }
    return {};
  }

  return (
    <div className="StoryFilter">
      <Form schema={storySchema} formData={keepFormDataLogic()} onSubmit={getFilterValues} >
        <button className="FilterButton" type="submit">Filter</button>
      </Form>
    </div>
  );
}