import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import TicTacToe from "../Pages/Game/TicTacToe";
import Home from "../Pages/Home/Home";
import Carousel from "../Pages/ImageCarousel/Carousel";
import Table from "../Pages/Table/Table";
import Form from "../Pages/Form/Form";
import UserForm from "../Pages/UserRegistrationForm/UserForm";
import EditForm from "../Pages/EditForm/EditForm";
import SignIn from "../Pages/MockSignIn/SignIn";

const SidebarRouting = () => {
    return (
        <Switch>
            <Route path="/home">
                <Home/>
            </Route>
            <Route path="/game">
                <TicTacToe/>
            </Route>
            <Route path="/carousel">
                <Carousel/>
            </Route>
            <Route path="/registration">
                <UserForm/>
            </Route>
            <Route path="/form">
                <Form/>
            </Route>
            <Route path="/table">
                <Table/>
            </Route>
            <Route path="/editCourse">
                <EditForm/>
            </Route>
            <Route path="/signIn">
                <SignIn/>
            </Route>
            <Redirect from="/*" to="/home"/>
        </Switch>
    )
}

export default SidebarRouting;
