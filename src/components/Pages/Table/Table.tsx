import React, {useEffect, useState} from "react";
import "./Table.css"
import {CourseService} from "../../../service/CourseService";
import {Content} from "../../../model/Content";
import {NavLink} from "react-router-dom";
import Snackbar from "../../Snackbar/Snackbar";

function Table() {
    const [content, setContent] = useState<Content>({
        content: [],
        totalElements: 0,
        totalPages: 0,
        size: 0,
    })
    const [keyword, setKeyword] = useState<string>("")
    const [page, setPage] = useState<number>(1)

    const service = new CourseService()

    function getContent(keyword: any, page: any) {
        setKeyword(keyword)
        setPage(page)
        service.getCourseByKeyword(keyword.toLowerCase(), page - 1).then((result) => setContent(result as Content)).catch(() => setContent({
            content: [],
            totalElements: 0,
            totalPages: 0,
            size: 0,
        }))
    }

    function onBodyRowDelete(id:any) {
        console.log(id)
        service.deleteCourseById(id).then((result)=>getContent(keyword,page)).then(()=><Snackbar message={"deleted"}/>);
    }

    useEffect(() => {
        service.getCourseByKeyword(keyword.toLowerCase(), page - 1).then((result) => setContent(result as Content)).catch(() => setContent({
            content: [],
            totalElements: 0,
            totalPages: 0,
            size: 0,
        }))
    }, [])

    function firstUppercase(word:string){
        return word.charAt(0).toUpperCase() + word.slice(1)
    }
    return (
        <>
        <div className="content">
            <section className="container">
                <input className="search_bar "
                       placeholder="Search by course name & tutor"
                       value={keyword}
                       onChange={e =>
                           getContent(e.target.value, 1)
                       }/>
            </section>
            <table className="table">
                <thead>
                <tr className="table-header">
                    <td className="col col-1">ID</td>
                    <td className="col col-2">Course name</td>
                    <td className="col col-3">Tutor</td>
                    <td className="col col-4">Cost</td>
                    <td className="col col-5"></td>
                    <td className="col col-6"></td>
                </tr>
                </thead>
                <tbody>
                {content && content.content.map((row: any, id: number) => (
                    <tr key={id} className="table-row">
                        <td className="col col-1">{id+1+(page-1)*5}</td>
                        <td className="col col-2">{firstUppercase(row.name)}</td>
                        <td className="col col-3">{firstUppercase(row.tutor)}</td>
                        <td className="col col-4">{row.cost}</td>
                        <td className="col col-5">
                            <NavLink to={`/editCourse#${row.id}`}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="blue"
                                 className="bi bi-pencil-square icon" viewBox="0 0 16 16">
                                <path
                                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path
                                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg></NavLink>
                        </td>
                        <td className="col col-6" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red"
                                 className="bi bi-trash3-fill icon" viewBox="0 0 16 16" onClick={event => onBodyRowDelete(row.id)}>
                                <path
                                    d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                            </svg>
                        </td>

                    </tr>))}
                </tbody>
            </table>
            {content ?
            <div className="pagination">
                <button onClick={() => {
                    getContent(keyword, 1)
                }}
                        disabled={page === 1}>
                    {'<<'}
                </button>
                {' '}
                <button onClick={() => {
                    getContent(keyword, page - 1)
                }}
                        disabled={page === 1}>
                    {'<'}
                </button>
                {' '}
                <span>Page{' '}<strong>{page} of {content.totalPages}</strong>{' '}</span>
                {' '}
                <button onClick={() => {
                    getContent(keyword, page + 1)
                }}
                        disabled={page === content.totalPages}>
                    {'>'}
                </button>
                {' '}
                <button onClick={() => {
                    getContent(keyword, content.totalPages)
                }}
                        disabled={page === content.totalPages}>
                    {'>>'}
                </button>

            </div>:null}
        </div>
        </>
    );

}

export default Table;

