const API_URL = "src/data/UsersData.json";

const getToken=()=>{
  const token=localStorage.getItem("token")
  return token
}
const usersApi = {
  getAll: async () => {
    const token=getToken()
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    if (!response.ok) throw new Error("Error al obtener los usuarios");
    return await response.json();
  },

  getById: async (id) => {
    const users = await usersApi.getAll();
    return users.find(user => user.id === id) || null;
  },

  create: async (newUser) => {
    const token=getToken()
    return await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(newUser)
    });
  },

  update: async (id, updatedFields) => {
    const token=getToken()
    return await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedFields)
    });
  },

  delete: async (id) => {
    const token=getToken()
    return await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
  }
};

export default usersApi;
