import React from 'react';
import "./SignIn.css"
import {NavLink} from "react-router-dom";

function SignIn() {
    return (
        <div className={"content"}>
            <h1>Welcome to Sign in page</h1>
            <h2>Here you could login to your account after registration</h2>
            <NavLink to={"/registration"}>
                <div className={"linkd"}>
                    Come back to registration!
                </div>
            </NavLink>
        </div>
    );
}

export default SignIn;
