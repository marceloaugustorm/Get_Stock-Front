import "./home.css";
import { useNavigate } from "react-router-dom";
import MercadoX from "../../components/img/Mercado X.png"
import Bebida from "../../components/img/bebida.png"
import Prateleira from "../../components/img/prateleira.png"
import Fruta from "../../components/img/frutas.png"

function Home() {
  const navigate = useNavigate();

  const handleCadastro = () => {
    navigate('/cadastrar_produto'); // ou a rota que você quiser
  };

  const handleListar = () => {
    navigate('/listar_produtos');
  };


  return (
    <>
      <div className="home-container">
        <h1>Bem-vindo ao Mercado X</h1>
        <img src={MercadoX} alt="Fachada Mercado X" className="mercado-img" />
        <hr />
      </div>

      <div className="Cadastrar">
        <h1>Cadastre os Produtos</h1>
        <div className="botoes-container">
          <button type="button" className="btn-cadastrar" onClick={handleCadastro}>
            Cadastrar Produto
          </button>
          <button type="button" className="btn-listar" onClick={handleListar}>
            Ver Produtos
          </button>
        </div>
        <div className="imagens-container">
          <img src={Bebida} alt="Bebidas" className="bebida-img" />
          <img src={Prateleira} alt="Prateleira" className="prateleira-img" />
          <img src={Fruta} alt="Frutas" className="frutas-img" />
        </div>
      </div>
    </>
  );
}

export default Home;
