import React from "react";
import { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Routes,
    useParams,
} from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import PositionService from '../../../services/position.service'
import SoftwareApplicationService from '../../../services/softwareapplication.service'
import CategoryService from '../../../services/category.service'
import PriorityService from '../../../services/priority.service'
import StoryTaskService from '../../../services/story-task.service'
import StoryService from '../../../services/story.service'
import PersonService from '../../../services/person.service'
import EmployeeService from '../../../services/employee.service'
import UserService from '../../../services/user.service'



import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "./dynamic-table.css";

export default function DynamicTable(props) {
    const { selectedCategory: selectedCategory, selectedOperation: selectedOperation } = props;

    const [page, setPage] = useState(1);
    const [sizePerPage, setSizePerPage] = useState(10);

    const [data, setData] = useState(null);
    const [columnNames, setColumnNames] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (selectedCategory === 'SoftwareApplication' && selectedOperation === 'insert-update-delete') {
            SoftwareApplicationService.getAllSoftwareApplications().then(
                response => {
                    setData(response);
                    setColumnNames(getColumnNames(response));
                },
                error => {
                    setError(error);
                }
            );
        } else if (selectedCategory === 'Category' && selectedOperation === 'insert-update-delete') {
            CategoryService.getAllCategories().then(
                response => {
                    setData(response);
                    setColumnNames(getColumnNames(response));
                },
                error => {
                    setError(error);
                }
            );
        } else if (selectedCategory === 'Priority' && selectedOperation === 'insert-update-delete') {
            PriorityService.getAllPriorities().then(
                response => {
                    setData(response);
                    setColumnNames(getColumnNames(response));
                },
                error => {
                    setError(error);
                }
            );
        } else if (selectedCategory === 'Story' && selectedOperation === 'insert-update-delete') {
            StoryService.getStories(page, sizePerPage).then(
                response => {
                    setData(response.rows);
                    setColumnNames(getColumnNames(response.rows));
                },
                error => {
                    setError(error);
                }
            );
        }
        else if (selectedCategory === 'StoryTask' && selectedOperation === 'insert-update-delete') {
            StoryTaskService.getStoryTasks(page, sizePerPage).then(
                response => {
                    setData(response.rows);
                    setColumnNames(getColumnNames(response.rows));
                },
                error => {
                    setError(error);
                }
            );
        }
        else if (selectedCategory === 'Employee' && selectedOperation === 'insert-update-delete') {
            EmployeeService.getEmployees(page, sizePerPage).then(
                response => {
                    setData(response.rows);
                    setColumnNames(getColumnNames(response.rows));
                },
                error => {
                    setError(error);
                }
            );
        }
        else if (selectedCategory === 'Person' && selectedOperation === 'insert-update-delete') {
            PersonService.getPersons(page, sizePerPage).then(
                response => {
                    setData(response.rows);
                    setColumnNames(getColumnNames(response.rows));
                },
                error => {
                    setError(error);
                }
            );
        }
        else if (selectedCategory === 'Position' && selectedOperation === 'insert-update-delete') {
            PositionService.getAllPositions().then(
                response => {
                    setData(response);
                    setColumnNames(getColumnNames(response));
                },
                error => {
                    setError(error);
                }
            );
        }
        else if (selectedCategory === 'User' && selectedOperation === 'insert-update-delete') {
            UserService.getUsers(page, sizePerPage).then(
                response => {
                    setData(response.rows);
                    setColumnNames(getColumnNames(response.rows));
                },
                error => {
                    setError(error);
                }
            );
        }
    }, [selectedCategory, selectedOperation]);


    const onPageChange = (page, sizePerPage) => {
        setPage(page);
        setSizePerPage(sizePerPage);
    }

    const camelCaseToTitle = (word) => {
        return word.replace(/((?<!^)[A-Z](?![A-Z]))(?=\S)/g, ' $1').replace(/^./, s => s.toUpperCase());
    }

    const getColumnNames = (response) => {
        var keys = Object.keys(response[0]);
        var columnNames = [];
        keys.forEach(key => {
            let column =
            {
                dataField: key,
                text: camelCaseToTitle(key),
                sort: true
            };
            columnNames.push(column);
        })
        return columnNames;
    }

    if (data) {
        if (Array.isArray(data)) {
            data.map((item) => {
                Object.keys(item).forEach(key => {
                    if (Array.isArray(item[key])) {
                        item[key] = item[key].join(', ');
                    }
                });
            });
        }
    }

    if (!data || !columnNames) {
        return <div>Loading {camelCaseToTitle(selectedCategory)} data, please wait!</div>
    }

    const options = {
        onPageChange: onPageChange,
        hideSizePerPage: false,
        page: 1,
        sizePerPage: sizePerPage,
        paginationSize: 6,
    };

    return (
        <div className="GenericTable">
            <BootstrapTable
                bootstrap4
                options={options}
                keyField="id"
                data={data}
                columns={columnNames}
                pagination={paginationFactory({ sizePerPage: 5 })}
                className="stylish-table"
            />
        </div>
    );

}

