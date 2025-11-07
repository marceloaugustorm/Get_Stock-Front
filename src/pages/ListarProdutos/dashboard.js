import { useEffect, useState } from "react";
import api from "../../services/api";
import "./dashboard.css";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/dashboard");
      setDashboard(response.data);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar o dashboard!");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Carregando dashboard...</p>;
  if (!dashboard) return <p>Sem dados para exibir.</p>;

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      <div className="stats">
        <p>Total de Produtos: {dashboard.total_produtos}</p>
        <p>Ativos: {dashboard.ativos}</p>
        <p>Inativos: {dashboard.inativos}</p>
        <p>Valor Total do Estoque: R$ {dashboard.valor_total_estoque.toFixed(2)}</p>
        <p>Total de Vendas: {dashboard.total_vendas}</p>
        <p>Faturamento Total: R$ {dashboard.faturamento_total.toFixed(2)}</p>
        <p>Produto mais vendido: {dashboard.produto_mais_vendido || "Nenhum"}</p>
      </div>

      <div className="charts">
        {dashboard.grafico_status && (
          <div>
            <h3>Produtos Ativos x Inativos</h3>
            <img src={dashboard.grafico_status} alt="Status dos produtos" />
          </div>
        )}

        {dashboard.grafico_vendas && (
          <div>
            <h3>Ranking de Vendas</h3>
            <img src={dashboard.grafico_vendas} alt="Ranking de vendas" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
