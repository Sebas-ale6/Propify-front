const API_URL = `http://localhost:5021/api`;

const usersApi = {
  getAll: async (role) => {
    const response = await fetch(`${API_URL}/${role}`);
    if (!response.ok) throw new Error("Error al obtener los usuarios");
    const data = await response.json();
    console.log(data);
    return data;
  },

  getById: async (id, role) => {
    const users = await usersApi.getAll(role);
    return users.find((user) => user.id === id) || null;
  },

  create: async (newUser) => {
    return await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
  },

  update: async (id, body, token) => {
    
  },

  delete: async (id, role, token) => {
    try {
      return await fetch(`${API_URL}/${role}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
};

export default usersApi;
