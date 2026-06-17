import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaPlus, FaSync, FaTimes, FaBoxes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Importación de servicios de Axios
import {obtenerInventarios, crearInventario, actualizarInventario, eliminarInventario} 
from "../services/inventarioService";
import { obtenerProductos } from "../services/productoService";

import "../App.css";

function Inventario() {
    const [inventarios, setInventarios] = useState([]);
    const [productos, setProductos] = useState([]); // Nuevo estado para el catálogo

    // Estados del formulario
    const [idEditar, setIdEditar] = useState(null);
    const [productoId, setProductoId] = useState("");
    const [stock, setStock] = useState("");
    const [ubicacion, setUbicacion] = useState("");

    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    useEffect(() => {
        cargarTodoElEcosistema();
    }, []);

    // Carga paralela para unificar el inventario con las descripciones de productos
    const cargarTodoElEcosistema = async () => {
        try {
            const [dataInventarios, dataProductos] = await Promise.all([
                obtenerInventarios(),
                obtenerProductos()
            ]);
            setInventarios(dataInventarios);
            setProductos(dataProductos);
        } catch (error) {
            console.error(error);
            toast.error("Error al cargar los datos desde PostgreSQL");
        }
    };

    const guardarInventario = async () => {
        if (!productoId || !stock || !ubicacion) {
            toast.warning("Por favor, llena todos los campos obligatorios (*)");
            return;
        }

        if (parseInt(stock) < 0) {
            toast.warning("El stock de almacén no puede ser menor a cero");
            return;
        }

        const itemInventario = {
            productoId: Number(productoId),
            stock: parseInt(stock),
            ubicacion
        };

        try {
            if (idEditar) {
                await actualizarInventario(idEditar, itemInventario);
                toast.success("¡Ubicación y stock auditados con éxito!");
                setIdEditar(null);
            } else {
                await crearInventario(itemInventario);
                toast.success("¡Control de stock registrado en góndola!");
            }
            limpiarFormulario();
            setMostrarFormulario(false);
            cargarTodoElEcosistema(); // Recarga general para refrescar la vista
        } catch (error) {
            console.error(error);
            toast.error("Error al registrar control de inventario en el servidor");
        }
    };

    const editarInventario = (inv) => {
        setIdEditar(inv.id);
        setProductoId(inv.productoId ? inv.productoId.toString() : "");
        setStock(inv.stock);
        setUbicacion(inv.ubicacion || "");
        setMostrarFormulario(true);
    };

    const borrarInventario = async (id) => {
        const confirmar = window.confirm("¿Está seguro de eliminar esta línea de stock físico? Esto puede desajustar auditorías.");
        if (!confirmar) return;

        try {
            await eliminarInventario(id);
            toast.dark("Registro de stock removido");
            cargarTodoElEcosistema();
        } catch (error) {
            console.error(error);
            toast.error("No se pudo eliminar el registro de control");
        }
    };

    const limpiarFormulario = () => {
        setProductoId("");
        setStock("");
        setUbicacion("");
        setIdEditar(null);
    };

    // --- MÉTODO DE CRUCE DINÁMICO ---
    const obtenerNombreProducto = (id) => {
        const prod = productos.find((p) => p.id === id);
        return prod ? prod.nombre : <span className="text-mutado">ID: {id}</span>;
    };

    return (
        <div className="container animate-fade-in">
            <ToastContainer position="top-right" autoClose={3000} />

            <div className="header-seccion">
                <h2>Control de Stock Físico (Inventario)</h2>
                <button className="btn-principal" onClick={() => setMostrarFormulario(true)}>
                    <FaPlus /> Auditar Stock
                </button>
            </div>

            {mostrarFormulario && (
                <div className="modal-backdrop" onClick={() => { limpiarFormulario(); setMostrarFormulario(false); }}>
                    <div className="card-formulario modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3><FaBoxes /> {idEditar ? "Modificar Auditoría de Stock" : "Asignar Stock a Ubicación"}</h3>
                            <button className="btn-cerrar-modal" onClick={() => { limpiarFormulario(); setMostrarFormulario(false); }}>
                                <FaTimes />
                            </button>
                        </div>

                        <div className="formulario-grid">
                            {/* SELECTOR DINÁMICO DE PRODUCTOS */}
                            <div className="input-group full-width">
                                <label>Producto a Auditar *</label>
                                <select
                                    value={productoId}
                                    onChange={(e) => setProductoId(e.target.value)}
                                    disabled={idEditar !== null} // Mantiene el bloqueo en edición por consistencia
                                >
                                    <option value="">Selecciona un producto del catálogo...</option>
                                    {productos.map((prod) => (
                                        <option key={prod.id} value={prod.id}>
                                            {prod.nombre} (ID: #{prod.id})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="input-group">
                                <label>Cantidad en Almacén *</label>
                                <input
                                    type="number"
                                    placeholder="Existencia real"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                />
                            </div>

                            <div className="input-group">
                                <label>Ubicación Física *</label>
                                <input
                                    type="text"
                                    placeholder="Ej. Bodega Central - Pasillo 4"
                                    value={ubicacion}
                                    onChange={(e) => setUbicacion(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="formulario-acciones">
                            <button className="btn-guardar" onClick={guardarInventario}>
                                {idEditar ? <FaSync /> : <FaPlus />}
                                {idEditar ? " Guardar Corrección" : " Registrar Inventario"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="tabla-contenedor">
                <table>
                    <thead>
                        <tr>
                            <th>ID CONTROL</th>
                            <th>PRODUCTO</th>
                            <th>Ubicación Física</th>
                            <th>Cantidad Disponible</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventarios.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="tabla-vacia">No hay controles de stock cargados desde PostgreSQL.</td>
                            </tr>
                        ) : (
                            inventarios.map((inv) => (
                                <tr key={inv.id}>
                                    <td><span className="badge-id">#{inv.id}</span></td>
                                    {/* Muestra el nombre real del producto resuelto dinámicamente */}
                                    <td className="text-bold">{obtenerNombreProducto(inv.productoId)}</td>
                                    <td className="text-mutado">{inv.ubicacion}</td>
                                    <td>
                                        <span className={`badge-stock ${inv.stock < 10 ? 'stock-bajo' : 'stock-ok'}`}>
                                            {inv.stock} unidades
                                        </span>
                                    </td>
                                    <td>
                                        <div className="tabla-acciones">
                                            <button className="btn-accion btn-editar" onClick={() => editarInventario(inv)} title="Editar"><FaEdit /></button>
                                            <button className="btn-accion btn-eliminar" onClick={() => borrarInventario(inv.id)} title="Eliminar"><FaTrash /></button>
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

export default Inventario;