import Producto from "./components/Productos";
import Compras from "./components/Compras";
import Ventas from "./components/Ventas";
import Proveedores from "./components/Proveedores";
import "./App.css";

function App() {
  return (
    <div className="container">

      <h1>Sistema Integral de Inventarios</h1>

      <Producto />
      <Compras />
      <Ventas />
      <Proveedores/>

    </div>
  );
}

export default App;