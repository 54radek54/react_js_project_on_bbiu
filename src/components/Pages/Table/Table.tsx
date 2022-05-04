import React from "react";
import "./Table.css"

function Table() {

    return (
        <div className="content">
            {/*<h2 th:align="center">Search in User List</h2>*/}
            {/*<form th:align="center" th:action="@{/searchUser}" method="get">*/}
            {/*  <input type="text" name="keyword" th:value="${keyword}" placeholder="Find by Name & Role & Email" size="50">*/}
            {/*    <button type="submit" className="btn btn-info">Search</button>*/}
            {/*</form>*/}
            <section className="container">
                <label htmlFor="search_bar">Search</label>
                <input className="search_bar"
                       name="search_bar"
                       type="search"
                       placeholder="Search"></input>
            </section>
            <table>
                <thead>
                <tr>
                    <th>User ID</th>
                    <th>E-mail</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Role</th>
                    {/*<th>Change Role User/Employee</th>*/}
                    {/*<th>Delete</th>*/}
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>User ID</td>
                    <td>E-mail</td>
                    <td>First Name</td>
                    <td>Last Name</td>
                    <td>Role</td>
                </tr>
                </tbody>
            </table>
        </div>
    );

}

export default Table;
