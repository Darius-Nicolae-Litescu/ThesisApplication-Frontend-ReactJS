import React from "react";
import { useState, useEffect } from 'react';
import 'chart.js/auto';
import { Chart, Radar } from 'react-chartjs-2';
import {
    BrowserRouter as Router,
    useNavigate,
} from "react-router-dom";
import { Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { getRandomColor, defaultProps } from "../utils";
import { FetchCountUserStoryTaskCommentsData } from "../../hooks/statistics/fetch-count-user-story-task-comments";

export default function UserStoryCommentsRadarChart() {
    const { status, data: countUserStoryTaskCommentsData, error } = FetchCountUserStoryTaskCommentsData();
    const [countUserStoryTaskCommentsChartData, setCountUserStoryTaskCommentsChartData] = useState();

    const processUserStoryTaskCommentsChartData = () => {
        let storyCommentCount = [];
        let usernameArray = [];
        let colors = [];

        countUserStoryTaskCommentsData.forEach(object => {
            let index = usernameArray.indexOf(object.username);
            if (index === -1) {
                usernameArray.push(object.username);
                storyCommentCount.push(object.storyTaskCommentsCount);
                colors.push(getRandomColor());
            } else {
                storyCommentCount[index] += object.storyTaskCommentsCount;
            }
        });

        let countUserStoryCommentsChartFinalData = {
            labels: usernameArray,
            datasets: [
                {
                    label: 'User Story Task Comments',
                    borderWidth: 1,
                    hoverBackgroundColor: getRandomColor(),
                    hoverBorderColor: getRandomColor(),
                    data: storyCommentCount,
                    backgroundColor: colors,
                    borderColor: getRandomColor(),
                }
            ]
        }
        setCountUserStoryTaskCommentsChartData(countUserStoryCommentsChartFinalData);
    }

    useEffect(() => {
        if (countUserStoryTaskCommentsData && countUserStoryTaskCommentsData.length > 0 && !countUserStoryTaskCommentsChartData) {
            processUserStoryTaskCommentsChartData();
        }
    }, [countUserStoryTaskCommentsData])



    return (
        <Container>
            {countUserStoryTaskCommentsChartData && <Radar style={{ width: "50%", height: "25%" }}
                data={countUserStoryTaskCommentsChartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: 'Story Task comment count by username'
                        }
                    },
                    legend: {
                        display: defaultProps.displayLegend,
                        position: defaultProps.legendPosition
                    }
                }}
            />}
        </Container>
    );
}