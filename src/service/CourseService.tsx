import {Course} from "../model/Course";

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
                // body: JSON.stringify({
                //     keyword:keyword,
                //     page:page
                // }),
                // headers: {
                //     'Content-Type': 'application/json'
                // },
                mode:"no-cors"
            })
            .then((response) => {
                if (response.ok) return response.json()
                return Promise.reject()
            })
            .then((json) => {
                let result: Course[] = json
                console.log(result)
                return result
            })
            .catch((error) => {
                console.log(error)
            })
    }
}