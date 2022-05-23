import React, {useState} from 'react';
import "./EditForm.css"
import {CourseService} from "../../../service/CourseService";
import {Course} from "../../../model/Course";
import {NavLink} from "react-router-dom";
import Snackbar from "../../Snackbar/Snackbar";

function EditForm() {
    const [message, setMessage] = useState<string>("")
    const [edit, setEdit] = useState<boolean>(false)
    const [course, setCourse] = useState<Course>({
        id: 0,
        name: "",
        description: "",
        tutor: "",
        cost: 0,
    })
    const service = new CourseService()

    function exception() {
        setCourse({
            id: 0,
            name: "",
            description: "",
            tutor: "",
            cost: 0,
        })
        setMessage("Course couldn't be updated right now!")
    }

    const handleSubmit = () => {
        setMessage("")
        if (course.name !== "" && course.tutor !== "" && String(course.cost) !== "") {
            service.updateCourse(course.id, course.name, course.tutor, course.description, Number(course.cost))
                .then((result) => {
                    setCourse(result as Course)
                    setMessage("Course successfully updated!")
                }).catch(() => exception())
        } else {
            setMessage("Enter fields")
        }
    }

    function confirmation() {
        const courseId = Number(window.location.hash.match(/\d+/));
        if (courseId !== 0) {
            service.getCourseById(courseId).then((result) => {
                setCourse(result as Course);
            })
            console.log(course)
        }
        setEdit(true);
    }

    function handleChange(evt: any) {
        const value = evt.target.value;
        setCourse({
            ...course,
            [evt.target.name]: value
        });
    }

    return (
        <>
            <div className={"content"}>
                {edit ? (
                    <div className={"form "}>
                        <h2 className={"titleForm"}>Update {course.name}</h2>
                        <input className={"input " + (course.name === "" ? " empty" : "")}
                               type="text"
                               name={"name"}
                               value={course.name}
                               placeholder={"Course name"}
                               required={true}
                               onChange={handleChange}
                        />
                        <select
                            onChange={handleChange}
                            name={"tutor"}
                            className={"input " + (course.tutor === "" ? " empty" : "")}
                            required={true}
                            value={course.tutor}
                        >
                            <option value=''>...</option>
                            <option value='bartczyk' label={"Bartczyk"}>Bartczyk</option>
                            <option value='bartczak'>Bartczak</option>
                            <option value='bartnik'>Bartnik</option>
                            <option value='słomkowski'>Słomkowski</option>
                        </select>
                        <input
                            className={"input " + (String(course.cost) === "" ? " empty" : "")}
                            type="number"
                            name={"cost"}
                            value={course.cost}
                            placeholder={"Course cost"}
                            onChange={handleChange}
                            required={true}
                        />
                        <textarea className={"input"}
                                  value={course.description}
                                  name={"description"}
                                  onChange={handleChange}
                                  placeholder="Description"/>
                        <input type="submit" value="Submit" className={"button"} onClick={handleSubmit}/>
                        {message === "" ? null : <Snackbar message={message}/>}
                    </div>
                ) : (
                    <div className={"form "}>
                        <h1 className={"titleRegistration"}>Do you really wanna edit?</h1><br/>
                        <div className={"confirmation-fields"}>
                            <button onClick={confirmation} className={"confirm-button"}>
                                Yes
                            </button>
                            <NavLink to={"/table"}>
                                <button className={"confirm-button"}>
                                    No
                                </button>
                            </NavLink>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default EditForm;
