
import * as axios from "axios";
import queryString from 'query-string'
const developer = "?developer=AndreyD"

const instance = axios.create({
    // withCredentials: true,
    baseURL: `https://uxcandy.com/~shapoval/test-task-backend/v2/`,
})


export const tasksAPI = {
    getTasks: (params = {}) => {
         const queryStringParams = {
             developer: "AndreyD",
            ...params,

        }

       return instance.get(`/?${queryString.stringify(queryStringParams)}`)
        .then(response => response.data)
    },
    createTask: (data) => {
        const { username, email, text, status } = data
        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("text", text);
        formData.append("status", status);

      return instance.post(`/create${developer}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }})
        .then(response => response.data)

    },
    login: (username, password) => {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        return instance.post(`/login${developer}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }})
        .then(response => response.data)

    },
    editTask: (data) => {
        const formData = new FormData();
        const token = localStorage.getItem('token')
        formData.append("text", data.text);
        formData.append("status", data.status);
        formData.append("token", token);
        return instance.post(`/edit/${data.id}${developer}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }})
        .then(response => response.data)

    },
}