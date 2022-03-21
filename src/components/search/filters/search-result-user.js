import React from "react";
import { useState, useEffect } from 'react';
import { withTheme } from '@rjsf/core';
import { Theme as Bootstrap4Theme } from '@rjsf/bootstrap-4';
import FilterUserDto from '../../../services/filterDtos/filterUserDto'

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
  const { setUserFilter, keepFormData, setKeepFormData } = props;

  const [filterValue, setFilterValue] = useState();

  const getFilterValues = ({ formData }) => {
    let filterUserDto = new FilterUserDto(formData.username, formData.email);

    setKeepFormData({ ...keepFormData, userFilterFormData: formData });
    setUserFilter(filterUserDto);
  }


  const keepFormDataLogic = () => {
    if (keepFormData) {
      if (keepFormData.userFilterFormData) {
        return keepFormData.userFilterFormData;
      }
    }
    return {};
  }

  return (
    <div className="UserFilter">
      <Form schema={userSchema} formData={keepFormDataLogic()} onSubmit={getFilterValues} >
        <button className="FilterButton" type="submit">Filter</button>
      </Form>
    </div>
  );
}