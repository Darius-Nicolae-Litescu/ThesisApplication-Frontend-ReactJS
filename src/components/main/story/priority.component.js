import React, {
  useEffect,
  useState,
  useReducer,
  useContext,
  Fragment,
} from "react";
import { Accordion, Card } from "react-bootstrap";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import { AccordionContext } from "react-bootstrap";
import TextareaAutosize from "react-textarea-autosize";
import "./story-general-info.css";

function ContextAwareToggle({ children, eventKey, callback }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <button
      type="button"
      style={{ backgroundColor: isCurrentEventKey ? "#0d6efd" : "#0d6efd" }}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}

export default function Priority(props) {
  const { priority, isEditActive, priorityData, setPriorityId } = props;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    var target = event.target;
    let priorityId = parseInt(target.priority.value);
    setPriorityId(priorityId);
  };

  return (
    <Accordion defaultActiveKey="0">
      <div className="general-card">
        <Card className="card-text-placement">
          <ContextAwareToggle eventKey="1">
            <div style={{ display: "inline-flex", alignItems: "center" }}>
              <label htmlFor="title" className="priority-color">
                Priority:{" "}
              </label>
              <input
                id="title"
                className="input-text.color"
                onChange={(e) => setTitle(e.target.value)}
                value={priority.title}
                disabled={!isEditActive}
              />
              <span>{"\u2193"}</span>
            </div>
          </ContextAwareToggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <label htmlFor="priorityId">Id: </label>
              {isEditActive ? (
                <select
                  id="priorityId"
                  onChange={handleChange}
                  disabled={!isEditActive}
                >
                  {priorityData.map((priority) => (
                    <option key={priority.id} value={priority.id}>
                      {priority.id} : {priority.title}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id="priorityId"
                  value={priority.id}
                  disabled={!isEditActive}
                />
              )}
              <br></br>
              <label htmlFor="description">Description: </label>
              <br></br>
              <TextareaAutosize
                id="description"
                className="input-text.color"
                disabled={!isEditActive}
                onChange={(e) => setDescription(e.target.value)}
                value={priority.description}
                maxRows={4}
                minRows={1}
              ></TextareaAutosize>
              <br></br>
              <label htmlFor="level">Level: </label>
              <input
                id="level"
                className="input-text.color"
                onChange={(e) => setLevel(e.target.value)}
                value={priority.level}
                disabled={!isEditActive}
              />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </div>
    </Accordion>
  );
}
