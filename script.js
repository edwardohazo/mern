const boton = document.getElementById("boton");

    boton.addEventListener("click", (event)=> {

        axios({
        method: 'GET',
        url: "http://localhost:5000/api/products/?category=sitio-de-contacto"
        }).then((res)=>{console.log(res)});
        
    })