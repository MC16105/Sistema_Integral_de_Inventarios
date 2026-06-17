import axios from "axios";

const API_URL = "http://localhost:8080/inventarios";

export const obtenerInventarios = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const crearInventario = async (inventario) => {
    const response = await axios.post(API_URL, inventario);
    return response.data;
};

export const actualizarInventario = async (id, inventario) => {
    const response = await axios.put(`${API_URL}/${id}`, inventario);
    return response.data;
};

export const eliminarInventario = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};