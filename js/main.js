const botonIniciar = document.querySelector(".boton-iniciar"),
sectionInicio = document.querySelector(".inicio"),
formulario = document.querySelector(".formulario");

const botonMenu = document.querySelector(".boton-menu"),
cartas = document.querySelector(".cartas");

const btnMostrarCarrito = document.querySelector(".mostrar-el-carrito"),
verCarro = document.querySelector(".ver-carro"),
verBtnCarrito = document.querySelector(".btn-carrito");


// Mostrar el ormulario de inicio de sesión

botonIniciar.addEventListener("click", ()=> {
    botonIniciar.id = "ocultar-tarjeta";
    formulario.id = "mostrar-formulario";

    const botonEmail = document.querySelector("#exampleInputEmail1");

    const botonContraseña = document.querySelector("#exampleInputPassword1");

    const botonEnviar = document.querySelector("#boton-enviar");

    let recordarme = document.querySelector("#exampleCheck1")


    // guardar los datos introducidos por el usuario en el Local/Session storage

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
        
        if (recordarme.checked) {
            guardar("localStorage");
        } else {
            guardar("sessionStorage");
        }


    })

})

// mostrar el menú

botonMenu.addEventListener("click", ()=> {
    cartas.id = "mostrar-cartas";
    verCarro.id ="mostrar-ver-carro";
    verBtnCarrito.id = "btn-mostrar-carrito";
})

const menu =[];

// crear los platos del menú

function Plato(id, nombre, precio, img, btn) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.img = img;
    this.btn = btn;
}

function crearPlato(id,nombre,precio, img, btn){
    const plato = new Plato(id,nombre,precio, img, btn);
    return plato;
}

// cargar al menú los nuevos platos

function cargarPlato(plato){
    menu.push(plato);
}

const cheesecake = crearPlato(1,"cheesecake de frambuesas", 2000, "cheesecake-fram.jpg","cheesecake-de-frambuesas"),
donaChocolate = crearPlato(2,"dona bañada en chocolate negro", 250, "dona.jpg","dona-bañada-en-chocolate-negro"),
waffles = crearPlato(3, "waffles con frutilla y arandanos", 2300, "waffles-frutas.jpg","waffles-con-frutilla-y-arandanos");

cargarPlato(cheesecake)
cargarPlato(donaChocolate);
cargarPlato(waffles);



// filtrado de platos
function filtrarPlatos (filtro) {
    let filtrado = menu.filter((el) => {
        return el.nombre.includes(filtro);
    });
    return filtrado;
}


function crearHTML(array) {
    let html;
    for (const platito of array) {
        html = 
        `<div class = "las-cartas"> 
                <div class="card"> <img src="../img/${platito.img}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${platito.nombre.toUpperCase()}</h5>
                        <p class="card-text">$${platito.precio}</p>
                        <button type='button' class='btn btn-primary' id="${platito.btn}">Añadir al carrito</button>
                    </div>

                </div>
        </div> `;
        cartas.innerHTML += html;
    }
}


const botonBuscar = document.querySelector("#boton-buscar");
search = document.querySelector(".boton-filtrar")
crearHTML(menu);


botonBuscar.addEventListener("click", (e) => {
    e.preventDefault();
    cartas.innerHTML = "";
    let filtro = filtrarPlatos(search.value);
    crearHTML(filtro);
})

// añadir al carrito
const carrito = [];

function agregarCarrito(arr, item) {
    return arr.push(item);
}

const botonCheesecake = document.querySelector("#cheesecake-de-frambuesas"),
botonDona = document.querySelector("#dona-bañada-en-chocolate-negro"),
botonWaffles = document.querySelector("#waffles-con-frutilla-y-arandanos");

localStorage.setItem("carrito", carrito);

botonCheesecake.addEventListener("click", ()=> {
    agregarCarrito(carrito, cheesecake);
    const cheesecakeJson = JSON.stringify(cheesecake);
    localStorage.setItem("cheesecake", cheesecakeJson);
})

botonDona.addEventListener("click", ()=> {
    agregarCarrito(carrito, donaChocolate);
    const donaChocolateJson = JSON.stringify(donaChocolate);
    localStorage.setItem("dona", donaChocolateJson);
})

botonWaffles.addEventListener("click", ()=> {
    agregarCarrito(carrito, waffles);
    const wafflesJson = JSON.stringify(waffles);
    localStorage.setItem("waffles", wafflesJson);
})


// mostrar el carrito

function verCarrito(array) {
    let html;
    for (const platito of array) {
        html = 
        `<div class = "g-col-6"> 
                <div class="card" style="width: 18rem;"> <img src="../img/${platito.img}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${platito.nombre.toUpperCase()}</h5>
                        <p class="card-text">$${platito.precio}</p>
                    </div>

                </div>
        </div> `;
        verCarro.innerHTML += html;
    }
}

btnMostrarCarrito.addEventListener("click", (e) => {
    e.preventDefault();
    verCarrito(carrito);
})




