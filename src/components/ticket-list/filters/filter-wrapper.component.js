import React from "react";
import { useState, useEffect } from 'react';
import { StoryFilter } from "./search-result-story"

import "./filter-wrapper.css"

export const FilterWrapper = (props) => {
    const { searchResultTypes, setFinalFilter, isLoading, isLoadingDataFinished } = props;
    const [storyFilter, setStoryFilter] = useState();
    const [storyTaskFilter, setStoryTaskFilter] = useState();
    const [softwareApplicationFilter, setSoftwareApplicationFilter] = useState();
    const [userFilter, setUserFilter] = useState();
    const [commentFilter, setCommentFilter] = useState();
    const [keepFormData, setKeepFormData] = useState([]);

    useEffect(() => {
        let finalFilter = {};
        if (storyFilter) {
            finalFilter = { ...finalFilter, filterStoryDto: storyFilter }
        }
        if (Object.keys(finalFilter).length !== 0) {
            setFinalFilter(finalFilter)
        }
    }, [storyFilter, storyTaskFilter, softwareApplicationFilter, userFilter, commentFilter])

    return (
        !isLoading && isLoadingDataFinished ?
            !searchResultTypes || searchResultTypes.length === 0 ?
                <div><h2>Could not load any filters</h2></div>
                :
                <div className="sidenav">
                    {searchResultTypes.includes("story") ? <StoryFilter setStoryFilter={setStoryFilter} keepFormData={keepFormData} setKeepFormData={setKeepFormData}></StoryFilter> : <></>}
                </div>
            :
            <div></div>
    );
}