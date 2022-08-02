// Declaracion de variables

const botonIniciar = document.querySelector(".boton-iniciar"),
sectionInicio = document.querySelector(".inicio"),
formulario = document.querySelector(".formulario"),
botonMenu = document.querySelector(".boton-menu"),
cartas = document.querySelector(".cartas"),
btnMostrarCarrito = document.querySelector(".mostrar-el-carrito"),
verCarro = document.querySelector(".ver-carro"),
verBtnCarrito = document.querySelector(".btn-carrito");


// Mostrar el Formulario de inicio de sesión

botonIniciar.addEventListener("click", ()=> {
    botonIniciar.id = "ocultar-tarjeta";
    formulario.id = "mostrar-formulario";

    const botonEmail = document.querySelector("#exampleInputEmail1"),
    botonContraseña = document.querySelector("#exampleInputPassword1"),
    botonEnviar = document.querySelector("#boton-enviar");

    let recordarme = document.querySelector("#exampleCheck1")


    // Guardar los datos introducidos por el usuario en el Local/Session storage

    function guardar(valor) {
        let user = { usuario:botonEmail.value, contraseña:botonContraseña.value};
        if (user.usuario == "" || user.contraseña == "")  {

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ningun campo puede estar vacío',
            })
            
        }else{

            sectionInicio.id = "ocultar-tarjeta";

            valor === "sessionStorage" && sessionStorage.setItem("item", JSON.stringify(user));

            valor === "localStorage" && localStorage.setItem("item", JSON.stringify(user));

            const formularioDos = document.querySelector("#formulario-2");

            formularioDos.id = "mostrar-boton-menu";

            
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
        
        recordarme.checked ? guardar("localStorage") : guardar("sessionStorage");

    })

})


// Fetch

async function platosFetch () {
    const respuesta = await fetch( "../data/platos.json ");
    return await respuesta.json()
}

// Hacer que el menú sean los platos que hay en el fetch

let menu = [];

platosFetch().then(platos => {
    menu = platos;
})

// Mostrar el menú

function crearHTML() {
    let html;
    for (plato of menu) {
        const {nombre,img, precio, id} = plato;
        html = 
        `<div class = "las-cartas"> 
                <div class="card"> <img src="img/${img}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${nombre.toUpperCase()}</h5>
                        <p class="card-text">$${precio}</p>
                        <button type='button' class='btn btn-primary' onclick= "agregarCarrito(${id})" >Añadir al carrito</button>
                    </div>

                </div>
        </div> `;
        cartas.innerHTML += html;
    }
}

botonMenu.addEventListener("click", ()=> {
    cartas.id = "mostrar-cartas";
    verCarro.id ="mostrar-ver-carro";
    verBtnCarrito.id = "btn-mostrar-carrito";

    crearHTML();
})



// filtrado de platos
function filtrarPlatos (filtro) {
    let filtrado = menu.filter((el) => {
        return el.nombre.includes(filtro);
    });
    return filtrado;
}

const botonBuscar = document.querySelector("#boton-buscar"),
search = document.querySelector(".boton-filtrar"),
cantidadPlato = document.querySelector(".cantidad-plato");


botonBuscar.addEventListener("click", (e) => {
    e.preventDefault();
    cartas.innerHTML = "";
    let filtro = filtrarPlatos(search.value);
    pedirPlato(filtro);
})


// Traer del localStorage los platos para el carrito, y si no hay platos vaciar el carrito

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Guardar los platos en el localStorage

function guardarLocal() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Pushear los platos clickeados al carrito

function agregarCarrito(id) {
    const plato = menu.find(plato => plato.id == id);

    carrito.push(plato);
    Toastify({
        text: "Se agregó al carrito",
        duration: 3000
        }).showToast();

        guardarLocal();
}

// Mostrar el carrito

function verCarrito(array) {
let html;
for (const menu of array) {

    const { nombre, img, precio} = menu;

    html = 
    `<div class = "g-col-6"> 
            <div class="card" style="width: 18rem;"> <img src="img/${img}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${nombre.toUpperCase()}</h5>
                    <p class="card-text">$${precio}</p>
                </div>

            </div>
    </div> `;
    verCarro.innerHTML += html;
    
}
}


const comprarBtn = document.querySelector(".ver-btn-comprar");

btnMostrarCarrito.addEventListener("click", (e) => {
e.preventDefault();
verCarro.innerHTML = "";
verCarrito(carrito);
comprarBtn.id = "ver-btn-comprar";
})

const botonComprar = document.querySelector(".boton-comprar");

botonComprar.addEventListener("click", (e)=> {
e.preventDefault();

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

carrito == ""
? Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'El Carrito no puede estar vacío',
})
: window.location.href = "pages/comprar.html";

})



