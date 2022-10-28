import React from 'react';
import './AgregarUsuarioScreen.css';
import { useState } from 'react';

function AgregarUsuario() {

    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    
    const addUserRequest = (e) => {
    
        e.preventDefault();
        let form = document.getElementById('loginForm');
        sendData(form);

    }

    const sendData = (data) => {

        const payload =  new FormData(data);
        console.log([...payload]);
        const pay = Object.fromEntries(payload);

        console.log(pay);

        fetch("http://localhost:3000/api/auth/register", {
                method: 'POST',
                body: JSON.stringify(pay),
                headers: {
                    "Content-Type": "application/json"
                }
            }
            )
            .then((res)=> res.json())
            .then((res)=> console.log(res));

            alert(`Added ${pay.username} user!`);

            return;

    }


    return (
        <div className="loginFormContainer">
        <h2 className="loginH2">Crear cuenta</h2>
            <form method="POST" className="loginFormContainer__Form" onSubmit={(e) => addUserRequest(e)} id="loginForm">

              <div className="form-outline mb-4">
                <input className="addUserFormInput" type="text" name="username" value={name} onChange={(e) => setName(e.target.value)}/>
              </div>

              <div className="form-outline mb-4">
                <input type="email" id="form1Example1" className="form-control" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label className="form-label addUserFormInput" htmlFor="form1Example1" id="loginUserName">Email address</label>
              </div>

              <div className="form-outline mb-4">
                <input type="password" id="form1Example2" className="form-control addUserFormInput" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <label className="form-label addUserFormLabel" htmlFor="form1Example2">Password</label>
              </div>

            
              <div className="row mb-4">
                <div className="col d-flex justify-content-center">

                  <div className="form-check">
                    <input className="form-check-input addUserFormInput" type="checkbox" value="" id="form1Example3" />
                    <label className="form-check-label addUserFormLabel" htmlFor="form1Example3"> Remember me </label>
                  </div>
                </div>

                <div className="col">

                  <a href="#!">Forgot password?</a>
                </div>
              </div>

                <button type="submit" className="btn btn-primary btn-block" id="loginBtn">Create user</button>

            </form>
    </div>
    );
}

export default AgregarUsuario;