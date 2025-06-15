/*const Auth = {
  login: async (body) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (u) => u.email === body.email && u.password === body.password
    );

    if (!foundUser) {
      throw new Error("Usuario o contraseña incorrectos");
    }

    return "fake-jwt-token";
  },

  register: async (body) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find((u) => u.email === body.email);
    if (userExists) {
      throw new Error("El correo ya está registrado");
    }

    users.push(body);
    localStorage.setItem("users", JSON.stringify(users));

    return { success: true };
  },
};

export default Auth;*/

//Conexión con el back:

const Auth = {
  login: async (body) => {
    const res = await fetch("http://localhost:5021/api/authenticate/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error("Usuario o contraseña incorrectos");
    }

    const token = await res.text();
    return token;
  },

  register: async (body, role) => {
    const endpoint = role === "owner" ? "owner" : "client";
    const res = await fetch(`http://localhost:5021/api/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error("No se pudo registrar el usuario");
    }

    return await res.json();
  },
};

export default Auth;
