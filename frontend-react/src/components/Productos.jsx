import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaPlus, FaSync } from "react-icons/fa";
import { toast } from "react-toastify";
import {obtenerProductos, crearProducto, actualizarProducto, eliminarProducto} from "../services/productoService";
import "../App.css";

function Productos() {

    const [productos, setProductos] = useState([]);
    const [idEditar, setIdEditar] = useState(null);
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        try {
            const data = await obtenerProductos();
            setProductos(data);
        } catch (error) {
            console.error(error);
            setMensaje("Error al cargar productos");
        }
    };

    const guardarProducto = async () => {
        const producto = {
            nombre,
            precio,
            stock,
            descripcion,
            proveedorId: 1,
            usuarioId: 1,
            categoriaId: 1
        };
        try {
            if (idEditar) {
                await actualizarProducto(idEditar, producto);
                setMensaje("Producto actualizado correctamente");
                setIdEditar(null);
            } else {
                await crearProducto(producto);
                setMensaje("Producto agregado correctamente");
            }
            limpiarFormulario();
            cargarProductos();
        } catch (error) {
            console.error(error);
            setMensaje("Error al guardar producto");
        }
    };

    const editarProducto = (producto) => {
        setIdEditar(producto.id);
        setNombre(producto.nombre);
        setPrecio(producto.precio);
        setStock(producto.stock);
        setDescripcion(producto.descripcion);
        setMensaje("Editando producto...");
    };

    const borrarProducto = async (id) => {
        const confirmar = window.confirm(
            "¿Está seguro de eliminar este producto?"
        );
        if (!confirmar) {
            return;
        }
        try {
            await eliminarProducto(id);
            setMensaje("Producto eliminado correctamente");
            cargarProductos();
        } catch (error) {
            console.error(error);
            setMensaje("Error al eliminar producto");
        }
    };

    const limpiarFormulario = () => {
        setNombre("");
        setPrecio("");
        setStock("");
        setDescripcion("");
    };

    return (
        <div>
            <h2>Gestión de Productos</h2>
            {mensaje && ( <p className="mensaje"> {mensaje} </p> )}
            <div className="formulario">
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Precio"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                />

                <button onClick={guardarProducto}>
                     {idEditar ? <FaSync /> : <FaPlus />}
                     {idEditar ? " Actualizar" : " Guardar"}
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) => (
                        <tr key={producto.id}>
                            <td>{producto.id}</td>
                            <td>{producto.nombre}</td>
                            <td>${producto.precio}</td>
                            <td>{producto.stock}</td>
                            <td>{producto.descripcion}</td>
                            <td>

                                <button onClick={() => editarProducto(producto)}>
                                     <FaEdit /> Editar
                                </button>

                                <button onClick={() => borrarProducto(producto.id)}>
                                     <FaTrash /> Eliminar
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default Productos;