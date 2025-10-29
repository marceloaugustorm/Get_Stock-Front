import { useEffect, useState } from "react";
import api from "../../services/api";
import "./listarprodutos.css";

function ListarProdutos() {
    const [produtos, setProdutos] = useState([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);

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

    const handleCardClick = (id) => {
        setProdutoSelecionado(produtoSelecionado === id ? null : id);
    };

    const handleVender = async (id) => {
    const quantidade = Number(prompt("Quantidade a vender:"));

    if (!quantidade || quantidade <= 0) return;

    try {
        await api.patch(`/produto/vender/${id}`, {
            quantidade_venda: quantidade
        });

        alert("Produto vendido com sucesso!");
        buscarProdutos();
    } catch (error) {
        alert(error.response?.data?.erro || "Erro ao vender produto!");
    }
};

    const handleEditar = async (id) => {
        const nome = prompt("Novo nome:");
        const preco = parseFloat(prompt("Novo preço:"));
        const quantidade = parseInt(prompt("Nova quantidade:"));

        if (!nome || !preco || !quantidade) return;

        await api.put(`/produto/${id}`, { nome, preco, quantidade });
        alert("Produto atualizado!");
        buscarProdutos();
    };

    const handleStatus = async (id, status) => {
        await api.patch(`/${status}/${id}`);
        buscarProdutos();
    };

    const handleDeletar = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir?")) {
            await api.delete(`/produto/${id}`);
            alert("Produto removido!");
            buscarProdutos();
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
                                src={`http://10.0.0.41:5000/${p.imagem}`}
                                alt={p.nome}
                                className="produto-img"
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/150?text=Sem+Imagem';
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
                                        title={p.quantidade <= 0 ? "Produto sem estoque" : "Vender"}
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
        </div>
    );
}

export default ListarProdutos;
