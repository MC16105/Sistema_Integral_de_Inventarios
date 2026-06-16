import axios from "axios";

const API_URL = "http://localhost:8080/usuarios";

export const obtenerUsuarios = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};