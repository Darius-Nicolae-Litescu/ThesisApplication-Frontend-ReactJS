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
import { getLink, actionColumn } from './table-utils'
import { useNavigate } from 'react-router-dom';

import { Button, Container } from "react-bootstrap";


import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "./dynamic-table.css";

export default function DynamicTable(props) {
    const navigate = useNavigate();

    const { selectedCategory: selectedCategory, selectedOperation: selectedOperation } = props;

    const [page, setPage] = useState(1);
    const [sizePerPage, setSizePerPage] = useState(10);

    const [data, setData] = useState(null);
    const [columnNames, setColumnNames] = useState(null);
    const [error, setError] = useState(null);

    const handleInsertOrUpdateClick = (selectedCategory, id) => {
        navigate(getLink(selectedCategory, id))
    }

    const handleDelete = (selectedCategory, rowId) => {
        if (selectedCategory === 'SoftwareApplication') {
            SoftwareApplicationService.deleteSoftwareApplication(rowId).then(
                response => {
                    if (response != null) {
                        setData(response.data);
                    }
                }
            ).catch(
                error => {
                    setError(error);
                }
            )
        } else if (selectedCategory === 'Category') {
            CategoryService.deleteCategory(rowId).then(
                response => {
                    if (response != null) {
                        setData(response.data);
                    }
                }
            ).catch(
                error => {
                    setError(error);
                }
            )
        } else if (selectedCategory === 'Story') {
            StoryService.deleteStory(rowId).then(
                response => {
                    if (response != null) {
                        setData(response.data);
                    }
                }
            ).catch(
                error => {
                    setError(error);
                }
            )
        } else if (selectedCategory === 'StoryTask') {
            StoryTaskService.deleteStoryTask(rowId).then(
                response => {
                    if (response != null) {
                        setData(response.data);
                    }
                }
            ).catch(
                error => {
                    setError(error);
                }
            )
        } else if (selectedCategory === 'Employee') {
            EmployeeService.deleteEmployee(rowId).then(
                response => {
                    if (response != null) {
                        setData(response.data);
                    }
                }
            ).catch(
                error => {
                    setError(error);
                }
            )
        } else if (selectedCategory === 'Person') {
            PersonService.deletePerson(rowId).then(
                response => {
                    if (response != null) {
                        setData(response.data);
                    }
                }
            ).catch(
                error => {
                    setError(error);
                }
            )
        } else if (selectedCategory === 'Position') {
            PositionService.deletePosition(rowId).then(
                response => {
                    if (response != null) {
                        setData(response.data);
                    }
                }
            ).catch(
                error => {
                    setError(error);
                }
            );
        } else if (selectedCategory === 'User') {
            UserService.deleteUser(rowId).then(
                response => {
                    if (response != null) {
                        setData(response.data);
                    }
                }
            ).catch(
                error => {
                    setError(error);
                }
            )
        }
    };

    const cellFormatter = (rowContent, row) => {
        return (
            <Container className="action-buttons">
                <Button style={{ background: "royalblue" }} className="btn btn-danger btn-xs"
                    onClick={() => {
                        handleDelete(selectedCategory, row.id)
                    }}>Delete</Button>

                <Button style={{ background: "green" }} className="btn btn-danger btn-xs"
                    onClick={() => {
                        handleInsertOrUpdateClick(selectedCategory, row.id)
                    }}>Update</Button>
            </Container>
        )
    }

    const actionColumn = {
        dataField: 'link',
        text: 'ACTION',
        formatter: cellFormatter
    }

    useEffect(() => {
        if (selectedCategory === 'SoftwareApplication' && selectedOperation === 'insert-update-delete') {
            SoftwareApplicationService.getAllSoftwareApplications().then(
                response => {
                    setData(response);
                    setColumnNames([...getColumnNames(response), actionColumn]);
                },
                error => {
                    setError(error);
                }
            );
        } else if (selectedCategory === 'Category' && selectedOperation === 'insert-update-delete') {
            CategoryService.getAllCategories().then(
                response => {
                    setData(response);
                    setColumnNames([...getColumnNames(response), actionColumn]);
                },
                error => {
                    setError(error);
                }
            );
        } else if (selectedCategory === 'Priority' && selectedOperation === 'insert-update-delete') {
            PriorityService.getAllPriorities().then(
                response => {
                    setData(response);
                    setColumnNames([...getColumnNames(response), actionColumn]);
                },
                error => {
                    setError(error);
                }
            );
        } else if (selectedCategory === 'Story' && selectedOperation === 'insert-update-delete') {
            StoryService.getStories(page, sizePerPage).then(
                response => {
                    setData(response.rows);
                    setColumnNames([...getColumnNames(response.rows), actionColumn]);
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
                    setColumnNames([...getColumnNames(response.rows), actionColumn]);
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
                    setColumnNames([...getColumnNames(response.rows), actionColumn]);
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
                    setColumnNames([...getColumnNames(response.rows), actionColumn]);
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
                    setColumnNames([...getColumnNames(response), actionColumn]);
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
                    setColumnNames([...getColumnNames(response.rows), actionColumn]);
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
        dataField: "id",
        text: "Remove",
        editable: false
    };

    return (
        <div className="GenericTable">
            <Button style={{ background: "darkred" }} className="btn btn-danger btn-xs" onClick={() => { handleInsertOrUpdateClick(selectedCategory, null) }}>Insert</Button>
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

