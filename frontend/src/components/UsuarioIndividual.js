import React from 'react';
import './UsuarioIndividual.css';


const user = ( { usuario } ) => {

    return (
        <div className="container">
            <div className="row">
                <ul className="list-group">
                    <img className="list-group-image" src={process.env.PUBLIC_URL+"img/user-image.jpg"} alt="user"/>
                    <li className="list-group-item">{usuario.username}</li>
                    <li className="list-group-item">{usuario.email}</li>
                </ul>
                <hr className="at-4"></hr>
            </div>
        </div>
    );
}

export default user;