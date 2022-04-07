import { useEffect, useRef, useReducer } from 'react';

import StoryTaskService from "../../../../services/story-task.service";

export const FetchStoryTaskData = (storyTaskId) => {

    const initialState = {
        status: 'idle',
        error: null,
        data: [],
    };

    useEffect(() => {
        let cancelRequest = false;
        if (isNaN(storyTaskId)) {
            return;
        }

        const getStoryTaskData = async () => {
            dispatch({ type: 'FETCHING' });
            StoryTaskService.getStoryTask(storyTaskId).then(
                response => {
                    if (cancelRequest) {
                        return;
                    }
                    if (response != null) {
                        console.log(response);
                        dispatch({ type: 'FETCHED', payload: response });
                    }
                },
                error => {
                    if (cancelRequest) {
                        return;
                    }
                    console.log(error);
                    dispatch({ type: 'FETCH_ERROR', payload: error });
                }
            )
        };

        getStoryTaskData();

        return function cleanup() {
            cancelRequest = true;
        };
    }, []);

    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'FETCHING':
                return { ...initialState, status: 'fetching' };
            case 'FETCHED':
                return { ...initialState, status: 'fetched', data: action.payload };
            case 'FETCH_ERROR':
                return { ...initialState, status: 'error', error: action.payload };
            default:
                return state;
        }
    }, initialState);

    return state;
};