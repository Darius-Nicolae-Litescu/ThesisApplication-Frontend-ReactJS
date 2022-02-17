import React from "react";
import { DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap';
import DynamicTable from "./dynamic-table-component";
import BootstrapLeftNavbar from "../bootstrap-left-options-adminpanel.component";


class AdminPanelDropdown extends React.Component {

  constructor(props) {
    let optionsDropdownData = [
      { key: '1', value: 'Insert or Update' },
      { key: '2', value: 'Display' },
      { key: '3', value: 'Delete' },
    ];
    super(props);
    this.state = {
      selectedCategory: null,
      selectedOperation: null,
      optionsdata: [
        { key: '1', value: 'Software Application', options: optionsDropdownData },
        { key: '2', value: 'Category', options: optionsDropdownData },
        { key: '3', value: 'Priority', options: optionsDropdownData },
        { key: '4', value: 'Story', options: optionsDropdownData },
        { key: '5', value: 'Story Comment', options: optionsDropdownData },
        { key: '6', value: 'Story Task', options: optionsDropdownData },
        { key: '7', value: 'Comment Attachment', options: optionsDropdownData },
        { key: '8', value: 'Attachment', options: optionsDropdownData },
        { key: '9', value: 'Employee', options: optionsDropdownData },
        { key: '10', value: 'Person', options: optionsDropdownData },
        { key: '11', value: 'Position', options: optionsDropdownData },
        { key: '12', value: 'User', options: optionsDropdownData },
        { key: '13', value: 'User Role', options: optionsDropdownData },
      ],
      displayTableEnabled: false,
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.displayTable = this.displayTable.bind(this);

  }

  displayTable = () => {
    this.setState({ displayTableEnabled: !this.state.displayTableEnabled });
  }

  handleClick = (category, operation) => {
    this.state.selectedCategory = category ;
    this.state.selectedOperation = operation ;
  }

  handleSelect = (e) => {
    console.log(e);
  }

  render() {
    return (
      <div id="Admin-Page">
        <BootstrapLeftNavbar optionsData={this.state.optionsdata}></BootstrapLeftNavbar>
      
        {this.state.displayTableEnabled && this.state.selectedCategory && (
          <DynamicTable selectedCategory={this.state.selectedCategory} selectedOperation={this.state.selectedOperation}>
          </DynamicTable>
        )}
      </div>
    );
  }
}

export default AdminPanelDropdown;
