import React, { useEffect, useState, useReducer, useContext, Fragment } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { AccordionContext } from 'react-bootstrap';
import TextareaAutosize from 'react-textarea-autosize';
import "./story-general-info.css"

function ContextAwareToggle({ children, eventKey, callback }) {
    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(
        eventKey,
        () => callback && callback(eventKey),
    );

    const isCurrentEventKey = activeEventKey === eventKey;

    return (
        <button
            type="button"
            style={{ backgroundColor: isCurrentEventKey ? '#0d6efd' : '#0d6efd' }}
            onClick={decoratedOnClick}
        >
            {children}
        </button>
    );
}

export default function Priority(props) {
    const { priority, isEditActive } = props;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [level, setLevel] = useState('');


    return (
        <Accordion defaultActiveKey="0">
            <div className="general-card">
                <Card className="card-text-placement">
                    <ContextAwareToggle eventKey="1">
                        <label htmlFor="title" className="priority-color" >Priority: </label>
                        <input id="title" className="input-text.color" onChange={e => setTitle(e.target.value)} value={priority.title} disabled={!isEditActive} />
                        <span>{"\u2193"}</span>
                    </ContextAwareToggle>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            <label htmlFor="id" >Id: </label>
                            <input id="id"  value={priority.id} disabled={!isEditActive} />
                            <br></br>
                            <label htmlFor="description">Description: </label>
                            <br></br>
                            <TextareaAutosize id="description"
                                className="input-text.color" disabled={!isEditActive} onChange={e => setDescription(e.target.value)} value={priority.description} maxRows={4} minRows={1}>
                            </TextareaAutosize>
                            <br></br>
                            <label htmlFor="level">Level: </label>
                            <input id="level" className="input-text.color" onChange={e => setLevel(e.target.value)} value={priority.level} disabled={!isEditActive} />
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </div>
        </Accordion>
    );
}

