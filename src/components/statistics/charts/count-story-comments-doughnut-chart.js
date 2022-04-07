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
import {FetchCountStoryCommentsData} from "../hooks/fetch-count-story-comments";

export default function UserStoryCommentsDoughnutChart() {
    const { status, data: countStoryCommentsData, error } = FetchCountStoryCommentsData();
    const [countStoryCommentsChartData, setCountStoryCommentsChartData] = useState();

    const processStoryCommentsChartData = () => {
        let storyIds = [];
        let completedCount = [];
        let colors = [];
        let borderColors = [];
        countStoryCommentsData.forEach(object => {
            storyIds.push(`Story id: ${object.storyId}`);
            completedCount.push(object.completedCount);
            colors.push(getRandomColor());
            borderColors.push(getRandomColor());
        });

        let countStoryCommentsFinalData = {
            labels: storyIds,
            datasets: [
                {
                    label: 'Story comments count',
                    borderWidth: 1,
                    hoverBackgroundColor: getRandomColor(),
                    hoverBorderColor: getRandomColor(),
                    data: completedCount,
                    backgroundColor: colors,
                    borderColor: borderColors,
                }
            ]
        }
        setCountStoryCommentsChartData(countStoryCommentsFinalData);
    }

    useEffect(() => {
        if (countStoryCommentsData && countStoryCommentsData.length > 0 && !countStoryCommentsChartData) {
            processStoryCommentsChartData();
        }
    }, [countStoryCommentsData])



    return (
        <Container>
            {countStoryCommentsChartData && <Doughnut style={{ width: "50%", height: "25%" }}
                data={countStoryCommentsChartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: 'Story/comment count'
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
