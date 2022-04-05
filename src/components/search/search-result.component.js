import React, { useEffect, useState, useReducer, Fragment } from 'react';

import {
    BrowserRouter as Router,
    Link,
    Route,
    Routes,
    useParams,
} from "react-router-dom";

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


export const SearchResult = (props) => {

    const { searchTerm } = useParams();

    const [searchingTerm, setSearchingTerm] = useState(searchTerm);

    const [selected, setSelected] = useState(searchTerm);
    const [filters, setFilters] = useState({});
    const [filterData, setFilterData] = useState({});
    const [searchValues, setSearchValues] = useState({});
    const [finalFilter, setFinalFilter] = useState({});
    const [collections, setCollections] = useState([]);
    const [hitsCount, setHitsCount] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingDataFinished, setIsLoadingDataFinished] = useState(false);
    const [finishedMappingObjects, setFinishedMappingObjects] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState(null);
    const [error, setError] = useState(null);


    function onFieldChange(event) {
        let currentSelectedValue = event.target.value;
        setSearchingTerm(currentSelectedValue);
        if (currentSelectedValue && currentSelectedValue.length > 3) {
            clearTimeout(typingTimeout);
            setTypingTimeout(setTimeout(searchForValues(currentSelectedValue), 1000));
        } else {
            clearTimeout(typingTimeout);
        }
    }

    function loadFilterData(collections) {
        setIsLoading(true);
        setFinishedMappingObjects(false);

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

                    setFilterData(filtersLoaded);

                    console.log(filtersLoaded);

                    setIsLoading(false);
                    setFinishedMappingObjects(true);

                }
            },
            error => {
                console.log(error);
                setError(error);
            }
        );
    }

    function searchForValues(value) {
        if (value === "") {
            return;
        }
        setCollections([]);
        setIsLoading(true);
        setIsLoadingDataFinished(false);

        SearchService.searchByKeyword(value, [], [], []).then(
            response => {
                if (response != null && response.data.success != null) {
                    response = response.data.success;
                    if (response == null || response.elements == null) {
                        setSearchValues([]);
                        setHitsCount(0);
                        setIsLoading(false);
                        setIsLoadingDataFinished(true);
                        return;
                    }
                    let results = response.elements.hits.hits;
                    let hits = response.numberOfResults;
                    console.log(results);

                    setSearchValues(results);
                    setHitsCount(hits);

                    const uniqueCollectionNames = [...new Set(results.map(option => option._index))];
                    setCollections(uniqueCollectionNames);

                    loadFilterData(collections);
                    console.log("Filter data loaded")

                } else if (response != null && response.data.success == null) {
                    setSearchValues([]);
                    setHitsCount(0);
                }
                setIsLoading(false);
                setIsLoadingDataFinished(true);
            },
            error => {
                console.log(error);
                setError(error);
            }
        );
    }


    function searchFilterResults(value) {
        setCollections([]);
        setIsLoading(true);
        setIsLoadingDataFinished(false);
        StoryFilterService.filterSearchResults(value).then(
            response => {
                if (response != null && response.data.success != null) {
                    response = response.data.success;
                    let results = response.elements;
                    let hits = response.numberOfResults;
                    console.log(results);

                    setSearchValues(results);
                    setHitsCount(hits);

                    const uniqueCollectionNames = [...new Set(results.map(option => option._index))];
                    setCollections(uniqueCollectionNames);
                    loadFilterData(collections);

                } else if (response != null && response.data.success == null) {
                    setSearchValues([]);
                    setHitsCount(0);
                }
                setIsLoading(false);
                setIsLoadingDataFinished(true);
            },
            error => {
                console.log(error);
                setError(error);
            }
        );
    }

    function changeFinalFilter(value) {
        setFinalFilter(value);
        searchFilterResults(value);
    }

    useEffect(() => {
        searchForValues(searchTerm)
    },
        []
    )


    return (

        <Container style={{ marginLeft: "10%" }}>
            <input style={{ width: "100%", height: "40%" }}
                type="text"
                name="searchValue"
                value={searchingTerm}
                placeholder="Search ..."
                onChange={onFieldChange}
            />

            <div className="searchMainContainer">
                {finishedMappingObjects &&
                    <FilterWrapper searchResultTypes={collections} setFinalFilter={changeFinalFilter} isLoading = {isLoading} isLoadingDataFinished = {isLoadingDataFinished} ></FilterWrapper>
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

