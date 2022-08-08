// Llamar a los platos que estan en platos.json

const carrito = JSON.parse(localStorage.getItem("carrito")) || [],
contenedorCompra = document.querySelector(".contenedor-compra");

// Hacer la tabla del carrito

function hacerTabla() {
    let html;
    for (plato of carrito) {

        const { nombre, precio, cantidad} = plato,
        precioTotal = document.querySelector(".precio-total"),
        total = totalPrecio();

        precioTotal.innerHTML = "$" + total;

        html = 
        `<tr>
            <td class ="tabla">${nombre}</td>
			<td class ="tabla">$${precio * cantidad}</td>
            <td class ="tabla">${cantidad}</td>
        </tr>
		`;
        contenedorCompra.innerHTML += html;
    }
}

hacerTabla();

// Calcular el total

function totalPrecio() {
    let total = 0;
    for (plato of carrito) {
        total += plato.precio * plato.cantidad;
    }

    return total
}


// Inputs de las tarjetas

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

var cleave = new Cleave('.input-element-3', {
    blocks: [3],
    uppercase: true
});

const inputComprar1 = document.querySelector(".input-element"),
inputComprar2 = document.querySelector(".input-element-2"),
inputComprar3 = document.querySelector(".input-element-3"),
btnRealizarCompra = document.querySelector(".boton-realizar-compra"),
nombreCompra = document.querySelector(".nombre-compra"),
emailCompra = document.querySelector(".email-compra")

// Validar la compra

btnRealizarCompra.addEventListener("click", (e)=>{
    e.preventDefault();
    if (inputComprar1.value == "" || inputComprar2.value == "" || inputComprar3.value == "" || nombreCompra.value == "" || emailCompra.value == "") {
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
            localStorage.removeItem("carrito");
            setTimeout(()=>{
                window.location.href = "../index.html";
            },2500)
            
    }

})


