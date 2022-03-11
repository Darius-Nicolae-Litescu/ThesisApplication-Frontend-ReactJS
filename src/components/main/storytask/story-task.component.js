import React, { useEffect, useState, useReducer } from 'react';

import {
    BrowserRouter as Router,
    Link,
    Route,
    Routes,
    useParams,
} from "react-router-dom";
import Moment from 'react-moment';
import { Card, Container, ListGroup, Spinner, Divider } from 'react-bootstrap'
import { FetchStoryTaskData } from "./story-task-fetch";
import {CommentList} from "./comment-list.component";

function App() {
    const [isLoading, setIsLoading] = useState('');
    const { storyTaskId } = useParams();
    const { status, data, error } = FetchStoryTaskData(storyTaskId);

    const initialState = {
        status: 'idle',
        error: null,
        data: [],
    };

    return (
        <div>
            {status === 'idle' && (
                <div> Idle </div>
            )}
            {status === 'error' && <div>{error}</div>}
            {status === 'fetching' && <div className="loading"></div>}
            {status === 'fetched' && (
                <>
                    <Container style={{ width: '100%', height: '100%' }}>
                        <Card
                            bg="light"
                            text="dark"
                            style={{ width: '100%' }}
                        >
                            <div style={{ "display": "grid" }} className="media-body p-2 shadow-sm rounded bg-light border">
                                <h2>{data.title}</h2>
                                <Moment format="YYYY-MM-DD HH:mm">{data.createdAt}</Moment>
                            </div>
                            <Card.Body>
                                    <br />
                                    {data.description &&
                                        data.description
                                            .split('\n')
                                            .map((paragraph, index) => <p key={index}>{paragraph}</p>)}

                                <div className="card-block px-2">
                                    <Card.Title>

                                        <Card.Footer>
                                            <CommentList storyTaskId={storyTaskId} comments={data.storyComments}></CommentList>
                                        </Card.Footer>
                                    </Card.Title>
                                </div>
                            </Card.Body>
                        </Card>
                    </Container>
                </>
            )}
        </div>)
};

export default App;