import api from "./api";

export async function login(email, senha) {
  try {
    const response = await api.post("/verifica", {
      email,
      password: senha,
    });

    const { access_token } = response.data; // use o nome exato que o backend retorna
    if (access_token) {
      localStorage.setItem("token", access_token);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return false;
  }
}

export function logout() {
  localStorage.removeItem("token");
  sessionStorage.clear();
  window.location.href = "/login";
}

export function isAuthenticated() {
  return !!localStorage.getItem("token");
}
