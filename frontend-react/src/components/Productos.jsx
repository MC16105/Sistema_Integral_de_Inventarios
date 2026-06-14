import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaPlus, FaSync, FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { obtenerProductos, crearProducto, actualizarProducto, eliminarProducto } from "../services/productoService";
import "../App.css";

function Productos() {
    // --- ESTADOS ---
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [proveedores, setProveedores] = useState([]);

    // Estados del formulario
    const [idEditar, setIdEditar] = useState(null);
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [categoriaId, setCategoriaId] = useState("");
    const [proveedorId, setProveedorId] = useState("");

    // Estado de control de UI
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    // --- EFECTOS ---
    useEffect(() => {
        cargarProductos();
        cargarDatosRelacionales();
    }, []);

    // --- FUNCIONES DE CARGA ---
    const cargarProductos = async () => {
        try {
            const data = await obtenerProductos();
            setProductos(data);
        } catch (error) {
            console.error(error);
            toast.error("Error al cargar los productos de la base de datos");
        }
    };

    const cargarDatosRelacionales = async () => {
        try {
            // Cuando crees tus servicios en el backend, descomenta estas líneas:
            // const dataCategorias = await obtenerCategorias();
            // const dataProveedores = await obtenerProveedores();
            // setCategorias(dataCategorias);
            // setProveedores(dataProveedores);

            // --- DATA DE PRUEBA (Borrar cuando conectes Axios) ---
            setCategorias([
                { id: 1, nombre: "Electrónica" },
                { id: 2, nombre: "Ropa y Calzado" },
                { id: 3, nombre: "Hogar y Cocina" }
            ]);
            setProveedores([
                { id: 1, nombre: "Distribuidora Tech Global" },
                { id: 2, nombre: "Textiles del Sur S.A." },
                { id: 3, nombre: "Importaciones Hogar" }
            ]);
        } catch (error) {
            console.error("Error al cargar datos relacionales", error);
            toast.error("Error al cargar categorías o proveedores");
        }
    };

    // --- OPERACIONES CRUD ---
    const guardarProducto = async () => {
        // Validación básica antes de enviar a PostgreSQL
        if (!nombre || !precio || !stock || !categoriaId || !proveedorId) {
            toast.warning("Por favor, llena todos los campos obligatorios");
            return;
        }

        const producto = {
            nombre,
            precio: parseFloat(precio),
            stock: parseInt(stock),
            descripcion,
            categoriaId: parseInt(categoriaId),
            proveedorId: parseInt(proveedorId),
            usuarioId: 1 // Cambiar cuando tengas un sistema de Login / Auth
        };

        try {
            if (idEditar) {
                await actualizarProducto(idEditar, producto);
                toast.success("¡Producto actualizado correctamente! 🚀");
                setIdEditar(null);
            } else {
                await crearProducto(producto);
                toast.success("¡Producto agregado con éxito! 🎉");
            }
            limpiarFormulario();
            setMostrarFormulario(false); // Cierra el modal flotante
            cargarProductos();
        } catch (error) {
            console.error(error);
            toast.error("Hubo un error al procesar la solicitud en el servidor");
        }
    };

    const editarProducto = (producto) => {
        setIdEditar(producto.id);
        setNombre(producto.nombre);
        setPrecio(producto.precio);
        setStock(producto.stock);
        setDescripcion(producto.descripcion || "");
        // Mapeamos las llaves foráneas al estado (usamos cadenas para el funcionamiento del <select>)
        setCategoriaId(producto.categoriaId ? producto.categoriaId.toString() : "");
        setProveedorId(producto.proveedorId ? producto.proveedorId.toString() : "");
        setMostrarFormulario(true); // Abre el modal automáticamente
    };

    const borrarProducto = async (id) => {
        const confirmar = window.confirm("¿Está seguro de eliminar este producto?");
        if (!confirmar) return;

        try {
            await eliminarProducto(id);
            toast.dark("Producto eliminado correctamente 🗑️");
            cargarProductos();
        } catch (error) {
            console.error(error);
            toast.error("No se pudo eliminar el producto");
        }
    };

    const limpiarFormulario = () => {
        setNombre("");
        setPrecio("");
        setStock("");
        setDescripcion("");
        setCategoriaId("");
        setProveedorId("");
        setIdEditar(null);
    };

    return (
        <div className="container animate-fade-in">
            {/* Contenedor de Alertas Flotantes */}
            <ToastContainer position="top-right" autoClose={3000} />

            {/* Encabezado Superior */}
            <div className="header-seccion">
                <h2>Gestión de Productos</h2>
                <button
                    className="btn-principal"
                    onClick={() => setMostrarFormulario(true)}
                >
                    <FaPlus /> Nuevo Producto
                </button>
            </div>

            {/* MODAL FLOTANTE (Formulario) */}
            {mostrarFormulario && (
                <div className="modal-backdrop" onClick={() => { limpiarFormulario(); setMostrarFormulario(false); }}>
                    <div className="card-formulario modal-content" onClick={(e) => e.stopPropagation()}>

                        <div className="modal-header">
                            <h3>{idEditar ? "Editar Producto" : "Registrar Nuevo Producto"}</h3>
                            <button className="btn-cerrar-modal" onClick={() => { limpiarFormulario(); setMostrarFormulario(false); }}>
                                <FaTimes />
                            </button>
                        </div>

                        <div className="formulario-grid">
                            <div className="input-group">
                                <label>Nombre del producto *</label>
                                <input
                                    type="text"
                                    placeholder="Ej. Laptop Dell"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                />
                            </div>

                            <div className="input-group">
                                <label>Precio ($) *</label>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    value={precio}
                                    onChange={(e) => setPrecio(e.target.value)}
                                />
                            </div>

                            <div className="input-group">
                                <label>Stock disponible *</label>
                                <input
                                    type="number"
                                    placeholder="0"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                />
                            </div>

                            <div className="input-group">
                                <label>Categoría *</label>
                                <select
                                    value={categoriaId}
                                    onChange={(e) => setCategoriaId(e.target.value)}
                                >
                                    <option value="">Seleccione...</option>
                                    {categorias.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="input-group">
                                <label>Proveedor *</label>
                                <select
                                    value={proveedorId}
                                    onChange={(e) => setProveedorId(e.target.value)}
                                >
                                    <option value="">Seleccione...</option>
                                    {proveedores.map(prov => (
                                        <option key={prov.id} value={prov.id}>{prov.nombre}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="input-group full-width">
                                <label>Descripción</label>
                                <input
                                    type="text"
                                    placeholder="Breve descripción opcional del artículo..."
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="formulario-acciones">
                            <button className="btn-guardar" onClick={guardarProducto}>
                                {idEditar ? <FaSync /> : <FaPlus />}
                                {idEditar ? " Actualizar Cambios" : " Guardar Producto"}
                            </button>
                        </div>

                    </div>
                </div>
            )}

            {/* TABLA PRINCIPAL */}
            <div className="tabla-contenedor">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Descripción</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="tabla-vacia">No hay productos registrados en PostgreSQL.</td>
                            </tr>
                        ) : (
                            productos.map((producto) => (
                                <tr key={producto.id}>
                                    <td><span className="badge-id">#{producto.id}</span></td>
                                    <td className="text-bold">{producto.nombre}</td>
                                    <td className="text-precio">${producto.precio}</td>
                                    <td>
                                        <span className={`badge-stock ${producto.stock < 5 ? 'stock-bajo' : 'stock-ok'}`}>
                                            {producto.stock} uds
                                        </span>
                                    </td>
                                    <td className="text-mutado">{producto.descripcion || "Sin descripción"}</td>
                                    <td>
                                        <div className="tabla-acciones">
                                            <button className="btn-accion btn-editar" onClick={() => editarProducto(producto)} title="Editar">
                                                <FaEdit />
                                            </button>
                                            <button className="btn-accion btn-eliminar" onClick={() => borrarProducto(producto.id)} title="Eliminar">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Productos;