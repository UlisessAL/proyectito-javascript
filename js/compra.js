const menu =[];

// Crear los platos del menú

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

// Cargar al menú los nuevos platos

function cargarPlato(plato){
    menu.push(plato);
}

const cheesecake = crearPlato(1,"cheesecake de frambuesas", 2000, "cheesecake-fram.jpg","cheesecake-de-frambuesas"),
donaChocolate = crearPlato(2,"dona bañada en chocolate negro", 250, "dona.jpg","dona-bañada-en-chocolate-negro"),
waffles = crearPlato(3, "waffles con frutilla y arandanos", 2300, "waffles-frutas.jpg","waffles-con-frutilla-y-arandanos");

cargarPlato(cheesecake);
cargarPlato(donaChocolate);
cargarPlato(waffles);

const contenedorCompra = document.querySelector(".contenedor-compra");

function hacerTabla(array) {
    let html;
    for (const menu of array) {

        const { nombre, precio} = menu;

        html = 
        `<tr>
            <td class ="tabla">${nombre}</td>
			<td class ="tabla">$${precio}</td></tr>
        </tr>
		`;
        contenedorCompra.innerHTML += html;
    }
}

hacerTabla(JSON.parse(localStorage.getItem("carrito")));

const precioTotal = document.querySelector(".precioTotal");

const carrito = JSON.parse(localStorage.getItem("carrito"));

const total = 0;

function calcularTotal(array) {
    for (const menu of array) {

        const {precio} = menu;

        const sumarTotal = precio + total;
        return sumarTotal
    }
}

precioTotal.innerHTML = "$" + calcularTotal(carrito);

console.log(carrito);

var cleave = new Cleave('.input-element', {
    creditCard: true,
    onCreditCardTypeChanged: function (type) {
    }
});

var cleave = new Cleave('.input-element-2', {
    date: true,
    delimiter: '-',
    datePattern: ['Y', 'm', 'd']
});

const inputComprar1 = document.querySelector(".input-element"),
inputComprar2 = document.querySelector(".input-element-2"),
btnRealizarCompra = document.querySelector(".boton-realizar-compra");

btnRealizarCompra.addEventListener("click", (e)=>{
    e.preventDefault();
    if (inputComprar1.value == "" || inputComprar2.value == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ningun campo puede estar vacío',
        })
    } else {
        Swal.fire({
            icon: 'success',
            title: 'Tu compra se realizó con éxito',
            timer: 4500,
        })
            localStorage.clear();
            window.location.href = "../index.html";
    }

    

})


