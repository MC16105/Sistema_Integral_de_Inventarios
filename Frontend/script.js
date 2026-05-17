// CRUD PROVEEDORES

function agregarProveedor(){
    let nombre = document.getElementById("nombreProveedor").value;
    let telefono = document.getElementById("telefonoProveedor").value;

    // VALIDACION
    if(nombre.trim() === "" || telefono.trim() === ""){
        alert("Complete los campos");
        return; }
    let tabla = document.getElementById("tablaProveedores");
    let fila = `
        <tr>
            <td>${nombre}</td>
            <td>${telefono}</td>
            <td>
                <button onclick="editarProveedor(this)">
                    Editar
                </button>
                <button onclick="eliminarFila(this)">
                    Eliminar
                </button>
            </td>
        </tr>
    `;
    tabla.innerHTML += fila;
    // LIMPIAR INPUTS
    document.getElementById("nombreProveedor").value = "";
    document.getElementById("telefonoProveedor").value = "";
}

// EDITAR PROVEEDOR

function editarProveedor(boton){
    let fila = boton.parentElement.parentElement;
    let columnas = fila.children;
    document.getElementById("nombreProveedor").value = columnas[0].innerText;
    document.getElementById("telefonoProveedor").value = columnas[1].innerText;

    // ELIMINA FILA VIEJA
    fila.remove();
}

// CRUD HISTORIAL

function agregarHistorial(){
    let producto = document.getElementById("producto").value;
    let anterior = document.getElementById("precioAnterior").value;
    let nuevo = document.getElementById("precioNuevo").value;
    let fecha = document.getElementById("fecha").value;

    // VALIDACION
    if( producto.trim() === "" || anterior.trim() === "" || nuevo.trim() === "" || fecha.trim() === ""){
        alert("Complete los campos");
        return; }

    let tabla = document.getElementById("tablaHistorial");
    let fila = tabla.insertRow();

    fila.innerHTML = `
        <td>${producto}</td>
        <td>${anterior}</td>
        <td>${nuevo}</td>
        <td>${fecha}</td>
        <td>
            <button onclick="editarHistorial(this)">
                Editar
            </button>
            <button onclick="eliminarFila(this)">
                Eliminar
            </button>
        </td>
    `;

    // LIMPIAR INPUTS
    document.getElementById("producto").value = "";
    document.getElementById("precioAnterior").value = "";
    document.getElementById("precioNuevo").value = "";
    document.getElementById("fecha").value = "";
}

// EDITAR HISTORIAL

function editarHistorial(boton){
    let fila = boton.parentElement.parentElement;
    let columnas = fila.children;
    document.getElementById("producto").value = columnas[0].innerText;
    document.getElementById("precioAnterior").value = columnas[1].innerText;
    document.getElementById("precioNuevo").value = columnas[2].innerText;
    document.getElementById("fecha").value = columnas[3].innerText;
    // ELIMINA FILA VIEJA
    fila.remove();
}

// CRUD PRODUCTOS

function agregarProducto(){
    let codigo = document.getElementById("codigo").value;
    let nombre = document.getElementById("nombreProducto").value;
    let precio = document.getElementById("precio").value;
    let stock = document.getElementById("stock").value;
    let descripcion = document.getElementById("descripcion").value;
    // VALIDACION
    if( codigo.trim() === "" || nombre.trim() === "" || precio.trim() === "" || stock.trim() === "" || descripcion.trim() === "" ){
        alert("Complete los campos");
        return;
    }
    let tabla =
        document.getElementById("tablaProductos");
    let fila = `
        <tr>
            <td>${codigo}</td>
            <td>${nombre}</td>
            <td>${precio}</td>
            <td>${stock}</td>
            <td>${descripcion}</td>
            <td>
                <button onclick="editarProducto(this)">
                    Editar
                </button>
                <button onclick="eliminarFila(this)">
                    Eliminar
                </button>
            </td>
        </tr>
    `;
    tabla.innerHTML += fila;
    // LIMPIAR INPUTS
    document.getElementById("codigo").value = "";
    document.getElementById("nombreProducto").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("stock").value = "";
    document.getElementById("descripcion").value = "";
}

// EDITAR PRODUCTO

function editarProducto(boton){
    let fila = boton.parentElement.parentElement;
    let columnas = fila.children;
    document.getElementById("codigo").value = columnas[0].innerText;
    document.getElementById("nombreProducto").value = columnas[1].innerText;
    document.getElementById("precio").value = columnas[2].innerText;
    document.getElementById("stock").value = columnas[3].innerText;
    document.getElementById("descripcion").value = columnas[4].innerText;
    fila.remove();
}

// ELIMINAR FILA

function eliminarFila(boton){
    boton.parentElement.parentElement.remove(); }