import { useEffect, useRef, useReducer } from 'react';

import StoryTaskService from "../../../../services/story-task.service";

export const UpdateStoryTaskTitleAndDescription = (storyTaskId, title, description) => {

    const initialState = {
        requestStatus: 'idle',
        error: null,
        data: [],
    };

    useEffect(() => {
        let cancelRequest = false;
        if (isNaN(storyTaskId)) {
            return;
        }

        const updateStoryTaskGeneralInfo = async () => {
            dispatch({ type: 'FETCHING' });
            StoryTaskService.updateStoryTaskTitleAndDescription(storyTaskId, title, description).then(
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

        updateStoryTaskGeneralInfo();

        return function cleanup() {
            cancelRequest = true;
        };
    }, []);

    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'FETCHING':
                return { ...initialState, requestStatus: 'fetching' };
            case 'FETCHED':
                return { ...initialState, requestStatus: 'fetched', data: action.payload };
            case 'FETCH_ERROR':
                return { ...initialState, requestStatus: 'error', error: action.payload };
            default:
                return state;
        }
    }, initialState);

    return state;
};