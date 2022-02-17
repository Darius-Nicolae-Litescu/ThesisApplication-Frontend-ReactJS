import React, { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import SearchAutocomplete from "./search-autocomplete.component";
import PaginationCard from "./pagination-cards-search.component"
import SearchService from '../services/search.service'
import { Card, Container } from 'react-bootstrap'

export default class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: [""],
            searchValues: [""],
            isLoading: false,
            finished: false
        };
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

    render() {
        return (
            <Container>
                <SearchAutocomplete></SearchAutocomplete>
                <PaginationCard></PaginationCard>
            </Container>
        );
    }
}
