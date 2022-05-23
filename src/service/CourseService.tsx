import {Course} from "../model/Course";
import {Content} from "../model/Content";

export class CourseService{

        async createCourse(name: string, tutor:string, description:string, cost:number) {
        return await fetch(`http://localhost:8080/course`,
            {
                method: "POST",
                body: JSON.stringify({
                    name:name,
                    tutor:tutor,
                    description:description,
                    cost:cost
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                if (response.ok) return response.json()
                return Promise.reject()
            })
            .then((data) => {
                let course:Course = data
                console.log(course)
                return course
            })
            .catch((error) => {
                console.log(error)
            })
    }

        async getCourseByKeyword(keyword: string, page: number) {
        return await fetch(`http://localhost:8080/courses?page=${page}&keyword=${keyword}`,
            {
                method: "GET",
            })
            .then((response) => {
                if (response.ok) return response.json()
                return Promise.reject()
            })
            .then((json) => {
                let result: Content = json
                console.log(result)
                return result
            })
            .catch((error) => {
                console.log(error)
            })
    }

    async updateCourse(id:number,name: string, tutor:string, description:string, cost:number) {
        return await fetch(`http://localhost:8080/updateCourse/${id}`,
            {
                method: "PATCH",
                body: JSON.stringify({
                    name:name,
                    tutor:tutor,
                    description:description,
                    cost:cost
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                if (response.ok) return response.json()
                return Promise.reject()
            })
            .then((data) => {
                let course:Course = data
                console.log(course)
                return course
            })
            .catch((error) => {
                console.log(error)
            })
    }

    async getCourseById(id: number) {
        return await fetch(`http://localhost:8080/course/${id}`,
            {
                method: "GET",
                headers: {Authorization: 'Basic dGVzdDp0ZXN0cGFzcw=='}
            })
            .then((response) => {
                if (response.ok) return response.json()
                return Promise.reject()
            })
            .then((json) => {
                let result: Course = json
                console.log(result)
                return result
            })
            .catch((error) => {
                console.log(error)
            })
    }

    async deleteCourseById(id: number) {
        return await fetch(`http://localhost:8080/course/${id}`,
            {
                method: "DELETE",
            })
            .then((response) => {
                if (response.ok) return response.text()
                return Promise.reject()
            })
            .then((data) => {
                console.log(data)
                return data
            })
            .catch((error) => {
                console.log(error)
                return error
            })
    }
}