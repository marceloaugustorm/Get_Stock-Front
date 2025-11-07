import "./cadastrar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api"; // usa o Axios configurado

function Cadastro() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cnpj: "",
    celular: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Enviando dados:", formData);

    try {
      // usa o Axios já configurado com baseURL = "http://192.168.15.8:5000"
      const response = await api.post("/user", formData);

      if (response.status === 201 || response.status === 200) {
        localStorage.setItem("cnpj", formData.cnpj);
        alert("Usuário cadastrado com sucesso!");
        navigate("/verificar_cod");
      } else {
        alert("Erro ao cadastrar usuário!");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert(error.response?.data?.erro || "Falha na comunicação com o servidor.");
    }
  };

  return (
    <div className="container">
      <form id="cadastro_form" onSubmit={handleSubmit}>
        <h2>Informações Pessoais</h2>
        <div className="grupo">
          <input
            name="name"
            placeholder="Nome"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            name="cnpj"
            placeholder="CNPJ"
            value={formData.cnpj}
            onChange={handleChange}
            required
          />
          <input
            name="celular"
            placeholder="Celular"
            value={formData.celular}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default Cadastro;
