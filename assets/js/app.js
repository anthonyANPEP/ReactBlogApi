//Les imports des librairies
import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route, withRouter } from 'react-router-dom';

//Les imports de boostrap
import '../styles/bootstrap.min.css';
import './bootstrap.bundle.min.js';

//Les imports des services
import AuthAPI from './services/authAPI';

//Les imports des composants ReactJs
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

//Les imports de pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PostsPage from './pages/PostsPage';
import UserPage from './pages/UserPage';
import NewPost from './pages/NewPost';
import OnePost from './pages/OnePost';

//Les imports de CSS
import '../styles/app.css';
import 'react-toastify/dist/ReactToastify.css';
import RegisterPage from './pages/RegisterPage';
import { toast, ToastContainer } from 'react-toastify';


AuthAPI.setUp()

const App = (props) => {

    const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());



    //Permet de récupérer les props comme un composant Route standard
    const NavbarWithRouter = withRouter(Navbar);
    return (
        
        <HashRouter>
            <NavbarWithRouter isAuthenticated={isAuthenticated} onLogout={setIsAuthenticated} />
            <main className="container pt-5">
                <Switch>
                    <Route path="/login"
                        render={(props) => <LoginPage onLogin={setIsAuthenticated} {...props} />}
                        replace
                    />
                    <PrivateRoute path="/user/post/:id" isAuthenticated={isAuthenticated} component={NewPost} />
                    <PrivateRoute path="/info/user" isAuthenticated={isAuthenticated} component={UserPage} />
                    <Route path="/post/:id" component={OnePost} {...props}/>
                    <Route path="/posts" component={PostsPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/" component={HomePage} replace />
                </Switch>
            </main>
            {/* Le HashRouter permet d'accéder à nos routes via des url type: localhost:8000/#/ pour éviter les problèmes d'appel de route avec symfony */}
            <ToastContainer position={ toast.POSITION.BOTTOM_CENTER }/>
        </HashRouter>
        );
}

const root = document.querySelector('#root');
ReactDOM.render(<App />, root);