import { useEffect, useState } from "react";
import { FaTrash, FaPlus, FaTimes, FaReceipt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Importación de servicios de Axios
import { obtenerVentas, crearVenta, eliminarVenta } from "../services/ventaService";
import { obtenerProductos } from "../services/productoService";
import { obtenerUsuarios } from "../services/usuarioService";

import "../App.css";

function Ventas() {
  // --- ESTADOS DE CATÁLOGOS ---
  const [ventas, setVentas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  // Estados del formulario modal
  const [clienteNombre, setClienteNombre] = useState("");
  const [clienteEmail, setClienteEmail] = useState("");
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

  // Carga paralela eficiente para alimentar las listas desplegables
  const cargarTodoElEcosistema = async () => {
    try {
      const [resVentas, resProductos, resUsuarios] = await Promise.all([
        obtenerVentas(),
        obtenerProductos(),
        obtenerUsuarios()
      ]);
      setVentas(resVentas);
      setProductos(resProductos);
      setUsuarios(resUsuarios);
    } catch (error) {
      console.error(error);
      toast.error("Error al sincronizar el módulo de ventas con PostgreSQL");
    }
  };

  // --- MANEJADOR DE CAMBIO DE PRODUCTO ---
  // Rellena automáticamente el precio base del producto seleccionado
  const manejarCambioProducto = (idSeleccionado) => {
    setProductoId(idSeleccionado);
    if (idSeleccionado) {
      const prodEncontrado = productos.find((p) => p.id === Number(idSeleccionado));
      if (prodEncontrado) {
        setPrecioUnitario(prodEncontrado.precio); // Auto-completado de precio
      }
    } else {
      setPrecioUnitario("");
    }
  };

  const guardarVenta = async () => {
    if (!clienteNombre || !clienteEmail || !usuarioId || !productoId || !cantidad || !precioUnitario) {
      toast.warning("Por favor, llena todos los campos obligatorios (*)");
      return;
    }

    const nuevaVenta = {
      clienteNombre: clienteNombre,
      clienteEmail: clienteEmail,
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
      await crearVenta(nuevaVenta);
      toast.success("¡Venta registrada y stock descontado!");
      limpiarFormulario();
      setMostrarFormulario(false);
      cargarTodoElEcosistema(); // Recarga todo para refrescar la tabla
    } catch (error) {
      console.error(error);
      toast.error("Error al registrar la venta. Verifica el stock disponible en almacén.");
    }
  };

  const borrarVenta = async (id) => {
    const confirmar = window.confirm("¿Está seguro de eliminar este registro de venta? Esto no repondrá el stock automáticamente.");
    if (!confirmar) return;

    try {
      await eliminarVenta(id);
      toast.dark("Registro de venta eliminado 🗑️");
      cargarTodoElEcosistema();
    } catch (error) {
      console.error(error);
      toast.error("No se pudo eliminar la venta");
    }
  };

  const limpiarFormulario = () => {
    setClienteNombre("");
    setClienteEmail("");
    setUsuarioId("");
    setProductoId("");
    setCantidad("");
    setPrecioUnitario("");
  };

  // --- MÉTODOS DE RESOLUCIÓN DE NOMBRES EN TABLA ---
  const obtenerNombreVendedor = (id) => {
    const user = usuarios.find((u) => u.id === id);
    return user ? user.username : <span className="text-mutado">ID: {id}</span>;
  };

  return (
    <div className="container animate-fade-in">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Encabezado Superior */}
      <div className="header-seccion">
        <h2>Gestión de Ventas</h2>
        <button className="btn-principal" onClick={() => setMostrarFormulario(true)}>
          <FaPlus /> Nueva Venta
        </button>
      </div>

      {/* MODAL FLOTANTE */}
      {mostrarFormulario && (
        <div className="modal-backdrop" onClick={() => { limpiarFormulario(); setMostrarFormulario(false); }}>
          <div className="card-formulario modal-content" onClick={(e) => e.stopPropagation()}>

            <div className="modal-header">
              <h3><FaReceipt /> Registrar Nueva Venta</h3>
              <button className="btn-cerrar-modal" onClick={() => { limpiarFormulario(); setMostrarFormulario(false); }}>
                <FaTimes />
              </button>
            </div>

            <div className="formulario-grid">
              <div className="input-group">
                <label>Nombre del Cliente *</label>
                <input
                  type="text"
                  placeholder="Ej. Juan Pérez"
                  value={clienteNombre}
                  onChange={(e) => setClienteNombre(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Email del Cliente *</label>
                <input
                  type="email"
                  placeholder="juan@example.com"
                  value={clienteEmail}
                  onChange={(e) => setClienteEmail(e.target.value)}
                />
              </div>

              {/* LISTA DESPLEGABLE DE VENDEDORES (USUARIOS) */}
              <div className="input-group">
                <label>Vendedor Asignado *</label>
                <select value={usuarioId} onChange={(e) => setUsuarioId(e.target.value)}>
                  <option value="">Selecciona un vendedor...</option>
                  {usuarios.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.username} ({user.role})
                    </option>
                  ))}
                </select>
              </div>

              {/* LISTA DESPLEGABLE DE PRODUCTOS */}
              <div className="input-group">
                <label>Producto a Vender *</label>
                <select value={productoId} onChange={(e) => manejarCambioProducto(e.target.value)}>
                  <option value="">Selecciona un producto...</option>
                  {productos.map((prod) => (
                    <option key={prod.id} value={prod.id} disabled={prod.stock <= 0}>
                      {prod.nombre} {prod.stock <= 0 ? " (SIN STOCK)" : ` ($${prod.precio})`}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <label>Cantidad *</label>
                <input
                  type="number"
                  min="1"
                  placeholder="0"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Precio Final de Venta ($) *</label>
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
              <button className="btn-guardar" onClick={guardarVenta}>
                <FaPlus /> Procesar Venta
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
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Total Facturado</th>
              <th>Vendedor</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventas.length === 0 ? (
              <tr>
                <td colSpan="6" className="tabla-vacia">No hay ventas registradas en PostgreSQL.</td>
              </tr>
            ) : (
              ventas.map((venta) => (
                <tr key={venta.id}>
                  <td><span className="badge-id">#{venta.id}</span></td>
                  <td>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span className="text-bold">{venta.clienteNombre || "Cliente General"}</span>
                      <span style={{ fontSize: "0.75rem", color: "#64748b" }}>{venta.clienteEmail || "N/A"}</span>
                    </div>
                  </td>
                  <td className="text-mutated">
                    {venta.fechaVenta ? new Date(venta.fechaVenta).toLocaleDateString() : "No disponible"}
                  </td>
                  <td className="text-bold" style={{ color: "#10b981" }}>
                    ${venta.montoTotal ? venta.montoTotal.toFixed(2) : "0.00"}
                  </td>
                  {/* Se muestra el nombre real del vendedor en vez del ID */}
                  <td><span className="badge-id" style={{ background: '#f1f5f9', color: '#475569' }}>{obtenerNombreVendedor(venta.usuarioId)}</span></td>
                  <td>
                    <div className="tabla-acciones">
                      <button className="btn-accion btn-eliminar" onClick={() => borrarVenta(venta.id)} title="Eliminar">
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

export default Ventas;