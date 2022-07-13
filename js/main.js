const botonIniciar = document.querySelector(".boton-iniciar"),
sectionInicio = document.querySelector(".inicio"),
formulario = document.querySelector(".formulario");



botonIniciar.addEventListener("click", ()=> {
    botonIniciar.id = "ocultar-tarjeta";
    formulario.id = "mostrar-formulario";

    const botonEmail = document.querySelector("#exampleInputEmail1");

    const botonContraseña = document.querySelector("#exampleInputPassword1");

    const botonEnviar = document.querySelector("#boton-enviar");

    let recordarme = document.querySelector("#exampleCheck1")

    function guardar(valor) {
        let user = { usuario:botonEmail.value, contraseña:botonContraseña.value};
        if (user.usuario == "" || user.contraseña == "")  {
            let alerta = document.createElement("p")
            alerta.innerText = "Ningún campo puede estar vacío";
            alerta.className = "alerta-p";
            sectionInicio.appendChild(alerta);
            
        }else{

            let alertaP = document.querySelector(".alerta-p");

            sectionInicio.id = "ocultar-tarjeta";

            if (valor === "sessionStorage") {
                sessionStorage.setItem("item", JSON.stringify(user));
            }
            if (valor === "localStorage") {
                localStorage.setItem("item", JSON.stringify(user));
            }
        }
        

        return user;
}

    function recuperarDatos(datos) {
        if (datos) {
            botonEmail.value = datos.usuario;
            botonContraseña.value = datos.contraseña
        }
    }

    recuperarDatos(JSON.parse(localStorage.getItem("item")));

    botonEnviar.addEventListener("click", (event)=> {
        event.preventDefault();
        
        if (recordarme.checked) {
            guardar("localStorage");
        } else {
            guardar("sessionStorage");
        }

    })

})