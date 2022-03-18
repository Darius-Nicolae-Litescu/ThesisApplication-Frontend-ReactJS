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
import { FetchStoryData } from "./hooks/story-fetch";
import { CommentList } from "./comment-list.component";
import SubtaskList from "./story-subtask-list.component";
import TextareaAutosize from 'react-textarea-autosize';
import StoryGeneralInfo from './story-general-info.component'

function App() {

    const { storyId } = useParams();

    const { status, data, error } = FetchStoryData(storyId);

    const [currentData, setCurrentData] = useState([]);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [isEditActive, setIsEditActive] = useState(false);
    const [isDeleteActive, setDeleteActive] = useState('');


    const initialState = {
        status: 'idle',
        error: null,
        data: [],
    };

    useEffect(() => {
        /*
        if (data.title) {
            setTitle(data.title);
        }
        if (data.description) {
            setDescription(data.description);
        }
        */
    }, [data])

    function updateData(updatedData) {
        setCurrentData(updatedData);
    }

    
    function toggleEditMode() {
        setIsEditActive(!isEditActive);
        setDeleteActive(!isDeleteActive);
    }

    return (
        <div>
            {status === 'idle' && (
                <div> Idle </div>
            )}
            {status === 'error' && <div>{error}</div>}
            {status === 'fetching' && <div className="loading"></div>}
            {status === 'fetched' && (
                <>
                    <StoryGeneralInfo updateData={updateData} storyGeneralInfo={{
                        storyId: storyId, createdBy: data.createdBy, priority: data.priority, softwareApplication: data.softwareApplication,
                        isFinished: data.isFinished, totalStoryPoints: data.totalStoryPoints
                    }}></StoryGeneralInfo>
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
                                <TextareaAutosize
                                    className="disabled" disabled={!isEditActive} onChange={e => setDescription(e.target.value)} value={data.description} style={{ width: "100%" }} maxRows={50} minRows={5}>
                                </TextareaAutosize>
                                <div className="card-block px-2">
                                    <Card.Title style={{ maxHeight: '20%', overflow: 'auto' }}>
                                        <SubtaskList storySubtasks={data.storySubtasks}></SubtaskList>
                                    </Card.Title>
                                    <Card.Title>

                                        <Card.Footer>
                                            <CommentList storyId={storyId} comments={data.comments}></CommentList>
                                        </Card.Footer>
                                    </Card.Title>
                                </div>
                            </Card.Body>
                        </Card>
                    </Container>
                </>
            )
            }
        </div >)
};

export default App;