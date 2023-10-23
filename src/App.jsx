 
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/screans/Home";
import DetallePelicula from "./components/screans/DetallePelicula";
import Categorias from "./components/screans/Categorias";
import Favoritos from "./components/screans/Favoritos";
import NotFound404 from "./components/screans/NotFound404";
import Footer from "./components/layout/Footer";
import Resultados from "./components/screans/Resultados";

function App() {
   

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/detallePelicula/:idDetail"
            element={<DetallePelicula />}
          />
          <Route path="/categorias/:idCategoria" element={<Categorias />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/resultados/:query" element={<Resultados />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
