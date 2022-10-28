import React, {useState} from 'react';
import './UsuarioIndividualScreen.css';
import PersonalUser from '../components/UsuarioIndividual.js';


function UsuarioIndividual() {

    const [personalUser, setPersonalUser] = useState("");
    
    const getUserRequest = async (e) => {

        e.preventDefault();
        let form = document.getElementById('loginForm');
        sendData(form);

    }

    const sendData = async (data) => {

        const payload =  new FormData(data);
        const pay = Object.fromEntries(payload);
          
        let response = await fetch("http://localhost:3000/api/auth/loggin", {
                method: 'POST',
                body: JSON.stringify(pay),
                headers: {
                    "Content-Type": "application/json"
              }
           }
        )

        if (response.ok === true) {
            response.json().then((res)=> {setPersonalUser(res); console.log(res)});
            alert("Success getting user profile!");
          } else if (response.ok === false) {
            response.json().then((res)=> {console.log(res)});
            }

    }

    if (!personalUser) {

      return (
        <div className="loginFormContainer">
        <h2 className="loginH2">Login</h2>
            <form method="POST" className="loginFormContainer__Form" onSubmit={(e) => getUserRequest(e)} id="loginForm">

              <div className="form-outline mb-4">
                <input type="text" name="username" id="loginUserName"/>
              </div>

              <div className="form-outline mb-4">
                <input type="email" id="form1Example1" className="form-control" name="email"/>
                <label className="form-label" htmlFor="form1Example1">Email address</label>
              </div>

              <div className="form-outline mb-4">
                <input type="password" id="form1Example2" className="form-control" name="password"/>
                <label className="form-label" htmlFor="form1Example2">Password</label>
              </div>

            
              <div className="row mb-4">
                <div className="col d-flex justify-content-center">

                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
                    <label className="form-check-label" htmlFor="form1Example3"> Remember me </label>
                  </div>
                </div>

                <div className="col">

                  <a href="#!">Forgot password?</a>
                </div>
              </div>

                <button type="submit" className="btn btn-primary btn-block" id="loginBtn">Sign in</button>

            </form>
    </div>
    );

    }

    // SHOW PERSONALIZED USER PROFILE
    else {
      return (
        <div className='userscreen'>
             <div className="userscreen__left">
                <h2 className="hTwoUsetList">Usuario Activo</h2>
                <PersonalUser  usuario={personalUser} />
             </div>
        </div>
        );
    }

}

export default UsuarioIndividual;