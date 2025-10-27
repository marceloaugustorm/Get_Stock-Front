import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./listarprodutos.css";

function ListarProdutos() {
    const [produtos, setProdutos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        buscarProdutos();
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

    const handleInativar = async (id) => {
        try {
            await api.patch(`/desativar/${id}`);
            alert("Produto inativado com sucesso!");
            buscarProdutos();
        } catch (error) {
            console.error(error);
            alert("Erro ao inativar produto!");
        }
    };

    const handleAtivar = async (id) => {
        try {
            await api.patch(`/ativar/${id}`);
            alert("Produto ativado com sucesso!");
            buscarProdutos();
        } catch (error) {
            console.error(error);
            alert("Erro ao ativar produto!");
        }
    };

    const handleDeletar = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir este produto?")) {
            try {
                await api.delete(`/produto/${id}`);
                alert("Produto excluído com sucesso!");
                buscarProdutos();
            } catch (error) {
                console.error(error);
                alert("Erro ao excluir produto!");
            }
        }
    };

    const voltarHome = () => {
        navigate('/');
    };

    // Como está usando proxy, a URL é direta
    const API_BASE_URL = "http://10.0.0.41:5000";

    return (
        <div className="listar-container">
            <div className="header-listar">
                <button className="btn-voltar" onClick={voltarHome}>
                    ← Voltar
                </button>
                <h2>Produtos Cadastrados</h2>
            </div>

            {produtos.length === 0 ? (
                <p className="sem-produtos">Nenhum produto cadastrado ainda.</p>
            ) : (
                <div className="produtos-grid">
                    {produtos.map((p) => (
                        <div key={p.id} className="produto-card">
                            {p.imagem ? (
                                <img
                                    src={`${API_BASE_URL}/${p.imagem}`}
                                    alt={p.nome}
                                    className="produto-img"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/150?text=Sem+Imagem';
                                    }}
                                />
                            ) : (
                                <div className="produto-img-placeholder">Sem imagem</div>
                            )}

                            <h3>{p.nome}</h3>
                            <p className="preco">R$ {parseFloat(p.preco).toFixed(2)}</p>
                            <p>Quantidade: {p.quantidade}</p>

                            {/* STATUS DO PRODUTO - JÁ ESTÁ AQUI! */}
                            <p>
                                Status:{" "}
                                <span
                                    style={{
                                        color: p.status ? "green" : "red",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {p.status ? "Ativo" : "Inativo"}
                                </span>
                            </p>

                            <div className="acoes-produto">
                                {p.status ? (
                                    <button
                                        className="btn-inativar"
                                        onClick={() => handleInativar(p.id)}
                                    >
                                        Inativar
                                    </button>
                                ) : (
                                    <button
                                        className="btn-ativar"
                                        onClick={() => handleAtivar(p.id)}
                                    >
                                        Ativar
                                    </button>
                                )}
                                <button
                                    className="btn-deletar"
                                    onClick={() => handleDeletar(p.id)}
                                >
                                    Excluir
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ListarProdutos;