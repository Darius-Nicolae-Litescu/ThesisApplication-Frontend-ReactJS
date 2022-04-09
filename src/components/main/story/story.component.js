import React, { useEffect, useState, useReducer } from 'react';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Routes,
    useParams,
    useNavigate
} from "react-router-dom";
import Moment from 'react-moment';
import { Card, Container, ListGroup, Spinner, Divider, Button } from 'react-bootstrap'
import { FetchStoryData } from "../../hooks/fetch-story";
import { CommentList } from "./comment-list.component";
import SubtaskList from "./story-subtask-list.component";
import TextareaAutosize from 'react-textarea-autosize';
import StoryGeneralInfo from './story-general-info.component'
import StoryService from "../../../services/story.service";

import "./story.css"


function App() {

    const navigate = useNavigate();

    const { storyId } = useParams();

    const { status, data, error } = FetchStoryData(storyId);

    const [currentData, setCurrentData] = useState([]);
    const [currentError, setCurrentError] = useState();

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
        if (data.title) {
            setTitle(data.title);
        }
        if (data.description) {
            setDescription(data.description);
        }
    }, [data])

    function updateData(updatedData) {
        setCurrentData(updatedData);
    }

    function changeDetails() {
        setCurrentError();
        StoryService.updateStoryTitleAndDescription(storyId, title, description).then(
            response => {
                if (response != null) {
                    setTitle(response.title);
                    setDescription(response.description)
                    toggleEditMode();
                    console.log(response);
                }
            },
            error => {
                setCurrentError(currentError);
                console.log(error);
            }
        )
    }
    const redirectToAddStoryTask = () => {
        navigate(`/add-story-task/${storyId}`);
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
                            <Container>
                                <div id="outer">
                                    <div className="inner"><Button className="add-story-task-button" onClick={redirectToAddStoryTask}>Add new Story Task</Button> </div>
                                    {isDeleteActive ? <div className="inner"><Button className="msgBtnBack">Delete</Button></div> : <div></div>}
                                    <div className="inner"><Button onClick={toggleEditMode} className="msgBtn" >Edit</Button></div>
                                    {isDeleteActive ? <div className="inner"><Button type="submit" onClick={() => changeDetails()} className="msgBtn2">Save changes</Button></div> : <div></div>}
                                    <div></div>
                                    {error && <div style={{ color: "red" }}>Could not update details, check console for more info</div>}
                                </div>
                            </Container>
                            <div style={{ "display": "grid" }} className="media-body p-2 shadow-sm rounded bg-light border">
                                <input className="story-title" onChange={e => setTitle(e.target.value)} value={title} disabled={!isEditActive} />
                                <Moment format="YYYY-MM-DD HH:mm">{data.createdAt}</Moment>
                            </div>
                            <Card.Body>
                                <br />
                                <TextareaAutosize
                                    className="disabled" disabled={!isEditActive} onChange={e => setDescription(e.target.value)} value={description} style={{ width: "100%" }} maxRows={50} minRows={5}>
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