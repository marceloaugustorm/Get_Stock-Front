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

        // Criar FormData para enviar arquivo
        const data = new FormData();
        data.append("nome", formData.nome);
        data.append("preco", formData.preco);
        data.append("quantidade", formData.quantidade);
        // data.append("status", "True");

        if (imagem) {
            data.append("imagem", imagem);
        }

        try {
            await api.post("/produto", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Produto cadastrado com sucesso!");
            setFormData({ nome: "", preco: "", quantidade: "", status: true });
            setImagem(null);
            // Limpar o input file
            document.querySelector('input[type="file"]').value = '';
        } catch (error) {
            console.error(error);
            alert("Erro ao cadastrar produto: " + (error.response?.data?.erro || error.message));
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