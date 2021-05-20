import axios from 'axios';
import jwtDecode from 'jwt-decode';



function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}

function authenticate(credentials) {
     
    return axios
        .post("http://localhost:8000/api/login_check", credentials)
        .then(response => response.data.token)
        .then(token => {
             
            //On stocke le token dans le localStorage
            window.localStorage.setItem("authToken", token);
             
            //On prévient axios qu'on a maintenant un header par défaut sur toutes nos futures requêtes HTTP
            setAxiosToken(token);
        })
}

function setAxiosToken(token) {
    axios.defaults.headers["Authorization"] = "Bearer " + token;
}

function setUp() {
    //Vérifier si il y a un token stocké
    const token = window.localStorage.getItem("authToken");

    if (token) {
        const jwtData = jwtDecode(token);

        //Si le token est toujours valide
        if (jwtData.exp * 1000 > new Date().getTime()) {
            //On stocke le token dans axios 
            setAxiosToken(token);
        }
    }
}

function isAuthenticated() {
    const token = window.localStorage.getItem("authToken");

    if (token) {
        const jwtData = jwtDecode(token);

        if (jwtData.exp * 1000 > new Date().getTime()) {
            return true;
        }
        return false;
    }
    return false;
}

export default {
    authenticate,
    logout,
    setUp,
    isAuthenticated
}