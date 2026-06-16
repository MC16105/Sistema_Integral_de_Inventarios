import Producto from "./components/Productos";
import Compras from "./components/Compras";
import "./App.css";

function App() {

  return (
    <div className="container">

      <h1>Sistema Integral de Inventarios</h1>

      <Producto />
      <Compras />

    </div>
  );
}

export default App;