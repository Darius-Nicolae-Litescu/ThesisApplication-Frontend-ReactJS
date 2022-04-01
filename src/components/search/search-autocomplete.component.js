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
import StorySearchCard from '../cards/story-search-card-component'
import StoryTaskSearchCard from '../cards/story-task-search-card-component'
import SoftwareApplicationCard from "../cards/software-application-card.component"
import UserCard from "../cards/user-card.component"
import CommentCard from "../cards/comment-card.component"
import { Button, Container } from 'react-bootstrap'


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
        this.renderCardType = this.renderCardType.bind(this);
        this.getLabelGetByCardType = this.getLabelGetByCardType.bind(this);

    }

    searchValues(value) {
        this.setState({
            selected: value
        });
        this.setState({ isLoading: true })
        SearchService.searchByKeyword(value, [], [], []).then(
            response => {
                if (response != null && response.data.success != null) {
                    response = response.data.success;
                    if (response == null || response.elements == null) {
                        return;
                    }
                    let hits = response.elements.hits.hits;
                    console.log(hits);
                    this.setState({
                        searchValues: hits
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

    getLabelGetByCardType(option) {
        {
            if (!option) {
                return "No results found!";
            }
            if (option._index === "story") {
                return option._source.title;
            } else if (option._index == "storytask") {
                return option._source.title;
            } else if (option._index == "softwareapplication") {
                return option._source.name;
            } else if (option._index == "comment") {
                return option._source.content;
            } else if (option._index == "user") {
                return option._source.email;
            }
        }
    }

    renderCardType(option) {
        if (option._index === "story") {
            console.log(option._source)
            return (<StorySearchCard key={option.id} story={option._source}></StorySearchCard>);
        } else if (option._index == "storytask") {
            return (<StoryTaskSearchCard key={option.id} storytask={option._source}></StoryTaskSearchCard>);
        } else if (option._index == "softwareapplication") {
            return (<SoftwareApplicationCard key={option.id} softwareapplication={option._source}></SoftwareApplicationCard>)
        } else if (option._index == "comment") {
            return (<CommentCard key={option.id} comment={option._source}></CommentCard>)
        } else if (option._index == "user") {
            return (<UserCard key={option.id} user={option._source}></UserCard>)
        }
    }

    render() {
        return (
            <Container>
                <AsyncTypeahead style={{ width: "100%", height: "40%" }}
                    id="typeahead"
                    delay={800}
                    emptyLabel="Could not find any results"
                    ignoreDiacritics={true}
                    minLength={2}
                    onSearch={this.searchValues}
                    filterBy={(option, props) => {
                        return true;
                    }}
                    selectHintOnEnter={true}
                    promptText="Searching"
                    searchText="Searching"
                    options={this.state.searchValues}
                    labelKey={option => this.getLabelGetByCardType(option)}
                    placeholder="Search ..."
                    selected={this.state.selected.title}
                    onInputChange={this.changeSelected}
                    isLoading={this.state.isLoading}
                    renderMenuItemChildren={(option) => (
                        <section>
                            {this.renderCardType(option)}
                        </section>
                    )}
                />
                <Button variant="outline-success"> <a href={`/search-result/${this.state.selected}`}>Search</a></Button>
            </Container>
        );

    }
}
