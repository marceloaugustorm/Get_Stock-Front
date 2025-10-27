import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/HomePage/home";
import Login from "./pages/Login/login";
import Cadastro from "./pages/Cadastrar/cadastrar";
import Verificar_cod from "./pages/Verificar_cod/verificar_cod";
import Cadastrar_produto from "./pages/Cadastrar_Produto/cadastrar_produto";
import ListarProduto from "./pages/ListarProdutos/listarprodutos";

function App() {
  return (
    <Router>
      <Header /> {/* aparece em todas as páginas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/verificar_cod" element={<Verificar_cod />} />
        <Route path="/cadastrar_Produto" element={<Cadastrar_produto />} />
        <Route path="/listar_produtos" element={<ListarProduto />} />
      </Routes>
    </Router>
  );
}

export default App;