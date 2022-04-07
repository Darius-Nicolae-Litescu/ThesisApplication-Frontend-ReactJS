import React from "react";
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import DynamicTable from "./forms/dynamic-table-component";
import { SelectCategories } from "./select-categories.component";
import { Container } from "react-bootstrap";

const optionsDropdownData = [
  { key: 'insert-update-delete', value: 'Insert/Update/Delete' }
];

const optionsData = [
  { key: 'SoftwareApplication', value: 'Software Application', options: optionsDropdownData },
  { key: 'Category', value: 'Category', options: optionsDropdownData },
  { key: 'Priority', value: 'Priority', options: optionsDropdownData },
  { key: 'Story', value: 'Story', options: optionsDropdownData },
  { key: 'StoryTask', value: 'Story Task', options: optionsDropdownData },
  { key: 'Employee', value: 'Employee', options: optionsDropdownData },
  { key: 'Person', value: 'Person', options: optionsDropdownData },
  { key: 'Position', value: 'Position', options: optionsDropdownData },
  { key: 'User', value: 'User', options: optionsDropdownData }
]

export default function AdminPanelDropdown() {
  const [sectionSelected, setSectionSelected] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedOperation, setSelectedOperation] = useState('');


  return (
    <Container className="Admin-Page">
      <SelectCategories sectionSelected={sectionSelected} selectedCategory={selectedCategory} selectedOperation={selectedOperation}
        setSelectedCategory={setSelectedCategory} setSelectedOperation={setSelectedOperation} setSectionSelected={setSectionSelected}
        optionsData={optionsData} />
      {sectionSelected != null && selectedCategory && (
        <DynamicTable selectedCategory={selectedCategory} selectedOperation={selectedOperation} />
      )}
    </Container>
  );
}