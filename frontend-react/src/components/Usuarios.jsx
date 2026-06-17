import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaPlus, FaSync, FaTimes, FaUserShield } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
    obtenerUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
} from "../services/usuarioService";
import "../App.css";

function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);

    // Estados del formulario
    const [idEditar, setIdEditar] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const cargarUsuarios = async () => {
        try {
            const data = await obtenerUsuarios();
            setUsuarios(data);
        } catch (error) {
            console.error(error);
            toast.error("Error al cargar los usuarios del sistema");
        }
    };

    const guardarUsuario = async () => {
        if (!username || !email || (!idEditar && !password) || !role) {
            toast.warning("Por favor, llena los campos obligatorios (*)");
            return;
        }

        const usuario = {
            username,
            email,
            role,
            // Si estamos editando y dejan la clave vacía, manejamos que no se sobrescriba en el backend
            ...(password && { password })
        };

        try {
            if (idEditar) {
                await actualizarUsuario(idEditar, usuario);
                toast.success("¡Usuario actualizado correctamente! 🚀");
                setIdEditar(null);
            } else {
                await crearUsuario(usuario);
                toast.success("¡Usuario registrado con éxito! 🎉");
            }
            limpiarFormulario();
            setMostrarFormulario(false);
            cargarUsuarios();
        } catch (error) {
            console.error(error);
            toast.error("Error al guardar el usuario en el servidor");
        }
    };

    const editarUsuario = (user) => {
        setIdEditar(user.id);
        setUsername(user.username);
        setEmail(user.email);
        setRole(user.role);
        setPassword(""); // Se deja vacío por seguridad al editar
        setMostrarFormulario(true);
    };

    const borrarUsuario = async (id) => {
        const confirmar = window.confirm("¿Está seguro de eliminar este usuario del sistema?");
        if (!confirmar) return;

        try {
            await eliminarUsuario(id);
            toast.dark("Usuario eliminado del sistema 🗑️");
            cargarUsuarios();
        } catch (error) {
            console.error(error);
            toast.error("No se pudo eliminar el usuario");
        }
    };

    const limpiarFormulario = () => {
        setUsername("");
        setEmail("");
        setPassword("");
        setRole("");
        setIdEditar(null);
    };

    return (
        <div className="container animate-fade-in">
            <ToastContainer position="top-right" autoClose={3000} />

            <div className="header-seccion">
                <h2>Gestión de Usuarios</h2>
                <button className="btn-principal" onClick={() => setMostrarFormulario(true)}>
                    <FaPlus /> Nuevo Usuario
                </button>
            </div>

            {mostrarFormulario && (
                <div className="modal-backdrop" onClick={() => { limpiarFormulario(); setMostrarFormulario(false); }}>
                    <div className="card-formulario modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3><FaUserShield /> {idEditar ? "Editar Personal" : "Registrar Nuevo Usuario"}</h3>
                            <button className="btn-cerrar-modal" onClick={() => { limpiarFormulario(); setMostrarFormulario(false); }}>
                                <FaTimes />
                            </button>
                        </div>

                        <div className="formulario-grid">
                            <div className="input-group">
                                <label>Nombre de Usuario *</label>
                                <input
                                    type="text"
                                    placeholder="Ej. jorge_dev"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            <div className="input-group">
                                <label>Email Corporativo *</label>
                                <input
                                    type="email"
                                    placeholder="correo@empresa.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="input-group">
                                <label>{idEditar ? "Nueva Contraseña (Opcional)" : "Contraseña *"}</label>
                                <input
                                    type="password"
                                    placeholder={idEditar ? "Dejar en blanco para no cambiar" : "••••••••"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="input-group">
                                <label>Rol de Sistema *</label>
                                <select value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value="">Seleccione...</option>
                                    <option value="ADMIN">Administrador</option>
                                    <option value="ALMACEN">Encargado de Almacén</option>
                                    <option value="VENDEDOR">Vendedor</option>
                                </select>
                            </div>
                        </div>

                        <div className="formulario-acciones">
                            <button className="btn-guardar" onClick={guardarUsuario}>
                                {idEditar ? <FaSync /> : <FaPlus />}
                                {idEditar ? " Actualizar Permisos" : " Guardar Usuario"}
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
                            <th>Username</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="tabla-vacia">No hay usuarios del sistema registrados.</td>
                            </tr>
                        ) : (
                            usuarios.map((user) => (
                                <tr key={user.id}>
                                    <td><span className="badge-id">#{user.id}</span></td>
                                    <td className="text-bold">{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span className={`badge-stock ${user.role === 'ADMIN' ? 'stock-ok' : 'stock-bajo'}`} style={{ textTransform: 'lowercase' }}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="tabla-acciones">
                                            <button className="btn-accion btn-editar" onClick={() => editarUsuario(user)} title="Editar"><FaEdit /></button>
                                            <button className="btn-accion btn-eliminar" onClick={() => borrarUsuario(user.id)} title="Eliminar"><FaTrash /></button>
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

export default Usuarios;