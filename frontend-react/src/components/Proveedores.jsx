import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  obtenerProveedores,
  crearProveedor,
  actualizarProveedor,
  eliminarProveedor
} from "../services/proveedorService";

function Proveedores() {
  // --- ESTADOS ---
  // Estado para almacenar la lista que viene de la base de datos
  const [proveedores, setProveedores] = useState([]);

  // Estados del formulario
  const [idEditar, setIdEditar] = useState(null);
  const [nombre, setNombre] = useState("");
  const [contacto, setContacto] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    cargarProveedores();
  }, []);

  const cargarProveedores = async () => {
    try {
      const data = await obtenerProveedores();
      setProveedores(data);
    } catch (error) {
      toast.error("Error al conectar con el servidor backend");
    }
  };

  return (
    <div>
      {/* Contenedor para las notificaciones visuales */}
      <ToastContainer />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Gestión de Proveedores</h2>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FaPlus /> Nuevo Proveedor
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>NOMBRE</th>
              <th>CONTACTO</th>
              <th>DIRECCIÓN</th>
              <th>TELÉFONO</th>
              <th>EMAIL</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>
                  No hay proveedores registrados.
                </td>
              </tr>
            ) : (
              proveedores.map((prov) => (
                <tr key={prov.id}>
                  <td>{prov.id}</td>
                  <td>{prov.nombre}</td>
                  <td>{prov.contacto}</td>
                  <td>{prov.direccion}</td>
                  <td>{prov.telefono}</td>
                  <td>{prov.email}</td>
                  <td>
                    <button className="btn-edit" style={{ marginRight: '5px' }}>
                      <FaEdit />
                    </button>
                    <button className="btn-delete">
                      <FaTrash />
                    </button>
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