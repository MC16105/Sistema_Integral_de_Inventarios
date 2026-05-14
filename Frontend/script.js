// --- FUNCIONES PARA PROVEEDORES ---

function agregarProveedor() {
    // 1.  LOS 5 DATOS (
    const nombre = document.getElementById("nombreProveedor").value;
    const contacto = document.getElementById("contactoProveedor").value;
    const telefono = document.getElementById("telefonoProveedor").value;
    const email = document.getElementById("emailProveedor").value;
    const direccion = document.getElementById("direccionProveedor").value;

    // 2. VALIDACIÓN 
    if(nombre === ""||  contacto === ""||  telefono === ""||  email === ""||  direccion === "") {
        alert("⚠️ Por favor, complete todos los campos obligatorios.");
        return;
    }

    // 3. INSERTAR EN LA TABLA
    const tabla = document.getElementById("tablaProveedores");
    const fila = `
        <tr>
            <td>${nombre}</td>
            <td>${contacto}</td>
            <td>${telefono}</td>
            <td>${email}</td>
            <td>${direccion}</td>
            <td>
                <button class="btn-edit" onclick="prepararEdicion(this)">Editar</button>
                <button class="btn-delete" onclick="eliminarFila(this)">Eliminar</button>
            </td>
        </tr>
    `;

    tabla.innerHTML += fila;
    alert("✅ Proveedor registrado exitosamente (Simulación POST)");
    limpiarFormulario();
}

// 4. Función para Eliminar con Confirmación 
function eliminarFila(boton) {
    if (confirm("¿Está seguro de que desea eliminar este registro? (Esta acción simula un DELETE lógico)")) {
        boton.parentElement.parentElement.remove();
        alert("🗑️ Registro eliminado.");
    }
}

// 5. Función para Simular Edición 
function prepararEdicion(boton) {
    const fila = boton.parentElement.parentElement;
    const nombre = fila.cells[0].innerText;
    
    alert("🔄 Cargando datos de '" + nombre + "' en el formulario para editar (Simulación PUT).");
    
    //  mover los datos de vuelta a los inputs para la captura del reporte
    document.getElementById("nombreProveedor").value = nombre;
}

function limpiarFormulario() {
    document.getElementById("nombreProveedor").value = "";
    document.getElementById("contactoProveedor").value = "";
    document.getElementById("telefonoProveedor").value = "";
    document.getElementById("emailProveedor").value = "";
    document.getElementById("direccionProveedor").value = "";
}

// --- FUNCIONES PARA HISTORIAL ---

function agregarHistorial() {
    let producto = document.getElementById("producto").value;
    let anterior = document.getElementById("precioAnterior").value;
    let nuevo = document.getElementById("precioNuevo").value;
    let fecha = document.getElementById("fecha").value;
    let tabla = document.getElementById("tablaHistorial");

    if(!producto || !nuevo) return;

    let fila = tabla.insertRow();
    fila.innerHTML = `
        <td>${producto}</td>
        <td>${anterior}</td>
        <td>${nuevo}</td>
        <td>${fecha}</td>
        <td><button onclick="eliminarFila(this)">Eliminar</button></td>
    `;
}