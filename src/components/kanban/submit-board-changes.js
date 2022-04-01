import React, { useEffect, useState, useReducer, Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Routes,
    useParams,
} from "react-router-dom";

import BoardService from "../../services/board.service";
import "./board.css"


export default function SubmitBoardChanges(props) {
    const { boardId, columns, updateColumns} = props;
    const updateBoard = () => {

        const newColumns = columns.map(column => {
            const newCards = column.cards.map(card => {
                return {
                    ...card,
                    rank: column.cards.indexOf(card) * 10
                }
            })
            return {
                ...column,
                cards: newCards
            }
        })

        BoardService.updateBoard({id: boardId, columnList: newColumns}).then(
            response => {
                if (response != null) {
                    updateColumns(response.columnList)
                }
            },
            error => {
                console.log(error);
            }
        );
    }

    return (
    <Button onClick={() => updateBoard()} className="submit-changes-button">Save changes</Button>
    );
}