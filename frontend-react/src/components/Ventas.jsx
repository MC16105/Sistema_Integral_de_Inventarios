import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  obtenerVentas,
  crearVenta,
  eliminarVenta
} from "../services/ventaService";

function Ventas() {

  const [ventas, setVentas] = useState([]);

  const [clienteNombre, setClienteNombre] = useState("");
  const [clienteEmail, setClienteEmail] = useState("");
  const [usuarioId, setUsuarioId] = useState("");
  const [productoId, setProductoId] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [precioUnitario, setPrecioUnitario] = useState("");

  useEffect(() => {
    cargarVentas();
  }, []);

  const cargarVentas = async () => {
    try {
      const data = await obtenerVentas();
      setVentas(data);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar ventas");
    }
  };

  const guardarVenta = async () => {
    try {

      const venta = {
        clienteNombre,
        clienteEmail,
        usuarioId: Number(usuarioId),
        detalles: [
          {
            productoId: Number(productoId),
            cantidad: Number(cantidad),
            precioUnitario: Number(precioUnitario)
          }
        ]
      };

      await crearVenta(venta);

      toast.success("Venta registrada");

      setClienteNombre("");
      setClienteEmail("");
      setUsuarioId("");
      setProductoId("");
      setCantidad("");
      setPrecioUnitario("");

      cargarVentas();

    } catch (error) {
      console.error(error);
      toast.error("Error al registrar venta");
    }
  };

  const borrarVenta = async (id) => {
    try {
      await eliminarVenta(id);
      toast.success("Venta eliminada");
      cargarVentas();
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar venta");
    }
  };

  return (
    <div>

      <ToastContainer />

      <h2>Gestión de Ventas</h2>

      <div style={{ marginBottom: "20px" }}>

        <input
          type="text"
          placeholder="Nombre Cliente"
          value={clienteNombre}
          onChange={(e) => setClienteNombre(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email Cliente"
          value={clienteEmail}
          onChange={(e) => setClienteEmail(e.target.value)}
        />

        <input
          type="number"
          placeholder="Usuario ID"
          value={usuarioId}
          onChange={(e) => setUsuarioId(e.target.value)}
        />

        <input
          type="number"
          placeholder="Producto ID"
          value={productoId}
          onChange={(e) => setProductoId(e.target.value)}
        />

        <input
          type="number"
          placeholder="Cantidad"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />

        <input
          type="number"
          placeholder="Precio Unitario"
          value={precioUnitario}
          onChange={(e) => setPrecioUnitario(e.target.value)}
        />

        <button onClick={guardarVenta}>
          Guardar Venta
        </button>

      </div>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Cliente</th>
            <th>Email</th>
            <th>Usuario</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>

          {ventas.length === 0 ? (
            <tr>
              <td colSpan="7">
                No hay ventas registradas
              </td>
            </tr>
          ) : (
            ventas.map((venta) => (
              <tr key={venta.id}>
                <td>{venta.id}</td>
                <td>{venta.fechaVenta}</td>
                <td>${venta.montoTotal}</td>
                <td>{venta.clienteNombre}</td>
                <td>{venta.clienteEmail}</td>
                <td>{venta.usuarioId}</td>

                <td>
                  <button onClick={() => borrarVenta(venta.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}

        </tbody>
      </table>

    </div>
  );
}

export default Ventas;