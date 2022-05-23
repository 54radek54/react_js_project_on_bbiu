import React from 'react';
import "./Snackbar.css"

function Snackbar(props:any) {
    return (
        <div className={"snack-wrap"}>
            <input type="checkbox" className={"snackclose animated"} id="close"/>
            <label className={"snacklable animated"} htmlFor={"close"}/>
            <div className="snackbar animated">
                <p><strong>Look: </strong>{props.message}</p>
            </div>
        </div>
    );
}

export default Snackbar;
