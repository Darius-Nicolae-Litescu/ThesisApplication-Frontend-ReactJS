import React, { Component } from "react";
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import SearchAutocomplete from "./search-autocomplete.component";
import PaginationCard from "./pagination-cards-search.component"
import SearchService from '../../services/search.service'
import StoryFilterService from '../../services/search-filter.service'

import { Button, Card, Container, Spinner, Table } from 'react-bootstrap'
import StorySearchCard from '../cards/story-search-card-component'
import StoryTaskSearchCard from '../cards/story-task-search-card-component'
import SoftwareApplicationCard from "../cards/software-application-card.component"
import UserCard from "../cards/user-card.component"
import CommentCard from "../cards/comment-card.component"

import applyRules from 'react-jsonschema-form-conditionals';
import Engine from 'json-rules-engine-simplified';
import { FilterWrapper } from "./filters/filter-wrapper.component"

import {
    AsyncTypeahead,
    Highlighter,
    Menu,
    MenuItem,
} from 'react-bootstrap-typeahead';

import "./search-result.css"

const SEARCH_VALUE = "searchValue";


export default class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: "",
            filters: {},
            filterData: {},
            searchValues: {},
            selected: "",
            finalFilter: {},
            collections: [],
            hitsCount: null,
            isLoading: false,
            isLoadingDataFinished: false,
            isLoadingFiltersFinished: false,
            finishedMappingObjects: false
        };
        this.loadFilterData = this.loadFilterData.bind(this);
        this.setFinalFilter = this.setFinalFilter.bind(this);

        this.searchValues = this.searchValues.bind(this);
        this.searchFilterResults = this.searchFilterResults.bind(this);

        this.addUniqueCollectionNameForFilters = this.addUniqueCollectionNameForFilters.bind(this);
        this.typingTimeout = null;
        this.onFieldChange = this.onFieldChange.bind(this);
    }

    onFieldChange(event) {
        let currentSelectedValue = event.target.value;
        this.setState({ selected: currentSelectedValue });

        if (currentSelectedValue && currentSelectedValue.length > 3) {
            clearTimeout(this.typingTimeout);
            this.typingTimeout = setTimeout(this.searchValues(currentSelectedValue), 1000);
        } else {
            clearTimeout(this.typingTimeout);
        }
    }


    addUniqueCollectionNameForFilters(collectionName) {
        if (this.state.collections.indexOf(collectionName) === -1) {
            console.log(collectionName)
            this.state.collections.push(collectionName);
        }
    }

    loadFilterData(collections) {
        this.setState({ isLoading: true })
        this.setState({ finishedMappingObjects: false })
        SearchService.getFieldsPropertyNamesForCollections(collections).then(
            response => {
                if (response != null) {
                    let results = response.propertyNamesForCollections;
                    console.log(results);
                    let filtersLoaded = [];

                    for (let [key, value] of Object.entries(results)) {
                        let filter = {
                            id: key, title: key, type: 'choice', choices: [],
                        };
                        value.forEach((property) => {
                            filter.choices.push(property);
                        });
                        filtersLoaded.push(filter);
                    }

                    this.setState({
                        filterData: filtersLoaded
                    });
                    console.log(filtersLoaded);
                    this.setState({ isLoading: false })
                    this.setState({ finishedMappingObjects: true })

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

    searchValues(value) {
        if (value === "") {
            return;
        }
        this.setState({ collections: [] })
        this.setState({ isLoading: true })
        this.setState({ isLoadingDataFinished: false })
        SearchService.searchByKeyword(value, [], [], []).then(
            response => {
                if (response != null && response.data.success != null) {
                    response = response.data.success;
                    if (response == null || response.elements == null) {
                        this.setState({
                            searchValues: [],
                            hitsCount: 0,
                            isLoading: false,
                            isLoadingDataFinished: true
                        })
                        return;
                    }
                    let results = response.elements.hits.hits;
                    let hits = response.numberOfResults;
                    console.log(results);
                    this.setState({
                        searchValues: results,
                        hitsCount: hits,
                    })
                    results.map((option, index, { length }) => {
                        this.addUniqueCollectionNameForFilters(option._index);
                    });
                    this.loadFilterData(this.state.collections);
                    console.log("Filter data loaded")
                } else if (response != null && response.data.success == null) {
                    this.setState({
                        searchValues: [],
                        hitsCount: 0,
                    });
                }
                this.setState({ isLoading: false });
                this.setState({ isLoadingDataFinished: true });
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


    searchFilterResults(value) {
        this.setState({ collections: [] })
        this.setState({ isLoading: true })
        this.setState({ isLoadingDataFinished: false })
        StoryFilterService.filterSearchResults(value).then(
            response => {
                if (response != null && response.data.success != null) {
                    response = response.data.success;
                    let results = response.elements;
                    let hits = response.numberOfResults;
                    console.log(results);
                    this.setState({
                        searchValues: results,
                        hitsCount: hits,
                    })
                    results.map((option, index, { length }) => {
                        this.addUniqueCollectionNameForFilters(option._index);
                    });
                } else if (response != null && response.data.success == null) {
                    this.setState({
                        searchValues: [],
                        hitsCount: 0,
                    });
                }
                this.setState({ isLoading: false });
                this.setState({ isLoadingDataFinished: true });
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

    setFinalFilter(value) {
        this.setState({ finalFilter: value });
        this.searchFilterResults(value);
    }

    render() {
        let { isLoadingDataFinished, isLoading, searchValues, finishedMappingObjects, filterData, collections, hitsCount } = this.state;

        return (
            <Container>
                <input style={{ width: "100%", height: "40%" }}
                    type="text"
                    name="searchValue"
                    value={this.state.searchValue}
                    placeholder="Search ..."
                    onChange={this.onFieldChange}
                />

                <div className="searchMainContainer">
                    {finishedMappingObjects &&
                        <FilterWrapper searchResultTypes={collections} setFinalFilter={this.setFinalFilter}></FilterWrapper>
                    }
                    <div className="cardsList">
                        {hitsCount != null && <h2 className="searchFont">Search results count: {hitsCount}</h2>}
                        {(function () {
                            if (!isLoadingDataFinished) {
                                if (isLoading) {
                                    return <Spinner animation="grow" variant="primary" size="lg" className="center-spinner" />;
                                }
                            } else {
                                return searchValues.map((option, index, { length }) => {
                                    if (option._index === "story") {
                                        console.log(option._source)
                                        return (<StorySearchCard key={index} story={option._source}></StorySearchCard>);
                                    } else if (option._index == "storytask") {
                                        return (<StoryTaskSearchCard key={index} storytask={option._source}></StoryTaskSearchCard>);
                                    } else if (option._index == "softwareapplication") {
                                        return (<SoftwareApplicationCard key={index} softwareapplication={option._source}></SoftwareApplicationCard>)
                                    } else if (option._index == "comment") {
                                        return (<CommentCard key={index} comment={option._source}></CommentCard>)
                                    } else if (option._index == "user") {
                                        return (<UserCard key={index} user={option._source}></UserCard>)
                                    }
                                })
                            }

                        })()}
                    </div>
                </div>

            </Container>

        );
    }
}
