import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./cadastrar_produto.css";

function CadastrarProduto() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nome: "",
        preco: "",
        quantidade: "",
        status: true,
    });
    const [imagem, setImagem] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImagemChange = (e) => {
        setImagem(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Pega o token salvo
        const token = localStorage.getItem("token");
        console.log("🔐 Token recuperado:", token);

        // Cria o FormData
        const data = new FormData();
        data.append("nome", formData.nome);
        data.append("preco", formData.preco);
        data.append("quantidade", formData.quantidade);
        data.append("status", formData.status ? "True" : "False");

        if (imagem) {
            data.append("imagem", imagem);
            console.log("🖼️ Imagem anexada:", imagem.name);
        } else {
            console.log("⚠️ Nenhuma imagem foi selecionada");
        }

        console.log("📦 Dados sendo enviados:", {
            nome: formData.nome,
            preco: formData.preco,
            quantidade: formData.quantidade,
            status: formData.status,
        });

        try {
            const response = await api.post("/produto", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("✅ Resposta da API:", response.data);
            alert("Produto cadastrado com sucesso!");

            setFormData({ nome: "", preco: "", quantidade: "", status: true });
            setImagem(null);
            document.querySelector('input[type="file"]').value = '';
        } catch (error) {
            console.error("❌ Erro ao cadastrar produto:", error);
            if (error.response) {
                console.error("📩 Detalhes do erro:", error.response.data);
                alert("Erro ao cadastrar produto: " + (error.response.data.erro || "Erro desconhecido"));
            } else {
                alert("Erro ao conectar à API.");
            }
        }
    };

    const voltarHome = () => {
        navigate('/');
    };

    return (
        <div className="cadastro-container">
            <form id="cadastro_form1" onSubmit={handleSubmit}>
                <button type="button" className="btn-voltar-form" onClick={voltarHome}>
                    ← Voltar
                </button>
                <h2>Cadastrar Produto</h2>
                <div className="row">
                    <input
                        type="text"
                        name="nome"
                        placeholder="Nome do produto"
                        className="input-nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="preco"
                        placeholder="Preço"
                        className="input-preco"
                        value={formData.preco}
                        onChange={handleChange}
                        step="0.01"
                        required
                    />
                </div>
                <div className="row">
                    <input
                        type="number"
                        name="quantidade"
                        placeholder="Quantidade"
                        value={formData.quantidade}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="row">
                    <input
                        type="file"
                        name="imagem"
                        accept="image/*"
                        onChange={handleImagemChange}
                    />
                </div>
                {imagem && (
                    <p className="arquivo-selecionado">Arquivo: {imagem.name}</p>
                )}
                <button type="submit">Cadastrar Produto</button>
            </form>
        </div>
    );
}

export default CadastrarProduto;
