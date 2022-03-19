import React, { Component } from "react";
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import SearchAutocomplete from "./search-autocomplete.component";
import PaginationCard from "./pagination-cards-search.component"
import SearchService from '../../services/search.service'
import { Button, Card, Container, Spinner, Table } from 'react-bootstrap'
import StorySearchCard from '../cards/story-search-card-component'
import StoryTaskSearchCard from '../cards/storytask-search-card-component'
import applyRules from 'react-jsonschema-form-conditionals';
import Engine from 'json-rules-engine-simplified';

import {
    AsyncTypeahead,
    Highlighter,
    Menu,
    MenuItem,
} from 'react-bootstrap-typeahead';

const SEARCH_VALUE = "searchValue";


const filterComponents = {
    choice: ({ filter, onChange, onChangeFilterForTextSearch, onButtonClick, value }) => (
        <div>
            <input type="text" onInput={(e) => onChangeFilterForTextSearch(`searchValue`, e.target.value)} />
            <select id={filter.id} value={value || ''} onInput={(e) => onChange(filter.id, e.target.value)} size={1 + filter.choices.length}>
                <option value="">(none)</option>
                {filter.choices.map((c) => <option value={c} key={c}>{c}</option>)}
            </select  >
            <Button onClick={onButtonClick}>Apply filter</Button>
        </div>
    ),
};

export default class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: [""],
            searchValues: [""],
            filters: {},
            filterData: {},
            allFiltersApplied: [],
            collections: [],
            isLoading: false,
            isLoadingDataFinished: false,
            isLoadingFiltersFinished: false,
            finishedMappingObjects: false
        };
        this.searchValues = this.searchValues.bind(this);
        this.onChangeFilter = this.onChangeFilter.bind(this);
        this.onChangeFilterForTextSearch = this.onChangeFilterForTextSearch.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
        this.loadFilterData = this.loadFilterData.bind(this);
        this.addUniqueCollectionNameForFilters = this.addUniqueCollectionNameForFilters.bind(this);
    }

    onButtonClick() {
        console.log(this.state.allFiltersApplied);
        console.log(this.state.filters);

        for (let [key, value] of Object.entries(this.state.filters)) {
            if (key !== SEARCH_VALUE) {
                if (this.state.allFiltersApplied[key]) {
                    for (var filterKey in this.state.allFiltersApplied[key]) {
                        let indexOf = this.state.allFiltersApplied[key].map(e => e[key]).indexOf(this.state.filters[key]);
                        if ((this.state.filters[key] != this.state.allFiltersApplied[key][filterKey][key]) && indexOf === -1) {
                            this.state.allFiltersApplied[key].push(this.state.filters);
                        } else {
                            this.state.allFiltersApplied[key][indexOf][SEARCH_VALUE] = this.state.filters[SEARCH_VALUE];
                        }
                    }
                } else if (!this.state.allFiltersApplied[key]) {
                    this.state.allFiltersApplied[key] = [];
                    this.state.allFiltersApplied[key].push(this.state.filters);
                }
            }
        }
    }

    onChangeFilter(filterId, value) {
        let searchArray;
        if (this.state.filters[SEARCH_VALUE] && Object.keys(this.state.filters).length < 2) {
            searchArray = this.state.filters
        } else if (this.state.filters[SEARCH_VALUE]) {
            searchArray = { "searchValue": this.state.filters[SEARCH_VALUE] }
        }
        const newFilterState = Object.assign({}, searchArray, { [filterId]: value || undefined });
        this.setState({ filters: newFilterState });
    }

    onChangeFilterForTextSearch(searchValue, value) {
        let searchArray;
        if (this.state.filters[SEARCH_VALUE] && Object.keys(this.state.filters).length < 2) {
            searchArray = this.state.filters
        } else if (this.state.filters[SEARCH_VALUE]) {
            searchArray = { "searchValue": this.state.filters[SEARCH_VALUE] }
        }
        const newFilterState = Object.assign({}, searchArray, { [searchValue]: value || undefined });
        this.setState({ filters: newFilterState });
        this.state.searchValues = this.state.searchValues.filter((item) => {
            if (Object.keys(this.state.filters).length > 0) {
                for (let [key, value] of Object.entries(this.state.filters)) {
                    if (item[key] === undefined || !this.state.filters[key].includes(item[key])) {
                        return false;
                    }
                }
            }
            return true;
        });
    }

    renderFilter(f) {
        const Component = filterComponents[f.type];
        return (
            <div key={f.id}>
                <b>{f.title}</b>
                <Component filter={f} onChange={this.onChangeFilter} onChangeFilterForTextSearch={this.onChangeFilterForTextSearch} onButtonClick={this.onButtonClick} value={this.state.filters[f.id]} />
            </div>
        );
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
        this.setState({
            selected: value
        });
        this.setState({ isLoading: true })
        this.setState({ isLoadingDataFinished: false })
        SearchService.searchByKeyword(value, [], [], []).then(
            response => {
                if (response != null) {
                    let results = response.hits.hits;
                    console.log(results);
                    this.setState({
                        searchValues: results
                    });
                    this.setState({ isLoading: false })
                    this.setState({ isLoadingDataFinished: true })
                    results.map((option, index, { length }) => {
                        this.addUniqueCollectionNameForFilters(option._index);
                    });
                    this.loadFilterData(this.state.collections);
                    console.log("Filter data loaded")
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
    //.map(({ _source: { title, description } }) => ({ title, description }))
    componentDidMount() {

    }

    render() {
        let { isLoadingDataFinished, isLoading, searchValues, finishedMappingObjects, filterData } = this.state;

        return (
            <Container>
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
                    options={this.state.searchValues._source}
                    labelKey={option => `${option.title} ${option.description}`}
                    placeholder="Search ..."
                    selected={this.state.selected.title}
                    onInputChange={this.changeSelected}
                    isLoading={isLoading}></AsyncTypeahead>

                {finishedMappingObjects &&
                    <Table striped bordered hover>
                        <tbody>
                            <tr>
                                <td>{filterData.map(f => this.renderFilter(f))}</td>
                                <td>Filters: {JSON.stringify(this.state.filters)}</td>
                            </tr>
                        </tbody>
                    </Table>
                }

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
                                return (<StoryTaskSearchCard key={index} story={option._source}></StoryTaskSearchCard>);
                            }
                        })
                    }

                })()};


            </Container>

        );
    }
}
