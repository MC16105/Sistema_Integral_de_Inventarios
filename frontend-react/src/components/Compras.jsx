import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  obtenerCompras,
  crearCompra,
  eliminarCompra
} from "../services/compraService";

import { obtenerProductos } from "../services/productoService";
import { obtenerProveedores } from "../services/proveedorService";
import { obtenerUsuarios } from "../services/usuarioService";

function Compras() {
  const [compras, setCompras] = useState([]);

  const [productos, setProductos] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const [proveedorId, setProveedorId] = useState("");
  const [usuarioId, setUsuarioId] = useState("");
  const [productoId, setProductoId] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [precioUnitario, setPrecioUnitario] = useState("");

  useEffect(() => {
    cargarCompras();
    cargarDatos();
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

  const cargarDatos = async () => {
    try {
      const productosData = await obtenerProductos();
      const proveedoresData = await obtenerProveedores();
      const usuariosData = await obtenerUsuarios();

      setProductos(productosData);
      setProveedores(proveedoresData);
      setUsuarios(usuariosData);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar datos");
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
    <div className="animate-fade-in">
      <ToastContainer />

      <div className="header-seccion">
        <h2>Gestión de Compras</h2>
      </div>

      <div className="card-formulario">
        <div className="formulario-grid">

          <div className="input-group">
            <label>Proveedor</label>
            <select
              value={proveedorId}
              onChange={(e) => setProveedorId(e.target.value)}
            >
              <option value="">Seleccione proveedor</option>

              {proveedores.map((proveedor) => (
                <option
                  key={proveedor.id}
                  value={proveedor.id}
                >
                  {proveedor.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label>Usuario</label>
            <select
              value={usuarioId}
              onChange={(e) => setUsuarioId(e.target.value)}
            >
              <option value="">Seleccione usuario</option>

              {usuarios.map((usuario) => (
                <option
                  key={usuario.id}
                  value={usuario.id}
                >
                  {usuario.username}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label>Producto</label>
            <select
              value={productoId}
              onChange={(e) => setProductoId(e.target.value)}
            >
              <option value="">Seleccione producto</option>

              {productos.map((producto) => (
                <option
                  key={producto.id}
                  value={producto.id}
                >
                  {producto.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label>Cantidad</label>
            <input
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Precio Unitario</label>
            <input
              type="number"
              value={precioUnitario}
              onChange={(e) => setPrecioUnitario(e.target.value)}
            />
          </div>

        </div>

        <div className="formulario-acciones">
          <button
            className="btn-guardar"
            onClick={guardarCompra}
          >
            Guardar Compra
          </button>
        </div>
      </div>

      <div className="tabla-contenedor">
        <table>
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
                <td colSpan="6" className="tabla-vacia">
                  No hay compras registradas
                </td>
              </tr>
            ) : (
              compras.map((compra) => (
                <tr key={compra.id}>
                  <td>
                    <span className="badge-id">
                      #{compra.id}
                    </span>
                  </td>

                  <td>{compra.fechaCompra}</td>

                  <td className="text-precio">
                    ${compra.montoTotal}
                  </td>

                  <td>{compra.proveedorId}</td>

                  <td>{compra.usuarioId}</td>

                  <td>
                    <div className="tabla-acciones">
                      <button
                        className="btn-accion btn-eliminar"
                        onClick={() => borrarCompra(compra.id)}
                      >
                        🗑
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

