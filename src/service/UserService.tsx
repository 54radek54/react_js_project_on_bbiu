import {User} from "../model/User";

export class UserService {

    async createUser(email: string, firstName: string, lastName: string, password: string) {
        return await fetch(`http://localhost:8080/user`,
            {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    password: password
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
                let course: User = data
                console.log(course)
                return course
            })
            .catch((error) => {
                console.log(error)
            })
    }
}