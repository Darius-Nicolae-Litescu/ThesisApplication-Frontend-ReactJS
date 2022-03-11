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
import { FetchStoryData } from "./story-fetch";
import CommentList from "./comment-list.component";
import SubtaskList from "./story-subtask-list.component";

function App() {
    const [isLoading, setIsLoading] = useState('');
    const { storyId } = useParams();
    const { status, data, error } = FetchStoryData(storyId);

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
                                <Card.Text>
                                    <br />
                                    {data.description &&
                                        data.description
                                            .split('\n')
                                            .map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                                </Card.Text>

                                <div className="card-block px-2">
                                    <Card.Title style={{maxHeight: '20%', overflow: 'auto'}}>
                                        <SubtaskList storySubtasks={data.storySubtasks}></SubtaskList>
                                    </Card.Title>
                                    <Card.Title>

                                        <Card.Footer>
                                            <CommentList comments={data.comments}></CommentList>
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