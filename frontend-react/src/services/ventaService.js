import axios from "axios";

const API_URL = "http://localhost:8080/ventas";

export const obtenerVentas = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const crearVenta = async (venta) => {
  const response = await axios.post(API_URL, venta);
  return response.data;
};

export const eliminarVenta = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};