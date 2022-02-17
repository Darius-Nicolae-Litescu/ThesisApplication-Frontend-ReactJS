import axios from "axios";

export function authHeader() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.jwtToken) {
        return { 'Authorization': "Bearer " + user.jwtToken };
    } else {
        return {};
    }
}

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/',
    headers: authHeader()
});


export default instance;