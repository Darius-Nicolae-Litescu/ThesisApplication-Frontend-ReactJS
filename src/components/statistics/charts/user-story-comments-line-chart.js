import React from "react";
import { useState, useEffect } from 'react';
import 'chart.js/auto';
import { Chart, Bar, Pie, Line, Doughnut } from 'react-chartjs-2';
import {
    BrowserRouter as Router,
    useNavigate,
} from "react-router-dom";
import { Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { getRandomColor, defaultProps } from "../utils";
import {FetchCountUserStoryCommentsData} from "../hooks/fetch-count-user-story-comments";

export default function UserStoryCommentsLineChart() {
    const { status, data: countUserStoryCommentsData, error } = FetchCountUserStoryCommentsData();
    const [countUserStoryCommentsChartData, setCountUserStoryCommentsChartData] = useState();

    const processUserStoryCommentsChartData = () => {
        let storyCommentCount = [];
        let usernameArray = [];
        let colors = [];
        countUserStoryCommentsData.forEach(object => {
            storyCommentCount.push(object.storyCommentsCount);
            usernameArray.push(object.username);
            colors.push(getRandomColor());
        });

        let countUserStoryCommentsChartFinalData = {
            labels: usernameArray,
            datasets: [
                {
                    label: 'User Story Comments',
                    borderWidth: 1,
                    hoverBackgroundColor: getRandomColor(),
                    hoverBorderColor: getRandomColor(),
                    data: storyCommentCount,
                    backgroundColor: colors,
                    borderColor: getRandomColor(),
                }
            ]
        }
        setCountUserStoryCommentsChartData(countUserStoryCommentsChartFinalData);
    }

    useEffect(() => {
        if (countUserStoryCommentsData && countUserStoryCommentsData.length > 0 && !countUserStoryCommentsChartData) {
            processUserStoryCommentsChartData();
        }
    }, [countUserStoryCommentsData])



    return (
        <Container>
            {countUserStoryCommentsChartData && <Line style={{ width: "50%", height: "25%" }}
                data={countUserStoryCommentsChartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: 'Story comment count by username'
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