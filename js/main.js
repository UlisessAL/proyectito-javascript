const botonIniciar = document.querySelector(".boton-iniciar"),
sectionInicio = document.querySelector(".inicio"),
formulario = document.querySelector(".formulario");

const botonMenu = document.querySelector(".boton-menu"),
cartas = document.querySelector(".cartas");



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

        const formularioDos = document.querySelector("#formulario-2")

        formularioDos.id = "mostrar-boton-menu"


    })

})


botonMenu.addEventListener("click", ()=> {
    cartas.id = "mostrar-cartas"
})

const menu =[]

function Plato(id, nombre, precio) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
}

function crearPlato(id,nombre,precio){
    const plato = new Plato(id,nombre,precio);
    return plato;
}

function cargarPlato(plato){
    menu.push(plato);
}

const cheesecake = crearPlato(1,"Cheesecake de Frambuesas", 2000),
donaChocolate = crearPlato(2,"Dona bañada en chocolate negro", 250),
waffles = crearPlato(3, "Waffles con Frutilla y arándanos", 2300);

cargarPlato(cheesecake)
cargarPlato(donaChocolate);
cargarPlato(waffles);


const carrito = [];


function agregarCarrito(arr, item) {
    return arr.push(item);
}

const botonCheesecake = document.querySelector("#añadir-carrito-cheesecake"),
botonDona = document.querySelector("#añadir-carrito-dona"),
botonWaffles = document.querySelector("#añadir-carrito-waffles");

botonCheesecake.addEventListener("click", ()=> {
    agregarCarrito(carrito, cheesecake);
    console.log(carrito);
})

botonDona.addEventListener("click", ()=> {
    agregarCarrito(carrito, donaChocolate);
    console.log(carrito);
})

botonWaffles.addEventListener("click", ()=> {
    agregarCarrito(carrito, waffles);
    console.log(carrito);
})

