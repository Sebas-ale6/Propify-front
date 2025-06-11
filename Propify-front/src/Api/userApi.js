const API_URL = "src/data/UsersData.json";

const usersApi = {
  getAll: async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al obtener los usuarios");
    return await response.json();
  },

  getById: async (id) => {
    const users = await usersApi.getAll();
    return users.find(user => user.id === id) || null;
  },

  create: async (newUser) => {
    return await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    });
  },

  update: async (id, updatedFields) => {
    return await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedFields)
    });
  },

  delete: async (id) => {
    return await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });
  }
};

export default usersApi;
