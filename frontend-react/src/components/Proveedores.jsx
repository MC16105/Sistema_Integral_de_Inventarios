import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaPlus, FaSync, FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  obtenerProveedores,
  crearProveedor,
  actualizarProveedor,
  eliminarProveedor
} from "../services/proveedorService";
import "../App.css";

function Proveedores() {
  // --- ESTADOS ---
  const [proveedores, setProveedores] = useState([]);

  // Estados del formulario
  const [idEditar, setIdEditar] = useState(null);
  const [nombre, setNombre] = useState("");
  const [contacto, setContacto] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");

  // Estado de control de UI (Modal flotante)
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // --- EFECTOS ---
  useEffect(() => {
    cargarProveedores();
  }, []);

  // --- FUNCIONES DE CARGA ---
  const cargarProveedores = async () => {
    try {
      const data = await obtenerProveedores();
      setProveedores(data);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar los proveedores de la base de datos ❌");
    }
  };

  // --- OPERACIONES CRUD ---
  const guardarProveedor = async () => {
    // Validación de campos obligatorios (Nombre es esencial)
    if (!nombre || !contacto || !telefono) {
      toast.warning("Por favor, llena los campos obligatorios (*)");
      return;
    }

    const proveedor = {
      nombre,
      contacto,
      direccion,
      telefono,
      email
    };

    try {
      if (idEditar) {
        await actualizarProveedor(idEditar, proveedor);
        toast.success("¡Proveedor actualizado correctamente! 🚀");
        setIdEditar(null);
      } else {
        await crearProveedor(proveedor);
        toast.success("¡Proveedor registrado con éxito! 🎉");
      }
      limpiarFormulario();
      setMostrarFormulario(false); // Cierra el modal flotante
      cargarProveedores(); // Recarga la tabla con los datos de PostgreSQL
    } catch (error) {
      console.error(error);
      toast.error("Hubo un error al procesar la solicitud en el servidor");
    }
  };

  const editarProveedor = (proveedor) => {
    setIdEditar(proveedor.id);
    setNombre(proveedor.nombre);
    setContacto(proveedor.contacto || "");
    setDireccion(proveedor.direccion || "");
    setTelefono(proveedor.telefono || "");
    setEmail(proveedor.email || "");
    setMostrarFormulario(true); // Abre el modal automáticamente
  };

  const borrarProveedor = async (id) => {
    const confirmar = window.confirm("¿Está seguro de eliminar este proveedor?");
    if (!confirmar) return;

    try {
      await eliminarProveedor(id);
      toast.dark("Proveedor eliminado correctamente 🗑️");
      cargarProveedores();
    } catch (error) {
      console.error(error);
      toast.error("No se pudo eliminar el proveedor. Verifique si tiene productos asociados.");
    }
  };

  const limpiarFormulario = () => {
    setNombre("");
    setContacto("");
    setDireccion("");
    setTelefono("");
    setEmail("");
    setIdEditar(null);
  };

  return (
    <div className="container animate-fade-in">
      {/* Contenedor de Alertas Flotantes */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Encabezado Superior */}
      <div className="header-seccion">
        <h2>Gestión de Proveedores</h2>
        <button
          className="btn-principal"
          onClick={() => setMostrarFormulario(true)}
        >
          <FaPlus /> Nuevo Proveedor
        </button>
      </div>

      {/* MODAL FLOTANTE (Formulario) */}
      {mostrarFormulario && (
        <div className="modal-backdrop" onClick={() => { limpiarFormulario(); setMostrarFormulario(false); }}>
          <div className="card-formulario modal-content" onClick={(e) => e.stopPropagation()}>

            <div className="modal-header">
              <h3>{idEditar ? "Editar Proveedor" : "Registrar Nuevo Proveedor"}</h3>
              <button className="btn-cerrar-modal" onClick={() => { limpiarFormulario(); setMostrarFormulario(false); }}>
                <FaTimes />
              </button>
            </div>

            <div className="formulario-grid">
              <div className="input-group">
                <label>Nombre de la Empresa *</label>
                <input
                  type="text"
                  placeholder="Ej. Distribuidora Tech"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Persona de Contacto *</label>
                <input
                  type="text"
                  placeholder="Ej. Juan Pérez"
                  value={contacto}
                  onChange={(e) => setContacto(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Teléfono *</label>
                <input
                  type="text"
                  placeholder="Ej. +503 1234-5678"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Correo Electrónico</label>
                <input
                  type="email"
                  placeholder="ejemplo@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="input-group full-width">
                <label>Dirección Física</label>
                <input
                  type="text"
                  placeholder="Dirección completa del proveedor..."
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                />
              </div>
            </div>

            <div className="formulario-acciones">
              <button className="btn-guardar" onClick={guardarProveedor}>
                {idEditar ? <FaSync /> : <FaPlus />}
                {idEditar ? " Actualizar Cambios" : " Guardar Proveedor"}
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
              <th>Contacto</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Dirección</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.length === 0 ? (
              <tr>
                <td colSpan="7" className="tabla-vacia">No hay proveedores registrados en PostgreSQL.</td>
              </tr>
            ) : (
              proveedores.map((prov) => (
                <tr key={prov.id}>
                  <td><span className="badge-id">#{prov.id}</span></td>
                  <td className="text-bold">{prov.nombre}</td>
                  <td>{prov.contacto}</td>
                  <td>{prov.telefono}</td>
                  <td className="text-mutado">{prov.email || "Sin correo"}</td>
                  <td className="text-mutado">{prov.direccion || "Sin dirección"}</td>
                  <td>
                    <div className="tabla-acciones">
                      <button className="btn-accion btn-editar" onClick={() => editarProveedor(prov)} title="Editar">
                        <FaEdit />
                      </button>
                      <button className="btn-accion btn-eliminar" onClick={() => borrarProveedor(prov.id)} title="Eliminar">
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

export default Proveedores;