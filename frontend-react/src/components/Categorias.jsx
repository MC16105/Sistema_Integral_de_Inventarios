import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaPlus, FaSync, FaTimes, FaTags } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Reemplaza por la ruta real de tu servicio de Axios cuando lo crees
import {
    obtenerCategorias,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
} from "../services/categoriaService";
import "../App.css";

function Categorias() {
    const [categorias, setCategorias] = useState([]);

    // Estados del formulario
    const [idEditar, setIdEditar] = useState(null);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    useEffect(() => {
        cargarCategorias();
    }, []);

    const cargarCategorias = async () => {
        try {
            const data = await obtenerCategorias();
            setCategorias(data);
        } catch (error) {
            console.error(error);
            toast.error("Error al cargar las categorías desde PostgreSQL");
        }
    };

    const guardarCategoria = async () => {
        if (!nombre) {
            toast.warning("El nombre de la categoría es obligatorio (*)");
            return;
        }

        const categoria = { nombre, descripcion };

        try {
            if (idEditar) {
                await actualizarCategoria(idEditar, categoria);
                toast.success("¡Categoría actualizada con éxito! 🚀");
                setIdEditar(null);
            } else {
                await crearCategoria(categoria);
                toast.success("¡Categoría registrada con éxito! 🎉");
            }
            limpiarFormulario();
            setMostrarFormulario(false);
            cargarCategorias();
        } catch (error) {
            console.error(error);
            toast.error("Error al procesar la categoría en el servidor");
        }
    };

    const editarCategoria = (cat) => {
        setIdEditar(cat.id);
        setNombre(cat.nombre);
        setDescripcion(cat.descripcion || "");
        setMostrarFormulario(true);
    };

    const borrarCategoria = async (id) => {
        const confirmar = window.confirm("¿Está seguro de eliminar esta categoría? Asegúrese de que no tenga productos asociados.");
        if (!confirmar) return;

        try {
            await eliminarCategoria(id);
            toast.dark("Categoría eliminada 🗑️");
            cargarCategorias();
        } catch (error) {
            console.error(error);
            toast.error("No se pudo eliminar la categoría");
        }
    };

    const limpiarFormulario = () => {
        setNombre("");
        setDescripcion("");
        setIdEditar(null);
    };

    return (
        <div className="container animate-fade-in">
            <ToastContainer position="top-right" autoClose={3000} />

            <div className="header-seccion">
                <h2>Gestión de Categorías</h2>
                <button className="btn-principal" onClick={() => setMostrarFormulario(true)}>
                    <FaPlus /> Nueva Categoría
                </button>
            </div>

            {mostrarFormulario && (
                <div className="modal-backdrop" onClick={() => { limpiarFormulario(); setMostrarFormulario(false); }}>
                    <div className="card-formulario modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3><FaTags /> {idEditar ? "Editar Categoría" : "Registrar Nueva Categoría"}</h3>
                            <button className="btn-cerrar-modal" onClick={() => { limpiarFormulario(); setMostrarFormulario(false); }}>
                                <FaTimes />
                            </button>
                        </div>

                        <div className="formulario-grid">
                            <div className="input-group full-width">
                                <label>Nombre de la Categoría *</label>
                                <input
                                    type="text"
                                    placeholder="Ej. Electrónica"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                />
                            </div>

                            <div className="input-group full-width">
                                <label>Descripción</label>
                                <input
                                    type="text"
                                    placeholder="Breve descripción del tipo de artículos..."
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="formulario-acciones">
                            <button className="btn-guardar" onClick={guardarCategoria}>
                                {idEditar ? <FaSync /> : <FaPlus />}
                                {idEditar ? " Actualizar Cambios" : " Guardar Categoría"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="tabla-contenedor">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorias.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="tabla-vacia">No hay categorías registradas.</td>
                            </tr>
                        ) : (
                            categorias.map((cat) => (
                                <tr key={cat.id}>
                                    <td><span className="badge-id">#{cat.id}</span></td>
                                    <td className="text-bold">{cat.nombre}</td>
                                    <td className="text-mutado">{cat.descripcion || "Sin descripción"}</td>
                                    <td>
                                        <div className="tabla-acciones">
                                            <button className="btn-accion btn-editar" onClick={() => editarCategoria(cat)} title="Editar"><FaEdit /></button>
                                            <button className="btn-accion btn-eliminar" onClick={() => borrarCategoria(cat.id)} title="Eliminar"><FaTrash /></button>
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

export default Categorias;