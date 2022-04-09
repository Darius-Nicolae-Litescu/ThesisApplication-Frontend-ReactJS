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
import { FetchFinishedStoriesData } from "../../hooks/statistics/fetch-finished-stories";

export default function FinishedStoriesPieChart() {
    const { status, data: fetchFinishedStoriesData, error } = FetchFinishedStoriesData(12);
    const [finishedStoriesChartData, setFinishedStoriesChartData] = useState();

    const processFinishedStoriesChartData = () => {
        let chartLabels = ["Story count", "Completed stories count"];
        let data = [];
        data.push(fetchFinishedStoriesData.storyCount);
        data.push(fetchFinishedStoriesData.completedCount);
        let chartFinalData = {
            labels: chartLabels,
            datasets: [
                {
                    label: 'Story count',
                    borderColor: getRandomColor(),
                    borderWidth: 1,
                    hoverBackgroundColor: getRandomColor(),
                    hoverBorderColor: getRandomColor(),
                    data: data,
                    backgroundColor: [
                        getRandomColor(),
                        getRandomColor()
                    ]
                }
            ]
        }

        setFinishedStoriesChartData(chartFinalData);
    }

    useEffect(() => {

        if (fetchFinishedStoriesData && !finishedStoriesChartData) {
            processFinishedStoriesChartData();
        }


    }, [fetchFinishedStoriesData])

    return (
        <Container style={{ width: "50%", height: "25%" }}>
            {finishedStoriesChartData && <Pie
                data={finishedStoriesChartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: 'Stories/Completed story count'
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