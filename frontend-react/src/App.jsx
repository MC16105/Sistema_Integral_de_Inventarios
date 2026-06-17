import { useState } from "react";
import {
  FaBoxOpen,
  FaTruck,
  FaShoppingCart,
  FaReceipt,
  FaWarehouse,
  FaTags,
  FaUserShield,
  FaBoxes
} from "react-icons/fa";

// Importación de todos tus componentes
import Producto from "./components/Productos";
import Compras from "./components/Compras";
import Ventas from "./components/Ventas";
import Proveedores from "./components/Proveedores";
import Categorias from "./components/Categorias";
import Usuarios from "./components/Usuarios";
import Inventario from "./components/Inventario";

import "./App.css";

function App() {
  // Estado para controlar qué vista se muestra en el panel central
  const [vistaActiva, setVistaActiva] = useState("productos");

  // Ruteador condicional para renderizar el componente seleccionado
  const renderizarVista = () => {
    switch (vistaActiva) {
      case "productos":
        return <Producto />;
      case "categorias":
        return <Categorias />;
      case "proveedores":
        return <Proveedores />;
      case "inventario":
        return <Inventario />;
      case "compras":
        return <Compras />;
      case "ventas":
        return <Ventas />;
      case "usuarios":
        return <Usuarios />;
      default:
        return <Producto />;
    }
  };

  return (
    <div className="layout-dashboard">

      {/* SIDEBAR LATERAL */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <FaWarehouse className="sidebar-logo-icon" />
          <h2>StockMaster</h2>
        </div>

        <nav className="sidebar-menu">
          {/* SECCIÓN: CATÁLOGOS */}
          <div className="sidebar-seccion-titulo">Catálogos</div>

          <button
            className={`sidebar-btn ${vistaActiva === "productos" ? "active" : ""}`}
            onClick={() => setVistaActiva("productos")}
          >
            <FaBoxOpen /> <span>Productos</span>
          </button>

          <button
            className={`sidebar-btn ${vistaActiva === "categorias" ? "active" : ""}`}
            onClick={() => setVistaActiva("categorias")}
          >
            <FaTags /> <span>Categorías</span>
          </button>

          <button
            className={`sidebar-btn ${vistaActiva === "proveedores" ? "active" : ""}`}
            onClick={() => setVistaActiva("proveedores")}
          >
            <FaTruck /> <span>Proveedores</span>
          </button>

          {/* SECCIÓN: OPERACIONES e INVENTARIO */}
          <div className="sidebar-seccion-titulo">Operaciones</div>

          <button
            className={`sidebar-btn ${vistaActiva === "inventario" ? "active" : ""}`}
            onClick={() => setVistaActiva("inventario")}
          >
            <FaBoxes /> <span>Inventario (Stock)</span>
          </button>

          <button
            className={`sidebar-btn ${vistaActiva === "compras" ? "active" : ""}`}
            onClick={() => setVistaActiva("compras")}
          >
            <FaShoppingCart /> <span>Compras</span>
          </button>

          <button
            className={`sidebar-btn ${vistaActiva === "ventas" ? "active" : ""}`}
            onClick={() => setVistaActiva("ventas")}
          >
            <FaReceipt /> <span>Ventas</span>
          </button>

          {/* SECCIÓN: CONFIGURACIÓN */}
          <div className="sidebar-seccion-titulo">Seguridad</div>

          <button
            className={`sidebar-btn ${vistaActiva === "usuarios" ? "active" : ""}`}
            onClick={() => setVistaActiva("usuarios")}
          >
            <FaUserShield /> <span>Usuarios</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <p>v1.0 - PostgreSQL</p>
        </div>
      </aside>

      {/* CONTENEDOR PRINCIPAL DERECHO */}
      <main className="contenido-principal">
        <header className="topbar">
          <h1>Sistema Integral de Inventarios</h1>
          <div className="usuario-badge">
            <span>Admin</span>
          </div>
        </header>

        <div className="vista-contenedor">
          {renderizarVista()}
        </div>
      </main>

    </div>
  );
}

export default App;