import React, {useEffect, useState} from "react";
import "./Table.css"
import {Course} from "../../../model/Course";
import {CourseService} from "../../../service/CourseService";
import Pagination from "rc-pagination";

function Table() {
    const [course, setCourse] = useState<Course[]>([])
    const [keyword, setKeyword] = useState<string>('')
    const [page, setPage] = useState<number>(0)

    const service = new CourseService()

    function getContent(){
        service.getCourseByKeyword(keyword, page).then((result) => setCourse(result as Course[])).catch(() => setCourse([]))
    }
    // const handleSearch = (event:any) => {
    //     setKeyword(event.target.value)
    //     service.getCourseByKeyword(keyword, page).then((result) => setCourse(result as Course[])).catch(() => setCourse([]))
    // };
    // useEffect(() => {
    //     service.getCourseByKeyword(keyword, page).then((result) => setCourse(result as Course[])).catch(() => setCourse([]))
    // })
    // service.getCourseByKeyword(keyword, page).then((result) => setCourse(result as Course[])).catch(() => setCourse([]))
    return (
        <div className="content">
            <div className="search">
                <input
                    placeholder="Search Campaign"
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                />
            </div>
            <button onClick={getContent}></button>
            <table>
                <thead>
                <tr>
                    <td>ID</td>
                    <td>Course name</td>
                    <td>Tutor</td>
                    <td>Cost</td>
                    <td>Description</td>
                </tr>
                </thead>
                <tbody>
                {course && course.map((row: any, id: number) => (
                    <tr key={id}>
                        <td>{row.id}</td>
                        <td>{row.name}</td>
                        <td>{row.tutor}</td>
                        <td>{row.cost}</td>
                        <td>{row.description}</td>
                    </tr>))}
                </tbody>
            </table>
            {/*<Pagination*/}
            {/*    pageSize={5}*/}
            {/*    // onChange={updatePage}*/}
            {/*    current={page}*/}
            {/*    // total={allData.length}*/}
            {/*/>*/}
        </div>
    );

}

export default Table;
function throttle(arg0: (val: any) => void, arg1: number): any {
    throw new Error("Function not implemented.");
}

function cloneDeep(arg0: any) {
    throw new Error("Function not implemented.");
}

