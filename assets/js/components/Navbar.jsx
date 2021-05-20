import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthAPI from '../services/authAPI';
import { toast } from 'react-toastify';

const Navbar = ({isAuthenticated, onLogout, history}) => {


    const handleLogout = () => {
        AuthAPI.logout();
        onLogout(false);
        toast.info("Vous êtes déconnecté ! 😃 ")
        history.push("/login");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    Mon Blog
                </NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto">
                <li className="nav-item">
                <NavLink className="nav-link" to="/posts">Nos articles</NavLink>
                </li>
            </ul>
                <ul className="navbar-nav ml-auto">
                        {(!isAuthenticated && (<>
                            {/* Boutons connexion */}
                            <li className="nav-item">
                                <NavLink to="/register" className="nav-link">Inscription</NavLink>
                            </li>
                             <li className="nav-item">
                                <NavLink to="/login" className="btn btn-success">Connexion</NavLink>
                            </li>
                        </>) || (<>
                            {/* Menu déroulant */ }
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Gestion compte</a>
                            <div className="dropdown-menu">
                                <NavLink className="dropdown-item" to="/info/user">Mes informations</NavLink>
                                <NavLink className="dropdown-item" to="/user/post/new">Nouveau post</NavLink>
                                <div className="dropdown-divider"></div>
                                <button type="button"className="dropdown-item" onClick={handleLogout}>Déconnexion</button>
                            </div>
                             </li>
                        </>))}
                </ul>
            </div>
        </div>
        </nav>


     );
}
 
export default Navbar;