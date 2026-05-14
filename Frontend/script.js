function agregarProveedor(){

    let nombre = document.getElementById("nombreProveedor").value;

    let telefono = document.getElementById("telefonoProveedor").value;

    if(nombre === "" || telefono === ""){
        alert("Complete los campos");
        return;
    }

    let tabla = document.getElementById("tablaProveedores");

    let fila = `
        <tr>
            <td>${nombre}</td>
            <td>${telefono}</td>

            <td>
                <button onclick="eliminarFila(this)">
                    Eliminar
                </button>
            </td>
        </tr>
    `;

    tabla.innerHTML += fila;

    document.getElementById("nombreProveedor").value = "";

    document.getElementById("telefonoProveedor").value = "";
}

function eliminarFila(boton){
    boton.parentElement.parentElement.remove();
}

const tabla = document.getElementById("tablaProveedores");

function guardarProveedor() {

    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;

    if(nombre === "" || telefono === ""){
        alert("Complete los campos");
        return;
    }

    const fila = document.createElement("tr");

    fila.innerHTML = `
        <td>${nombre}</td>
        <td>${telefono}</td>
        <td>
            <button onclick="eliminarFila(this)">
                Eliminar
            </button>
        </td>
    `;

    tabla.appendChild(fila);

    document.getElementById("nombre").value = "";
    document.getElementById("telefono").value = "";
}

function eliminarFila(boton){
    boton.parentElement.parentElement.remove();
}

function agregarHistorial() {

    let producto =
        document.getElementById("producto").value;

    let anterior =
        document.getElementById("precioAnterior").value;

    let nuevo =
        document.getElementById("precioNuevo").value;

    let fecha =
        document.getElementById("fecha").value;

    let tabla =
        document.getElementById("tablaHistorial");

    let fila = tabla.insertRow();

    fila.innerHTML = `
        <td>${producto}</td>
        <td>${anterior}</td>
        <td>${nuevo}</td>
        <td>${fecha}</td>

        <td>
            <button onclick="eliminarFila(this)">
                Eliminar
            </button>
        </td>
    `;
}

function eliminarFila(boton) {
    boton.parentElement.parentElement.remove();
}