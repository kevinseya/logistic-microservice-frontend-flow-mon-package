const API_GATEWAY = "http://localhost:8000/"; // 🔥 Usar API Gateway en lugar de backend directo

export const login = async (email, password, isClient) => {
  try {
    console.log("Formulario enviado al servicio"); // Asegúrate de que esto se imprima cuando se haga clic en el botón
    const response = await fetch(`${API_GATEWAY}api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, isClient }),
    });

    if (!response.ok) throw new Error("Error en autenticación");

    const data = await response.json();
    sessionStorage.setItem("authToken", data.token);
    sessionStorage.setItem("userRole", data.role);

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
