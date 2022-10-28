import React, { useEffect, useState } from 'react';
import './UserListScreen.css';
import UsuarioIndividual from '../components/UsuarioIndividual.js';


function UserList() {

    const [ dataUsuario, setDataUsuario ] = useState([]);

    useEffect(()=>{

        const admin = {
            "token": `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDhiM2VhZGVmMTYyNTFjZDA3Y2MzMCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2Njk3NzMyMywiZXhwIjoxNjY3MjM2NTIzfQ.0l_Xe2-gjgS82RwQg1YHrgqUqlHbTPR6bHqg6Ro4MnQ"}`,
            "constent-type": "application/json",
        }

        fetch("http://localhost:3000/api/users/?new=true", {
                method: 'GET',
                headers: admin,
                }
        ).then((res)=> res.text())
        .then((res)=> {console.log(JSON.parse(res)); setDataUsuario(JSON.parse(res))})

    }, []);

    // MAPPING USER LIST ON OBJECT USER
    const listaDeUsuarios = dataUsuario.map((usuario) => {
        return(
            <div key={usuario._id}>
                <UsuarioIndividual  usuario={usuario} />
            </div>
        );
    }
    )

return (
    <div className='userscreen'>
         <div className="userscreen__left">
            <h2 className="hTwoUsetList">Lista de usuarios</h2>
            {listaDeUsuarios} 
         </div>
    </div>
    );
}

export default UserList;