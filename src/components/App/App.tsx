import React from 'react';
import './App.css';
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";

function App() {
    return (
        <div className="App">
            <div className={"content-wrap"}><Sidebar/></div>
            <div className={"footer"}><Footer/></div>
        </div>
    );
}

export default App;
