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

    const handleSubmit = () => {
        if(name!=="" && tutor!=="" && cost!==""){
            service.createCourse(name, tutor, description, Number(cost)).then((result) => {
                setCourse(result as Course)
                setMessage("Course successfully created!")
            }).catch(() => {setCourse({
                id: 0,
                name: "",
                description: "",
                tutor: "",
                cost: 0,
            })
                setMessage("Course couldn't be created right now!")})
        }else{
            setMessage("Enter fields")
        }

    }

    return (
        <div className={"content"}>
            <h2 className={"title"}>Course form</h2>
            <form onSubmit={handleSubmit}>
                <input className={"first"}
                       type="text"
                       value={name}
                       placeholder={"Course name"}
                       onChange={e => setName(e.target.value)}
                />
                <select onChange={e => setTutor(e.target.value)}>
                    <option value="">Tutor...</option>
                    <option value="Bartczyk">Bartczyk</option>
                    <option value="Bartczak">Bartczak</option>
                    <option value="Bartnik">Bartnik</option>
                    <option value="Słomkowski">Słomkowski</option>
                </select>
                <input
                    type="number"
                    value={cost}
                    placeholder={"Course cost"}
                    onChange={e => setCost(e.target.value)}
                />
                <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Description"/>
                <input type="submit" value="Submit"/>
            </form>
            {message === "" ? null : <Snackbar message={message}/>}
        </div>
    );
}

export default Form;
