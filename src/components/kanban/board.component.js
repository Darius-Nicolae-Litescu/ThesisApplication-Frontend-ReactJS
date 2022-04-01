import { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Routes,
    useParams,
} from "react-router-dom";
import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { FetchBoardData } from "./hooks/board-fetch";
import BoardStoryCard from "./board-story-card.component"
import SubmitBoardChanges from './submit-board-changes';
import "./board.css"

export const Board = (props) => {

    const { boardId } = useParams();

    const { status, data, error } = FetchBoardData(boardId);
    const [columns, setColumns] = useState(null);
    const [changed, setChanged] = useState(false);

    useEffect(() => {
        setColumns(data.columnList)
    }, [data])

    useEffect(() => {
        setColumns(columns)
        console.log(columns);

    }, [columns])

    function updateColumns(newColumns) {
        setColumns(newColumns);
        setChanged(false);
    }

    function onDragEnd(result) {
        if (!result.destination) return;
        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns.find(column => column.id.toString() === source.droppableId);
            const sourceColumnId = columns.indexOf(sourceColumn);
            const destColumn = columns.find(column => column.id.toString() === destination.droppableId);
            const destColumnId = columns.indexOf(destColumn);
            const sourceItems = [...sourceColumn.cards];
            const destItems = [...destColumn.cards];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);

            const newColumns = {
                ...columns,
                [sourceColumnId]: {
                    ...sourceColumn,
                    cards: sourceItems
                },
                [destColumnId]: {
                    ...destColumn,
                    cards: destItems
                }
            };
            setColumns(Object.values(newColumns));

        } else {
            const column = columns.find(column => column.id.toString() === source.droppableId);
            const columnId = columns.indexOf(column);
            const copiedItems = [...column.cards];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);

            const newColumns = {
                ...columns,
                [columnId]: {
                    ...column,
                    cards: copiedItems
                }
            };
            setColumns(Object.values(newColumns));

        }
        setChanged(true);
    };

    return (
        columns ?
            <div className="board">
                <div className="board-header">
                    <h1>{data.name}</h1>
                    {changed ? <SubmitBoardChanges boardId={boardId} columns={columns} updateColumns={updateColumns} /> : null}
                </div>
                <div className="board-content">
                    <DragDropContext
                        onDragEnd={result => onDragEnd(result)}
                    >
                        {columns.map((column, index) => {
                            return (
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center"
                                    }}
                                    key={column.id}
                                >
                                    <h2>{column.title}</h2>
                                    <div style={{ margin: 8 }}>
                                        <Droppable
                                            droppableId={String(column.id)}
                                            key={column.id}>
                                            {(provided, snapshot) => {
                                                return (
                                                    <div
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}
                                                        style={{
                                                            background: snapshot.isDraggingOver
                                                                ? "e9ecef"
                                                                : "lightgrey",
                                                            padding: "0px",
                                                            width: "300px",
                                                            minHeight: "300px"
                                                        }}
                                                    >
                                                        {column.cards.map((card, index) => {
                                                            return (
                                                                <Draggable
                                                                    key={card.id}
                                                                    draggableId={String(card.id)}
                                                                    index={index}
                                                                >
                                                                    {(provided, snapshot) => {
                                                                        return (
                                                                            <div
                                                                                ref={provided.innerRef}
                                                                                {...provided.draggableProps}
                                                                                {...provided.dragHandleProps}

                                                                            >
                                                                                <BoardStoryCard story={card.story}></BoardStoryCard>
                                                                            </div>
                                                                        );
                                                                    }}
                                                                </Draggable>
                                                            );
                                                        })}
                                                        {provided.placeholder}
                                                    </div>
                                                );
                                            }}
                                        </Droppable>
                                    </div>
                                </div>
                            );
                        })}
                    </DragDropContext>
                </div>
            </div>
            :
            <div></div>
    );
}

