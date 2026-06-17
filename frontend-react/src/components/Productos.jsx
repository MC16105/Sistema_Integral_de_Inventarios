import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaPlus, FaSync, FaTimes, FaBoxOpen } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Importación de servicios de Axios
import { obtenerProductos, crearProducto, actualizarProducto, eliminarProducto } from "../services/productoService";
import { obtenerCategorias } from "../services/categoriaService";
import { obtenerProveedores } from "../services/proveedorService";
import { obtenerVentas } from "../services/ventaService";
import { obtenerCompras } from "../services/compraService";
import { obtenerInventarios } from "../services/inventarioService";

import "../App.css";

function Productos() {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [proveedores, setProveedores] = useState([]);

    // Estados para almacenar el histórico y verificar relaciones en memoria
    const [ventas, setVentas] = useState([]);
    const [compras, setCompras] = useState([]);
    const [inventarios, setInventarios] = useState([]);

    // Estados del Formulario (Modales)
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [idEditar, setIdEditar] = useState(null);

    // Atributos completos del modelo Producto
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [categoriaId, setCategoriaId] = useState("");
    const [proveedorId, setProveedorId] = useState("");

    // Carga inicial de todo el ecosistema de datos
    useEffect(() => {
        cargarTodo();
    }, []);

    const cargarTodo = async () => {
        try {
            // Cargamos absolutamente todos los catálogos en paralelo desde PostgreSQL
            const [resProductos, resCategorias, resProveedores, resVentas, resCompras, resInventarios] = await Promise.all([
                obtenerProductos(),
                obtenerCategorias(),
                obtenerProveedores(),
                obtenerVentas(),
                obtenerCompras(),
                obtenerInventarios()
            ]);

            setProductos(resProductos);
            setCategorias(resCategorias);
            setProveedores(resProveedores);
            setVentas(resVentas);
            setCompras(resCompras);
            setInventarios(resInventarios);
        } catch (error) {
            console.error(error);
            toast.error("Error al sincronizar datos con PostgreSQL");
        }
    };

    const guardarProducto = async () => {
        if (!nombre || !precio || !stock || !categoriaId || !proveedorId) {
            toast.warning("Todos los campos con (*) son obligatorios");
            return;
        }

        const productoPayload = {
            nombre,
            precio: parseFloat(precio),
            stock: parseInt(stock),
            descripcion,
            categoriaId: Number(categoriaId),
            proveedorId: Number(proveedorId)
        };

        try {
            if (idEditar) {
                await actualizarProducto(idEditar, productoPayload);
                toast.success("¡Producto actualizado con éxito! 🚀");
                setIdEditar(null);
            } else {
                await crearProducto(productoPayload);
                toast.success("¡Producto registrado en el sistema! 🎉");
            }
            limpiarFormulario();
            setMostrarFormulario(false);
            cargarTodo(); // Recarga todo el ecosistema de inmediato
        } catch (error) {
            console.error(error);
            toast.error("Error al guardar el producto del servidor");
        }
    };

    const iniciarEdicion = (prod) => {
        setIdEditar(prod.id);
        setNombre(prod.nombre);
        setPrecio(prod.precio);
        setStock(prod.stock || "");
        setDescripcion(prod.descripcion || "");
        setCategoriaId(prod.categoriaId || "");
        setProveedorId(prod.proveedorId || "");
        setMostrarFormulario(true);
    };

    const deshabilitarProducto = async (id) => {
        if (!window.confirm("¿Deseas eliminar este producto del catálogo?")) return;

        try {
            await eliminarProducto(id);
            toast.success("Producto eliminado de la base de datos 🗑️", {
                style: { background: "#1e293b", color: "#f8fafc" },
                icon: "🗑️"
            });
            cargarTodo();
        } catch (error) {
            console.error(error);

            if (error.response?.status === 409 || error.response?.status === 500) {
                toast.error(
                    "ACCIÓN BLOQUEADA POR SEGURIDAD:\nEste producto no se puede eliminar porque cuenta con transacciones activas en Inventario, Compras o Ventas.",
                    {
                        position: "top-right",
                        autoClose: 5500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        style: {
                            background: "#7f1d1d",
                            color: "#fef2f2",
                            borderRadius: "8px",
                            whiteSpace: "pre-line",
                            fontSize: "0.9rem",
                            fontWeight: "500"
                        }
                    }
                );
            } else {
                toast.error("No se pudo procesar la solicitud en el servidor.", {
                    style: { background: "#b91c1c", color: "#ffffff" }
                });
            }
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

    // --- MÉTODOS DE CRUCE DINÁMICO ---
    const obtenerNombreCategoria = (id) => {
        const cat = categorias.find((c) => c.id === id);
        return cat ? cat.nombre : <span className="text-mutado">Sin categoría</span>;
    };

    const obtenerNombreProveedor = (id) => {
        const prov = proveedores.find((p) => p.id === id);
        return prov ? prov.nombre : <span className="text-mutado">Desconocido</span>;
    };

    // FUNCIÓN HELPER: Verifica si el producto tiene historial en otros módulos
    const tieneRelaciones = (productoId) => {
        const enVentas = ventas.some(v => v.detalles?.some(d => d.productoId === productoId));
        const enCompras = compras.some(c => c.detalles?.some(d => d.productoId === productoId));
        const enInventario = inventarios.some(i => i.productoId === productoId);

        return enVentas || enCompras || enInventario;
    };

    return (
        <div className="container animate-fade-in">
            <ToastContainer position="top-right" autoClose={2500} />

            <div className="header-seccion">
                <h2>Catálogo de Productos</h2>
                <button className="btn-principal" onClick={() => setMostrarFormulario(true)}>
                    <FaPlus /> Nuevo Producto
                </button>
            </div>

            {/* MODAL FORMULARIO */}
            {mostrarFormulario && (
                <div className="modal-backdrop" onClick={() => { limpiarFormulario(); setMostrarFormulario(false); }}>
                    <div className="card-formulario modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3><FaBoxOpen /> {idEditar ? "Modificar Ficha de Producto" : "Registrar Nuevo Producto"}</h3>
                            <button className="btn-cerrar-modal" onClick={() => { limpiarFormulario(); setMostrarFormulario(false); }}>
                                <FaTimes />
                            </button>
                        </div>

                        <div className="formulario-grid">
                            <div className="input-group full-width">
                                <label>Nombre del Producto *</label>
                                <input
                                    type="text"
                                    placeholder="Ej. Teclado Mecánico RGB"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                />
                            </div>

                            <div className="input-group">
                                <label>Precio Unitario ($) *</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    value={precio}
                                    onChange={(e) => setPrecio(e.target.value)}
                                />
                            </div>

                            <div className="input-group">
                                <label>Stock Inicial *</label>
                                <input
                                    type="number"
                                    placeholder="Cantidad"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                />
                            </div>

                            <div className="input-group">
                                <label>Categoría *</label>
                                <select value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)}>
                                    <option value="">Selecciona...</option>
                                    {categorias.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="input-group">
                                <label>Proveedor Primario *</label>
                                <select value={proveedorId} onChange={(e) => setProveedorId(e.target.value)}>
                                    <option value="">Selecciona...</option>
                                    {proveedores.map((prov) => (
                                        <option key={prov.id} value={prov.id}>
                                            {prov.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="input-group full-width">
                                <label>Descripción del Producto</label>
                                <input
                                    type="text"
                                    placeholder="Detalles del artículo, marca, modelo..."
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="formulario-acciones">
                            <button className="btn-guardar" onClick={guardarProducto}>
                                {idEditar ? <FaSync /> : <FaPlus />}
                                {idEditar ? " Guardar Cambios" : " Dar de Alta"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* TABLA DE PRODUCTOS */}
            <div className="tabla-contenedor">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Producto</th>
                            <th>Descripción</th>
                            <th>Categoría</th>
                            <th>Proveedor</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="tabla-vacia">No hay productos en el catálogo de PostgreSQL.</td>
                            </tr>
                        ) : (
                            productos.map((prod) => {
                                // Ejecuta la comprobación por cada producto individual
                                const bloqueado = tieneRelaciones(prod.id);

                                return (
                                    <tr key={prod.id}>
                                        <td><span className="badge-id">#{prod.id}</span></td>
                                        <td className="text-bold">{prod.nombre}</td>
                                        <td className="text-mutado">{prod.descripcion || "Sin descripción"}</td>

                                        {/* Cruce dinámico de datos */}
                                        <td><span className="badge-id" style={{ background: '#f1f5f9', color: '#334155' }}>{obtenerNombreCategoria(prod.categoriaId)}</span></td>
                                        <td>{obtenerNombreProveedor(prod.proveedorId)}</td>

                                        <td className="text-precio">${prod.precio?.toFixed(2)}</td>
                                        <td>
                                            <span className={`badge-stock ${prod.stock < 10 ? 'stock-bajo' : 'stock-ok'}`}>
                                                {prod.stock} unids
                                            </span>
                                        </td>
                                        <td>
                                            <div className="tabla-acciones">
                                                <button className="btn-accion btn-editar" onClick={() => iniciarEdicion(prod)} title="Editar"><FaEdit /></button>

                                                {/* Botón de eliminación inteligente */}
                                                <button
                                                    className={`btn-accion btn-eliminar`}
                                                    onClick={() => !bloqueado && deshabilitarProducto(prod.id)}
                                                    title={bloqueado ? "Bloqueado: Este artículo cuenta con registros asociados" : "Eliminar"}
                                                    style={bloqueado ? { opacity: 0.35, cursor: "not-allowed", backgroundColor: "#64748b" } : {}}
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Productos;