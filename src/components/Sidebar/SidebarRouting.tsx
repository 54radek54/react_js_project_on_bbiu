import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import TicTacToe from "../Pages/Game/TicTacToe";
import Home from "../Pages/Home/Home";
import Carousel from "../Pages/ImageCarousel/Carousel";
import Table from "../Pages/Table/Table";

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
            <Route path="/table">
                <Table/>
            </Route>
            <Redirect from="/*" to="/home"/>
        </Switch>
    )
}

export default SidebarRouting;
