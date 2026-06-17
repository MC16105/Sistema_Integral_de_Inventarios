import { useEffect, useState } from "react";
import { FaTrash, FaPlus, FaTimes, FaShoppingCart } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Importación de servicios de Axios
import { obtenerCompras, crearCompra, eliminarCompra } from "../services/compraService";
import { obtenerProveedores } from "../services/proveedorService";
import { obtenerUsuarios } from "../services/usuarioService";
import { obtenerProductos } from "../services/productoService";

import "../App.css";

function Compras() {
  // --- ESTADOS DE CATÁLOGOS ---
  const [compras, setCompras] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [productos, setProductos] = useState([]);

  // Estados del formulario modal (Cabecera y Detalle integrado)
  const [proveedorId, setProveedorId] = useState("");
  const [usuarioId, setUsuarioId] = useState("");
  const [productoId, setProductoId] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [precioUnitario, setPrecioUnitario] = useState("");

  // Estado para controlar la UI del modal
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // --- EFECTOS ---
  useEffect(() => {
    cargarTodoElEcosistema();
  }, []);

  // Carga simultánea de todas las dependencias desde PostgreSQL
  const cargarTodoElEcosistema = async () => {
    try {
      const [resCompras, resProveedores, resUsuarios, resProductos] = await Promise.all([
        obtenerCompras(),
        obtenerProveedores(),
        obtenerUsuarios(),
        obtenerProductos()
      ]);
      setCompras(resCompras);
      setProveedores(resProveedores);
      setUsuarios(resUsuarios);
      setProductos(resProductos);
    } catch (error) {
      console.error(error);
      toast.error("Error al sincronizar el módulo de compras con la base de datos");
    }
  };

  const guardarCompra = async () => {
    if (!proveedorId || !usuarioId || !productoId || !cantidad || !precioUnitario) {
      toast.warning("Por favor, llena todos los campos obligatorios (*)");
      return;
    }

    // Estructura para JPA en el Backend
    const nuevaCompra = {
      proveedorId: parseInt(proveedorId),
      usuarioId: parseInt(usuarioId),
      montoTotal: parseInt(cantidad) * parseFloat(precioUnitario),
      detalles: [
        {
          productoId: parseInt(productoId),
          cantidad: parseInt(cantidad),
          precioUnitario: parseFloat(precioUnitario)
        }
      ]
    };

    try {
      await crearCompra(nuevaCompra);
      toast.success("¡Compra registrada y stock aumentado! 📦🎉");
      limpiarFormulario();
      setMostrarFormulario(false);
      cargarTodoElEcosistema(); // Recarga general para refrescar la tabla
    } catch (error) {
      console.error(error);
      toast.error("Error al registrar la compra en el servidor. Verifica los datos.");
    }
  };

  const borrarCompra = async (id) => {
    const confirmar = window.confirm("¿Está seguro de eliminar este registro de compra? Esto alterará el histórico.");
    if (!confirmar) return;

    try {
      await eliminarCompra(id);
      toast.dark("Registro de compra eliminado 🗑️");
      cargarTodoElEcosistema();
    } catch (error) {
      console.error(error);
      toast.error("No se pudo eliminar la compra");
    }
  };

  const limpiarFormulario = () => {
    setProveedorId("");
    setUsuarioId("");
    setProductoId("");
    setCantidad("");
    setPrecioUnitario("");
  };

  // --- MÉTODOS DE RESOLUCIÓN DE NOMBRES EN TABLA ---
  const obtenerNombreProveedor = (id) => {
    const prov = proveedores.find((p) => p.id === id);
    return prov ? prov.nombre : <span className="text-mutado">ID: {id}</span>;
  };

  const obtenerNombreUsuario = (id) => {
    const user = usuarios.find((u) => u.id === id);
    return user ? user.username : <span className="text-mutado">ID: {id}</span>;
  };

  return (
    <div className="container animate-fade-in">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Encabezado Superior */}
      <div className="header-seccion">
        <h2>Gestión de Compras (Abastecimiento)</h2>
        <button className="btn-principal" onClick={() => setMostrarFormulario(true)}>
          <FaPlus /> Nueva Compra
        </button>
      </div>

      {/* MODAL FLOTANTE */}
      {mostrarFormulario && (
        <div className="modal-backdrop" onClick={() => { limpiarFormulario(); setMostrarFormulario(false); }}>
          <div className="card-formulario modal-content" onClick={(e) => e.stopPropagation()}>

            <div className="modal-header">
              <h3><FaShoppingCart /> Registrar Nueva Compra</h3>
              <button className="btn-cerrar-modal" onClick={() => { limpiarFormulario(); setMostrarFormulario(false); }}>
                <FaTimes />
              </button>
            </div>

            <div className="formulario-grid">
              {/* SELECT DINÁMICO DE PROVEEDORES */}
              <div className="input-group">
                <label>Proveedor Solicitado *</label>
                <select value={proveedorId} onChange={(e) => setProveedorId(e.target.value)}>
                  <option value="">Selecciona un proveedor...</option>
                  {proveedores.map((prov) => (
                    <option key={prov.id} value={prov.id}>
                      {prov.nombre}
                    </option>
                  ))}
                </select>
              </div>

              {/* SELECT DINÁMICO DE USUARIOS (COMPRADOR / ENCARGADO) */}
              <div className="input-group">
                <label>Encargado de Recepción *</label>
                <select value={usuarioId} onChange={(e) => setUsuarioId(e.target.value)}>
                  <option value="">Selecciona el usuario...</option>
                  {usuarios.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.username} ({user.role})
                    </option>
                  ))}
                </select>
              </div>

              {/* SELECT DINÁMICO DE PRODUCTOS */}
              <div className="input-group full-width">
                <label>Producto a Abastecer *</label>
                <select value={productoId} onChange={(e) => setProductoId(e.target.value)}>
                  <option value="">Selecciona el artículo...</option>
                  {productos.map((prod) => (
                    <option key={prod.id} value={prod.id}>
                      {prod.nombre} — Stock actual: {prod.stock || 0} unids
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <label>Cantidad Adquirida *</label>
                <input
                  type="number"
                  min="1"
                  placeholder="0"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Costo Unitario de Compra ($) *</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={precioUnitario}
                  onChange={(e) => setPrecioUnitario(e.target.value)}
                />
              </div>
            </div>

            <div className="formulario-acciones">
              <button className="btn-guardar" onClick={guardarCompra}>
                <FaPlus /> Procesar Entrada
              </button>
            </div>

          </div>
        </div>
      )}

      {/* TABLA DE RESULTADOS */}
      <div className="tabla-contenedor">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha de Ingreso</th>
              <th>Total de Factura</th>
              <th>Proveedor</th>
              <th>Operador</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {compras.length === 0 ? (
              <tr>
                <td colSpan="6" className="tabla-vacia">No hay registros de compras en PostgreSQL.</td>
              </tr>
            ) : (
              compras.map((compra) => (
                <tr key={compra.id}>
                  <td><span className="badge-id">#{compra.id}</span></td>
                  <td className="text-mutated">
                    {compra.fechaCompra ? new Date(compra.fechaCompra).toLocaleDateString() : "No disponible"}
                  </td>
                  <td className="text-bold" style={{ color: "#2563eb" }}>
                    ${compra.montoTotal ? compra.montoTotal.toFixed(2) : "0.00"}
                  </td>
                  {/* Resolución dinámica de IDs a Nombres en la tabla */}
                  <td className="text-bold">{obtenerNombreProveedor(compra.proveedorId)}</td>
                  <td><span className="badge-id" style={{ background: '#f1f5f9', color: '#475569' }}>{obtenerNombreUsuario(compra.usuarioId)}</span></td>
                  <td>
                    <div className="tabla-acciones">
                      <button className="btn-accion btn-eliminar" onClick={() => borrarCompra(compra.id)} title="Eliminar">
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

export default Compras;