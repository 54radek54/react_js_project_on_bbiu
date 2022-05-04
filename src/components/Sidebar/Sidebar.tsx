import React, {useState} from "react";
import SidebarRouting from "./SidebarRouting";
import {BrowserRouter as Router, Link} from 'react-router-dom'
import "./Sidebar.css"
import TicTacToe from "../Pages/Game/TicTacToe";
import Home from "../Pages/Home/Home";
import {bubble as Menu} from 'react-burger-menu';
import Carousel from "../Pages/ImageCarousel/Carousel";
import Table from "../Pages/Table/Table";

interface sideNavigation {
    link: string,
    component: React.FC,
    label: string,
}

const Sidebar = () => {
    const [nav, setNav] = useState<sideNavigation[]>([
        {
            link: 'home',
            component: Home,
            label: 'Home',
        },
        {
            link: 'game',
            component: TicTacToe,
            label: 'Tic Tac Toe',
        },
        {
            link: 'carousel',
            component: Carousel,
            label: 'Image Carousel',
        },
        {
            link: 'table',
            component: Table,
            label: 'Table',
        }
    ])

    return (
        <Router>
            <Menu>
                {nav.map((item, id) => {
                    return (
                        <Link to={`/${item.link}`} key={id} className={"menu-item"}>
                            {item.label}
                        </Link>
                    )
                })}
            </Menu>
            <SidebarRouting/>
        </Router>
    )
}

export default Sidebar;
