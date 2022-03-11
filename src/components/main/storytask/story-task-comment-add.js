import { useEffect, useRef, useReducer } from 'react';

import StoryTaskService from "../../../services/story-task.service";

export const AddStoryTaskComment = (commentText, commentAttachment) => {

    const initialState = {
        status: 'idle',
        error: null,
        data: [],
    };

    useEffect(() => {
        let cancelRequest = false;

        const addStoryTaskComment = async () => {
            dispatch({ type: 'REQUESTING' });
            StoryTaskService.getStoryTask(storyId).then(
                response => {
                    if(cancelRequest) 
                    {
                        return;
                    }
                    if (response != null) {
                        console.log(response);
                        dispatch({ type: 'REQUEST_ACCEPTED', payload: response });
                    }
                },
                error => {
                    if(cancelRequest) 
                    {
                        return;
                    }
                    console.log(error);
                    dispatch({ type: 'REQUEST_ERROR', payload: error });
                }
            )
        };

        addStoryTaskComment();

        return function cleanup() {
            cancelRequest = true;
        };
    }, []);

    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'REQUESTING':
                return { ...initialState, status: 'requesting' };
            case 'REQUEST_ACCEPTED':
                return { ...initialState, status: 'request_accepted', data: action.payload };
            case 'REQUEST_ERROR':
                return { ...initialState, status: 'request_error', error: action.payload };
            default:
                return state;
        }
    }, initialState);

    return state;
};