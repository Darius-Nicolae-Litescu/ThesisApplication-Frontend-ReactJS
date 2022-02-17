import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import PositionService from '../../services/position.service'
import SoftwareApplicationService from '../../services/softwareapplication.service'
import CategoryService from '../../services/category.service'
import PriorityService from '../../services/priority.service'



import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

class DynamicTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOperation: "",
            data: null,
            columnNames: null
        };

        this.getColumnNames = this.getColumnNames.bind(this);
        this.camelCaseToTitle = this.camelCaseToTitle.bind(this);
    }

    componentDidMount() {
        if (this.props.selectedCategory === '1' && this.props.selectedOperation ==='2') {
            SoftwareApplicationService.getAllSoftwareApplications().then(
                response => {
                    this.setState({
                        data: response,
                    });
                    this.setState({
                        columnNames: this.getColumnNames()
                    });
                },
                error => {
                    this.setState({
                        content:
                            (error.response && error.response.data) ||
                            error.message ||
                            error.toString()
                    });
                }
            );
        } else if (this.props.selectedCategory === '2' && this.props.selectedOperation ==='2') {
            CategoryService.getAllCategories().then(
                response => {
                    this.setState({
                        data: response,
                    });
                    this.setState({
                        columnNames: this.getColumnNames()
                    });
                },
                error => {
                    this.setState({
                        content:
                            (error.response && error.response.data) ||
                            error.message ||
                            error.toString()
                    });
                }
            );
        } else if (this.props.selectedCategory === '3' && this.props.selectedOperation ==='2') {
            PriorityService.getAllPriorities().then(
                response => {
                    this.setState({
                        data: response,
                    });
                    this.setState({
                        columnNames: this.getColumnNames()
                    });
                },
                error => {
                    this.setState({
                        content:
                            (error.response && error.response.data) ||
                            error.message ||
                            error.toString()
                    });
                }
            );
        } else if (this.props.selectedCategory === '11' && this.props.selectedOperation ==='2') {
            PositionService.getAllPositions().then(
                response => {
                    this.setState({
                        data: response,
                    });
                    this.setState({
                        columnNames: this.getColumnNames()
                    });
                },
                error => {
                    this.setState({
                        content:
                            (error.response && error.response.data) ||
                            error.message ||
                            error.toString()
                    });
                }
            );
        }
    }

    camelCaseToTitle = function (word) {
        return word.replace(/((?<!^)[A-Z](?![A-Z]))(?=\S)/g, ' $1').replace(/^./, s => s.toUpperCase());
    }

    getColumnNames = function () {
        var keys = Object.keys(this.state.data[0]);
        var columnNames = [];
        keys.forEach(key => {
            let column =
            {
                dataField: key,
                text: this.camelCaseToTitle(key),
                sort: true
            };
            columnNames.push(column);
        })
        return columnNames;
    }

    render() {
        if (!this.state.data || !this.state.columnNames) {
            return <div>Loading... please wait!</div>
        } else {
            return (
                <div className="App">
                    <BootstrapTable
                        bootstrap4
                        keyField="id"
                        data={this.state.data}
                        columns={this.state.columnNames}
                        pagination={paginationFactory({ sizePerPage: 5 })}
                    />
                </div>
            );
        }
    }
}

export default DynamicTable;
