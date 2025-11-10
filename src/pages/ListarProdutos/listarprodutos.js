import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { isAuthenticated } from "../../services/auth";
import "./listarprodutos.css";

function ListarProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [dashboard, setDashboard] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    } else {
      buscarProdutos();
      buscarDashboard();
    }
  }, []);

  const buscarProdutos = async () => {
    try {
      const response = await api.get("/produto");
      setProdutos(response.data);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar produtos!");
    }
  };

  const buscarDashboard = async () => {
    try {
      const response = await api.get("/produto/dashboard");
      setDashboard(response.data);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar dashboard!");
    }
  };

  const handleCardClick = (id) => {
    setProdutoSelecionado(produtoSelecionado === id ? null : id);
  };

  const handleVender = async (id) => {
    const quantidade = Number(prompt("Quantidade a vender:"));
    if (!quantidade || quantidade <= 0) return;

    try {
      await api.patch(`/produto/${id}/vender`, { quantidade_venda: quantidade });

      // Atualiza só o produto vendido
      setProdutos((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, quantidade: p.quantidade - quantidade } : p
        )
      );

      buscarDashboard();
      setProdutoSelecionado(null);
      alert("Produto vendido com sucesso!");
    } catch (error) {
      alert(error.response?.data?.erro || "Erro ao vender produto!");
    }
  };

  const handleEditar = async (id) => {
    const nome = prompt("Novo nome:");
    const preco = parseFloat(prompt("Novo preço:"));
    const quantidade = parseInt(prompt("Nova quantidade:"));

    if (!nome || isNaN(preco) || isNaN(quantidade)) {
      alert("Valores inválidos!");
      return;
    }

    try {
      await api.put(`/produto/${id}`, { nome, preco, quantidade });

      // Atualiza só o produto alterado
      setProdutos((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, nome, preco, quantidade } : p
        )
      );

      buscarDashboard();
      setProdutoSelecionado(null);
      alert("Produto atualizado!");
    } catch (error) {
      alert(error.response?.data?.erro || "Erro ao editar produto!");
    }
  };

  const handleStatus = async (id, status) => {
    try {
      await api.patch(`/produto/${status}/${id}`);

      // Atualiza só o status do produto
      setProdutos((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, status: status === "ativar" } : p
        )
      );

      buscarDashboard();
      setProdutoSelecionado(null);
    } catch (error) {
      alert(error.response?.data?.erro || "Erro ao alterar status!");
    }
  };

  const handleDeletar = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir?")) return;

    try {
      await api.delete(`/produto/${id}`);

      // Remove produto do estado
      setProdutos((prev) => prev.filter((p) => p.id !== id));

      buscarDashboard();
      setProdutoSelecionado(null);
      alert("Produto removido!");
    } catch (error) {
      alert(error.response?.data?.erro || "Erro ao excluir produto!");
    }
  };

  return (
    <div className="listar-container">
      <h2>Produtos Cadastrados</h2>

      {produtos.length === 0 ? (
        <p>Nenhum produto cadastrado ainda.</p>
      ) : (
        <div className="produtos-grid">
          {produtos.map((p) => (
            <div
              key={p.id}
              onClick={() => handleCardClick(p.id)}
              className={`produto-card ${produtoSelecionado === p.id ? "expandido" : ""}`}
            >
              <img
                src={p.imagem}
                alt={p.nome}
                className="produto-img"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150?text=Sem+Imagem";
                }}
              />
              <h3>{p.nome}</h3>
              <p className="preco">R$ {parseFloat(p.preco).toFixed(2)}</p>
              <p>Qtd: {p.quantidade}</p>
              <p>
                Status:{" "}
                <span style={{ color: p.status ? "green" : "red", fontWeight: "bold" }}>
                  {p.status ? "Ativo" : "Inativo"}
                </span>
              </p>

              {produtoSelecionado === p.id && (
                <div className="detalhes">
                  <button onClick={() => handleEditar(p.id)}>Editar</button>
                  <button
                    className="btn-vender"
                    onClick={() => handleVender(p.id)}
                    disabled={p.quantidade <= 0}
                    title={p.quantidade <= 0 ? "Produto sem estoque" : "Vender produto"}
                  >
                    {p.quantidade <= 0 ? "Sem estoque" : "Vender"}
                  </button>
                  {p.status ? (
                    <button onClick={() => handleStatus(p.id, "desativar")}>Inativar</button>
                  ) : (
                    <button onClick={() => handleStatus(p.id, "ativar")}>Ativar</button>
                  )}
                  <button onClick={() => handleDeletar(p.id)}>Excluir</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {dashboard ? (
        <div className="dashboard">
          <p>Total de produtos: {dashboard.total_produtos}</p>
          <p>Valor total do estoque: R$ {dashboard.valor_total_estoque.toFixed(2)}</p>
          <p>Total de vendas: {dashboard.total_vendas}</p>
          <p>Faturamento total: R$ {dashboard.faturamento_total.toFixed(2)}</p>
          <p>Produto mais vendido: {dashboard.produto_mais_vendido || "Nenhum"}</p>
          <div className="graficos">
            <img src={dashboard.grafico_status} alt="Status dos Produtos" />
            {dashboard.grafico_vendas && <img src={dashboard.grafico_vendas} alt="Ranking de Vendas" />}
          </div>
        </div>
      ) : (
        <p>Carregando dashboard...</p>
      )}
    </div>
  );
}

export default ListarProdutos;