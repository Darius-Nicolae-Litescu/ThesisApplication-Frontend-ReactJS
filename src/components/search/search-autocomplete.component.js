import React, { Component } from "react";
import {
    AsyncTypeahead,
    Highlighter,
    Menu,
    MenuItem,
} from 'react-bootstrap-typeahead';
import ReactDOM from 'react-dom';
import './live-search-bar.css';
import SearchService from '../../services/search.service'
import { Card } from 'react-bootstrap'

import 'react-bootstrap-typeahead/css/Typeahead.css';

export default class SearchAutocomplete extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: [""],
            searchValues: [""],
            isLoading: false,
            finished: false
        };
        this.changeSelected = this.changeSelected.bind(this);
        this.searchValues = this.searchValues.bind(this);

    }

    searchValues(value) {
        this.setState({
            selected: value
        });
        this.setState({ isLoading: true })
        SearchService.searchByKeyword(value).then(
            response => {
                if (response != null) {
                    let results = response.hits.hits.map(({ _source: { title, description } }) => ({ title, description }));
                    console.log(results);
                    this.setState({
                        searchValues: results
                    });
                    this.setState({ isLoading: false })
                    this.setState({ finished: true })

                }
            },
            error => {
                console.log(error);
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    componentDidMount() {

    }

    changeSelected(e) {
        console.log(e);
        this.setState({
            selected: [e],
        });
    }


    render() {

        return (
            <AsyncTypeahead style={{ width: "100%", height: "40%" }}
                id="typeahead"
                delay={800}
                emptyLabel="Could not find any results"
                ignoreDiacritics={true}
                minLength={2}
                onSearch={this.searchValues}
                selectHintOnEnter={true}
                promptText="Searching"
                searchText="Searching"
                options={this.state.searchValues}
                labelKey={option => `${option.title} ${option.description}`}
                placeholder="Search ..."
                selected={this.state.selected.title}
                onInputChange={this.changeSelected}
                isLoading={this.state.isLoading}
                renderMenuItemChildren={(option) => (
                    <section>
                        <Card
                            bg="light"
                            text="dark"
                            className="mb-2"
                            style={{ width: '100%' }}
                        >
                            <div className="card-header border-0">
                                <img src="//placehold.it/100" alt="" />
                            </div>
                            <Card.Body>
                                <div class="card-block px-2">
                                    <Card.Title>{option.title}</Card.Title>
                                    <Card.Text>
                                        {option.description} {option.description} {option.description} {option.description} {option.description} {option.description}
                                    </Card.Text>
                                    <Card.Footer>{option.description}</Card.Footer>
                                </div>
                            </Card.Body>
                        </Card>
                    </section>
                )}
            />
        );

    }
}
