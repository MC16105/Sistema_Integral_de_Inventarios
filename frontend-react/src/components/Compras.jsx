import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  obtenerCompras,
  crearCompra,
  eliminarCompra
} from "../services/compraService";

function Compras() {

  const [compras, setCompras] = useState([]);

  const [proveedorId, setProveedorId] = useState("");
  const [usuarioId, setUsuarioId] = useState("");
  const [productoId, setProductoId] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [precioUnitario, setPrecioUnitario] = useState("");

  useEffect(() => {
    cargarCompras();
  }, []);

  const cargarCompras = async () => {
    try {
      const data = await obtenerCompras();
      setCompras(data);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar compras");
    }
  };

  const guardarCompra = async () => {
    try {

      const compra = {
        proveedorId: Number(proveedorId),
        usuarioId: Number(usuarioId),
        detalles: [
          {
            productoId: Number(productoId),
            cantidad: Number(cantidad),
            precioUnitario: Number(precioUnitario)
          }
        ]
      };

      await crearCompra(compra);

      toast.success("Compra registrada");

      setProveedorId("");
      setUsuarioId("");
      setProductoId("");
      setCantidad("");
      setPrecioUnitario("");

      cargarCompras();

    } catch (error) {
      console.error(error);
      toast.error("Error al registrar compra");
    }
  };

  const borrarCompra = async (id) => {
    try {
      await eliminarCompra(id);

      toast.success("Compra eliminada");

      cargarCompras();

    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar compra");
    }
  };

  return (
    <div>

      <ToastContainer />

      <h2>Gestión de Compras</h2>

      <div style={{ marginBottom: "20px" }}>

        <input
          type="number"
          placeholder="Proveedor ID"
          value={proveedorId}
          onChange={(e) => setProveedorId(e.target.value)}
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

        <button onClick={guardarCompra}>
          Guardar Compra
        </button>

      </div>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Proveedor</th>
            <th>Usuario</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>

          {compras.length === 0 ? (
            <tr>
              <td colSpan="6">
                No hay compras registradas
              </td>
            </tr>
          ) : (
            compras.map((compra) => (
              <tr key={compra.id}>
                <td>{compra.id}</td>
                <td>{compra.fechaCompra}</td>
                <td>${compra.montoTotal}</td>
                <td>{compra.proveedorId}</td>
                <td>{compra.usuarioId}</td>

                <td>
                  <button
                    onClick={() => borrarCompra(compra.id)}
                  >
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

export default Compras;