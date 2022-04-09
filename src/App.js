import React, { Component } from "react";
import { useNavigate, BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Login } from "./components/login.component";
import { Statistics } from "./components/statistics/statistics.component";
import { Register } from "./components/register.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import { BoardAdmin } from "./components/admin/board-admin.component";
import { EditProfile } from "./components/user/edit-user-details/edit-user-details.component"
import { Container } from 'react-bootstrap'
import { Profile } from './components/user/profile.component';
import Story from "./components/main/story/story.component";
import StoryTask from "./components/main/storytask/story-task.component";
import { BoardSelection } from "./components/board/board-selection.component"
import { Board } from "./components/board/board.component"
import { SearchResult } from "./components/search/search-result.component";
import { TicketList } from "./components/ticket-list/ticket-list.component";
import { AddStory } from "./components/general-forms/story/add-story.component";
import { AddStoryTask } from "./components/general-forms/storytask/add-story-task.component";
import { AddOrUpdateSoftwareApplication } from "./components/general-forms/software-application/insert-update-software-application.component";
import {AddOrUpdatePriority} from "./components/general-forms/priority/insert-update-priority.component";
import {AddOrUpdateCategory} from "./components/general-forms/category/insert-update-category.component";
import {AddOrUpdatePosition} from "./components/general-forms/position/insert-update-position.component";
import {AddOrUpdatePerson} from "./components/general-forms/person/insert-update-person.component";
import {AddOrUpdateEmployee} from "./components/general-forms/employee/insert-update-employee.component";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { MainComponent } from "./components/main-component";
export const App = () => {
  return (
    <Container id="main-container">
      <MainComponent />
      <Routes>
        <Route exact path="/" element={<MainComponent />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/statistics" element={<Statistics />} />
        <Route exact path="/profile/:userId" element={<Profile />} />
        <Route exact path="/edit/user" element={<EditProfile />} />
        <Route exact path="/search-result/:searchTerm" element={<SearchResult />} />
        <Route exact path="/ticket-list" element={<TicketList />} />
        <Route exact path="/add-story" element={<AddStory />} />
        <Route exact path="/add-story-task/:storyId" element={<AddStoryTask />} />
        <Route exact path="/add-update-software-application/" element={<AddOrUpdateSoftwareApplication />} />
        <Route exact path="/add-update-software-application/:softwareApplicationId" element={<AddOrUpdateSoftwareApplication />} />
        <Route exact path="/add-update-priority/" element={<AddOrUpdatePriority />} />
        <Route exact path="/add-update-priority/:priorityId" element={<AddOrUpdatePriority />} />
        <Route exact path="/add-update-category/" element={<AddOrUpdateCategory />} />
        <Route exact path="/add-update-category/:categoryId" element={<AddOrUpdateCategory />} />
        <Route exact path="/add-update-position/" element={<AddOrUpdatePosition />} />
        <Route exact path="/add-update-position/:positionId" element={<AddOrUpdatePosition />} />
        <Route exact path="/add-update-person/" element={<AddOrUpdatePerson />} />
        <Route exact path="/add-update-person/:personId" element={<AddOrUpdatePerson />} />
        <Route exact path="/add-update-employee/" element={<AddOrUpdateEmployee />} />
        <Route exact path="/add-update-employee/:employeeId" element={<AddOrUpdateEmployee />} />
        <Route path="/user" element={<BoardUser />} />
        <Route path="/mod" element={<BoardModerator />} />
        <Route path="/admin" element={<BoardAdmin />} />
        <Route path="story/:storyId" element={<Story />} />
        <Route path="story-task/:storyTaskId" element={<StoryTask />} />
        <Route path="kanban-board" element={<BoardSelection />} />
        <Route path="kanban-board/:boardId" element={<Board />} />
      </Routes>
    </Container>
  );
}
