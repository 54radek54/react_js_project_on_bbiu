import React, {useState} from 'react';
import "./Form.css"
import {CourseService} from "../../../service/CourseService";
import {Course} from "../../../model/Course";
import Snackbar from "../../Snackbar/Snackbar";

function Form() {
    const [name, setName] = useState<string>("")
    const [tutor, setTutor] = useState<string>("")
    const [cost, setCost] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [message, setMessage] = useState<string>("")
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
        setMessage("Course couldn't be created right now!")
    }

    const handleSubmit = () => {
        setMessage("")
        if (name !== "" && tutor !== "" && cost !== "") {
            service.createCourse(name.toLowerCase(), tutor.toLowerCase(), description.toLowerCase(), Number(cost)).then((result) => {
                setCourse(result as Course)
                setMessage("Course successfully created!")
                setName("")
                setTutor("")
                setCost("")
                setDescription("")
                window.location.reload()
            }).catch(() => exception())
        } else {
            setMessage("Enter fields")
        }

    }

    return (
        <div className={"content"}>

            <div className={"form "}>
                <h2 className={"titleForm"}>Course form</h2>
                <input className={"input " + (name === "" ? " empty" : "")}
                       type="text"
                       value={name}
                       placeholder={"Course name"}
                       required={true}
                       onChange={e => setName(e.target.value)}
                />
                <select onChange={e => setTutor(e.target.value)} className={"input " + (tutor === "" ? " empty" : "")}
                        required={true}>
                    <option value="">Tutor...</option>
                    <option value="Bartczyk">Bartczyk</option>
                    <option value="Bartczak">Bartczak</option>
                    <option value="Bartnik">Bartnik</option>
                    <option value="Słomkowski">Słomkowski</option>
                </select>
                <input
                    className={"input " + (cost === "" ? " empty" : "")}
                    type="number"
                    value={cost}
                    placeholder={"Course cost"}
                    onChange={e => setCost(e.target.value)}
                    required={true}

                />
                <textarea className={"input"}
                          value={description}
                          onChange={e => setDescription(e.target.value)}
                          placeholder="Description"/>
                <input type="submit" value="Submit" className={"button"} onClick={handleSubmit}/>
            </div>
            {message === "" ? null : <Snackbar message={message}/>}
        </div>
    );
}

export default Form;
