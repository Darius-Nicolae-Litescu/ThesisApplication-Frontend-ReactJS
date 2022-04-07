import React from "react";
import 'chart.js/auto';
import { Container } from 'react-bootstrap';
import FinishedStoriesPieChart from "./charts/finished-stories-aggregation-pie-chart";
import UserStoryCommentsLineChart from "./charts/user-story-comments-line-chart";
import UserStoryCommentsDoughnutChart from "./charts/count-story-comments-doughnut-chart";
import UserStoryCommentsRadarChart from "./charts/user-story-tasks-comments-radar-chart";

export const Statistics = () => {

    return (
        <Container>
            <Container style={{ display: "flex" }}>
                <FinishedStoriesPieChart></FinishedStoriesPieChart>
                <UserStoryCommentsLineChart></UserStoryCommentsLineChart>
            </Container>
            <Container style={{ display: "flex" }}>
                <UserStoryCommentsDoughnutChart></UserStoryCommentsDoughnutChart>
                <UserStoryCommentsRadarChart></UserStoryCommentsRadarChart>
            </Container>
        </Container>
    )
}
