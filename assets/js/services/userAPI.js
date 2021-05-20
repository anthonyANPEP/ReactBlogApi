import axios from 'axios';
import jwtDecode from 'jwt-decode';

function findAllPostByUser() {

    const token = window.localStorage.getItem("authToken");

    if (token) {
        const jwtData = jwtDecode(token);

        const id = jwtData.id
        
           return axios
            .get("http://localhost:8000/api/blogeur/" + id + "/articles")
            .then(response => response.data['hydra:member']);
    }
}

function findUser() {

    const token = window.localStorage.getItem("authToken");

    if (token) {
        const jwtData = jwtDecode(token);

        const id = jwtData.id
        
           return axios
            .get("http://localhost:8000/api/users/" + id)
            .then(response => response.data);
    }
}
function newUser(user) {
        
           return axios
            .post("http://localhost:8000/api/users", user)
            .then(response => response.data);
    
}


export default {
    findAll: findAllPostByUser,
    findUser,
    newUser
}