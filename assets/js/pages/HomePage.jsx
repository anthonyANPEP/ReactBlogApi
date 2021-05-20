import React from 'react'
import { NavLink } from 'react-router-dom';

const HomePage = (props) => {
    return (
        <div className="card text-center">
            <div className="card-header">
                <h1>Mon super Blog React !</h1>
            </div>
            <div className="card-body">
                <h5 className="card-title">Bienvenue sur mon super blog !</h5>
                <p className="card-text p-3">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut quia vero incidunt delectus non laboriosam quidem assumenda aliquid perferendis consequuntur alias, tempore sit recusandae nesciunt ex fugit facilis blanditiis reiciendis?
                Provident dolor magni quod, nesciunt voluptatum dolores ea, soluta necessitatibus dicta, expedita tenetur eius placeat incidunt quaerat cupiditate animi adipisci. Doloribus neque inventore ducimus dicta at quibusdam excepturi voluptatum quod!</p>
                <NavLink to="/posts" className="btn btn-primary">Voir tous les posts</NavLink>
            </div>
        </div>
     );
}
 
export default HomePage;