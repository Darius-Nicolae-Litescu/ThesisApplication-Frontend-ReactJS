import React from "react";
import { useState, useEffect } from 'react';
import { StoryFilter } from "./search-result-story"
import { StoryTaskFilter } from "./search-result-story-task"
import { UserFilter } from "./search-result-user"
import { CommentFilter } from "./search-result-comment"
import { SoftwareApplicationFilter } from "./search-result-software-application"
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
        if (storyTaskFilter) {
            finalFilter = { ...finalFilter, filterStoryTaskDto: storyTaskFilter }
        }
        if (softwareApplicationFilter) {
            finalFilter = { ...finalFilter, filterSoftwareApplicationDto: softwareApplicationFilter }
        }
        if (userFilter) {
            finalFilter = { ...finalFilter, filterUserDto: userFilter }
        }
        if (commentFilter) {
            finalFilter = { ...finalFilter, filterCommentDto: commentFilter }
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
                    {searchResultTypes.includes("storytask") ? <StoryTaskFilter setStoryTaskFilter={setStoryTaskFilter} keepFormData={keepFormData} setKeepFormData={setKeepFormData}></StoryTaskFilter> : <></>}
                    {searchResultTypes.includes("softwareapplication") ? <SoftwareApplicationFilter setSoftwareApplicationFilter={setSoftwareApplicationFilter} keepFormData={keepFormData} setKeepFormData={setKeepFormData}></SoftwareApplicationFilter> : <></>}
                    {searchResultTypes.includes("user") ? <UserFilter setUserFilter={setUserFilter} keepFormData={keepFormData} setKeepFormData={setKeepFormData}></UserFilter> : <></>}
                    {searchResultTypes.includes("comment") ? <CommentFilter setCommentFilter={setCommentFilter} keepFormData={keepFormData} setKeepFormData={setKeepFormData}></CommentFilter> : <></>}
                </div>
            : 
            <div></div>
    );
}