const Auth = {
  register: async (body, role = "client") => {
    const endpoint = role === "owner" ? "owner" : "client";
    console.log("Enviando a:", endpoint, "Payload:", body);

    const res = await fetch(`http://localhost:5021/api/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("Error backend:", errorData);
      throw new Error(errorData.message || "No se pudo registrar el usuario");
    }

    return await res.json();
  },
};
export default Auth;