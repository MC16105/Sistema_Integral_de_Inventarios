/*import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "../App.css";

function Login({ onLoginSuccess }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cargando, setCargando] = useState(false);

    const manejarLogin = async (e) => {
        e.preventDefault(); // Evita que la página se recargue solo con el formulario

        // Validaciones básicas en el FrontEnd
        if (!username || !password) {
            toast.warning("Por favor, introduce tu usuario y contraseña");
            return;
        }

        setCargando(true);
        try {
            // Petición Axios apuntando a tu puerto 8080 real
            // NOTA: Ajusta la ruta (/api/auth/login) si en tu back la nombraste diferente
            const respuesta = await axios.post("http://localhost:8080/api/auth/login", {
                username: username,
                password: password
            });

            // Tu backend debería retornar el objeto del usuario que coincidió en PostgreSQL
            const usuarioValido = respuesta.data;

            toast.success(`¡Bienvenido, ${username}! Accediendo... `);

            // Guardamos el objeto del usuario en el navegador como texto string JSON
            localStorage.setItem("usuario", JSON.stringify(usuarioValido));

            // Le pasamos los datos al componente padre (App.jsx) tras un pequeño delay
            setTimeout(() => {
                if (onLoginSuccess) {
                    onLoginSuccess(usuarioValido);
                }
            }, 1000);

        } catch (error) {
            console.error("Error en la autenticación:", error);
            // Si el backend manda un mensaje específico lo muestra, si no, usa uno genérico
            const mensajeError = error.response?.data?.mensaje || "Usuario o contraseña incorrectos ";
            toast.error(mensajeError);
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="login-container">
            {/* Contenedor flotante para los Toasts de notificación /}
            <ToastContainer position="top-right" autoClose={2500} />

            <div className="login-card">
                <div className="login-header">
                    <h2>Sistema de Inventarios</h2>
                    <p>Introduce tus credenciales de acceso</p>
                </div>

                <form onSubmit={manejarLogin} className="login-form">
                    <div className="input-group">
                        <label>Nombre de Usuario</label>
                        <input
                            type="text"
                            placeholder="Ej. administrador"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={cargando}
                        />
                    </div>

                    <div className="input-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={cargando}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn-login-submit"
                        disabled={cargando}
                    >
                        {cargando ? "Verificando en PostgreSQL..." : "Ingresar"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;*/