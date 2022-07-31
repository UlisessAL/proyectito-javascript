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

// Mostrar el menú

botonMenu.addEventListener("click", ()=> {
    cartas.id = "mostrar-cartas";
    verCarro.id ="mostrar-ver-carro";
    verBtnCarrito.id = "btn-mostrar-carrito";
})


        const pedirPlato = async ()=>{
            const respuesta = await fetch( "../data/platos.json ")
            const data = await respuesta.json()

            for (let i of data) {
;
            let html;
            html = 
        `<div class = "las-cartas"> 
                <div class="card"> <img src="img/${i.img}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${i.nombre.toUpperCase()}</h5>
                        <p class="card-text">$${i.precio}</p>
                        <button type='button' class='btn btn-primary' id="${i.btn}">Añadir al carrito</button>
                    </div>

                </div>
        </div> `;
        cartas.innerHTML += html;
}

    
    // filtrado de platos
    function filtrarPlatos (filtro) {
        let filtrado = data.filter((el) => {
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
    

const carrito = [];

function agregarCarrito(arr, item) {
    return arr.push(item);
}

function agregarLocal(arr) {
    localStorage.setItem("carrito", arr)
}

const botonCheesecake = document.querySelector("#cheesecake-de-frambuesas"),
botonDona = document.querySelector("#dona-bañada-en-chocolate-negro"),
botonWaffles = document.querySelector("#waffles-con-frutilla-y-arandanos");

const cheesecake = data[0],
donaChocolate = data[1],
waffles = data[2];

botonCheesecake.addEventListener("click", ()=> {
    agregarCarrito(carrito, cheesecake);
    const cheesecakeJson = JSON.stringify(cheesecake);
    localStorage.setItem("cheesecake", cheesecakeJson);
    Toastify({
        text: "Se agregó al carrito",
        duration: 3000
        }).showToast();

        agregarLocal(JSON.stringify(carrito));
})

botonDona.addEventListener("click", ()=> {
    agregarCarrito(carrito, donaChocolate);
    const donaChocolateJson = JSON.stringify(donaChocolate);
    localStorage.setItem("dona", donaChocolateJson);
    Toastify({
        text: "Se agregó al carrito",
        duration: 3000
        }).showToast();

        agregarLocal(JSON.stringify(carrito));
})

botonWaffles.addEventListener("click", ()=> {
    agregarCarrito(carrito, waffles);
    const wafflesJson = JSON.stringify(waffles);
    localStorage.setItem("waffles", wafflesJson);
    Toastify({
        text: "Se agregó al carrito",
        duration: 3000
        }).showToast();

        agregarLocal(JSON.stringify(carrito));
})


// Mostrar el carrito

function verCarrito(array) {
    let html;
    for (const menu of array) {


        const { nombre, precio, img} = menu;

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
    verCarrito(JSON.parse(localStorage.getItem("carrito")));
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




}

pedirPlato();
        

