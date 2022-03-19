import React from "react";
import { useState, useEffect } from 'react';
import { StoryFilter } from "./search-result-story"
import { StoryTaskFilter } from "./search-result-story-task"
import { UserFilter } from "./search-result-user"
import { CommentFilter } from "./search-result-comment"
import { SoftwareApplicationFilter } from "./search-result-software-application"
import "./filter-wrapper.css"

export const FilterWrapper = (props) => {
    const { searchResultTypes } = props;
    const [filters, setFilters] = useState();

    function addUniqueFilterElseReplace(filter) {
        var index = filters.findIndex(x => x.collectionName == filter.collectionName)
        if (index === -1) {
            setFilters(filters => [...filters, filter]);
        } else {
            let newFilter = [...filters]; // copying the old datas array
            newFilter[filter.collectionName] = filter.value;
            setFilters(newFilter);
        }
    }

    return (
        !searchResultTypes || searchResultTypes.length === 0 ?
            <div><h2>Could not load any filters</h2></div>
            :
            <div className="sidenav">
                {searchResultTypes.includes("story") ? <StoryFilter addUniqueFilterElseReplace={addUniqueFilterElseReplace}></StoryFilter> : <></>}
                {searchResultTypes.includes("storytask") ? <StoryTaskFilter  addUniqueFilterElseReplace={addUniqueFilterElseReplace}></StoryTaskFilter> : <></>}
                {searchResultTypes.includes("softwareapplication") ? <SoftwareApplicationFilter addUniqueFilterElseReplace={addUniqueFilterElseReplace}></SoftwareApplicationFilter> : <></>}
                {searchResultTypes.includes("user") ? <UserFilter addUniqueFilterElseReplace={addUniqueFilterElseReplace}></UserFilter> : <></>}
                {searchResultTypes.includes("comment") ? <CommentFilter addUniqueFilterElseReplace={addUniqueFilterElseReplace}></CommentFilter> : <></>}
            </div>
    );
}