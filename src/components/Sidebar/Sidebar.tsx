import React, {useState} from "react";
import SidebarRouting from "./SidebarRouting";
import {BrowserRouter as Router, NavLink} from 'react-router-dom'
import "./Sidebar.css"
import TicTacToe from "../Pages/Game/TicTacToe";
import Home from "../Pages/Home/Home";
import {bubble as Menu} from 'react-burger-menu';
import Carousel from "../Pages/ImageCarousel/Carousel";
import Table from "../Pages/Table/Table";
import Form from "../Pages/Form/Form";
import UserForm from "../Pages/UserRegistrationForm/UserForm";

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
            link: 'registration',
            component: UserForm,
            label: 'Registration',
        },
        {
            link: 'form',
            component: Form,
            label: 'Course Form',
        },
        {
            link: 'table',
            component: Table,
            label: 'Course Table',
        }
    ])

    return (
        <Router>
            <Menu>
                {nav.map((item, id) => {
                    return (
                        <NavLink to={`/${item.link}`} key={id} className={"menu-item"}>
                            {item.label}
                        </NavLink>
                    )
                })}
            </Menu>
            <div className={"content-sidebar"}>
            <SidebarRouting/></div>
        </Router>
    )
}

export default Sidebar;
