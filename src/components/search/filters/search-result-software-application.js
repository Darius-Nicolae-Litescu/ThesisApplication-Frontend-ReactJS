import React from "react";
import { useState, useEffect } from 'react';
import { withTheme } from '@rjsf/core';
import { Theme as Bootstrap4Theme } from '@rjsf/bootstrap-4';
import FilterSoftwareApplicationDto from '../../../services/filterDtos/filterSoftwareApplicationDto'


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
  const { setSoftwareApplicationFilter, keepFormData, setKeepFormData } = props;

  const [filterValue, setFilterValue] = useState();
  const getFilterValues = ({ formData }) => {
    let filterSoftwareApplicationDto = new FilterSoftwareApplicationDto(formData.name, formData.description);

    setKeepFormData({ ...keepFormData, softwareApplicationFilterFormData: formData });
    setSoftwareApplicationFilter(filterSoftwareApplicationDto);
  }

  const keepFormDataLogic = () => {
    if (keepFormData) {
      if (keepFormData.softwareApplicationFilterFormData) {
        return keepFormData.softwareApplicationFilterFormData;
      }
    }
    return {};
  }

  return (
    <div className="SoftwareApplicationFilter">
      <Form schema={softwareApplicationSchema} formData={keepFormDataLogic()} onSubmit={getFilterValues} >
        <button className="FilterButton" type="submit">Filter</button>
      </Form>
    </div>
  );
}