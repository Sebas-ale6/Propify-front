const Auth = {
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

export default Auth;