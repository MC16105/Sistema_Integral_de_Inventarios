import axios from "axios";

// Ajusta el puerto si tu Spring Boot corre en uno distinto al 8080
const API_URL = "http://localhost:8080/categorias";

export const obtenerCategorias = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const crearCategoria = async (categoria) => {
    const response = await axios.post(API_URL, categoria);
    return response.data;
};

export const actualizarCategoria = async (id, categoria) => {
    const response = await axios.put(`${API_URL}/${id}`, categoria);
    return response.data;
};

export const eliminarCategoria = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};