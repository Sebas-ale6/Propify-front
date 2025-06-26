import Auth from "../../Api/auth.js";
import { useEffect, useState } from "react";
import usersApi from "../../Api/userApi.js";

const UserForm = ({ type, role }) => {

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    numberPhone: "",
    documentType: 1,
    dni: "",
    cvu: "",
    role: role
  });

  useEffect(() => {
    const getUserData = async() => {
    const idUserEdited = parseInt(window.localStorage.getItem("userToEdit"))
    console.log(idUserEdited, type)
    if(idUserEdited && type === "edit"){
      const user = await usersApi.getById(idUserEdited, role)
      console.log(user)
      setFormData(user)
    }else{
      null
    }}
    getUserData()
  },[])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "documentType" ? Number(value) : value,
    }));
  };

  const registerUser = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const token = window.localStorage.getItem("token");
      await Auth.register(formData, role, token);
    } catch (error) {
      alert("Error al cargar el usuario");
    }
    window.location.reload();
  };

  const editUser = async (e) => {
    e.preventDefault();
     try {
      const token = window.localStorage.getItem("token");
      const idUserEdited = parseInt(window.localStorage.getItem("userToEdit"))
      await usersApi.delete(idUserEdited, role, token);
      await Auth.register(formData, role, token);
      window.localStorage.removeItem("userToEdit")
    } catch (error) {
      alert("Error al cargar el usuario");
    }
    window.location.href="/SysAdmin"
  }

  return (
    <form
      style={{
        backgroundColor: "#E8E8E8", // Fondo claro
        color: "#1A3C34", // Texto oscuro
        padding: "30px",
        borderRadius: "10px",
        maxWidth: "600px",
        margin: "40px auto",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        fontFamily: "'Roboto', sans-serif",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
      onSubmit={type === "create" ? registerUser : editUser }
    >
      <h2 style={{ textAlign: "center", color: "#1A3C34" }}>
        {type === "create" ? "Crear usuario" : "Editar usuario"}
      </h2>

      <input
        value={formData.name}
        placeholder="Nombre"
        type="text"
        name="name"
        style={inputStyle}
        onChange={handleChange}
        required
      />
      <input
        value={formData.surname}
        placeholder="Apellido"
        type="text"
        name="surname"
        style={inputStyle}
        onChange={handleChange}
        required
      />
      <input
        value={formData.email}
        placeholder="Email"
        type="email"
        name="email"
        style={inputStyle}
        onChange={handleChange}
        required
        disabled = {type === "create" ? false : true}
      />
      <input
        value={formData.password}
        placeholder="Contraseña"
        type="password"
        name="password"
        style={inputStyle}
        onChange={handleChange}
        required
      />

      <input
        value={formData.numberPhone}
        placeholder="Telefono"
        type="number"
        name="numberPhone"
        style={inputStyle}
        onChange={handleChange}
        required
      />

      <select
        value={formData.documentType}
        style={selectStyle}
        type="number"
        onChange={handleChange}
        name="documentType"
      >
        <option value={1}>DNI</option>
        <option value={2}>Pasaporte</option>
      </select>
      <input
        value={formData.dni}
        placeholder="Número de documento"
        type="text"
        name="dni"
        style={inputStyle}
        onChange={handleChange}
        required
      />

      {type === "create" ? (
        <select name="role" value={formData.role} defaultValue={role} style={selectStyle}>
          <option value={role}>{role}</option>
        </select>
      ) : (
        <select onChange={handleChange} name="role" defaultValue={role} style={selectStyle}>
          <option value="client">Cliente</option>
          <option value="owner">Propietario</option>
          <option value="sysAdmin">SysAdmin</option>
        </select>
      )}

      {role === "client" ? null : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            value={formData.cvu}
            placeholder="CBU"
            name="cvu"
            type="number"
            style={inputStyle}
            onChange={handleChange}
          />
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <button style={buttonStyle} onClick={() => {window.location.href="/SysAdmin"}}>Atrás</button>

        <button type="submit" style={buttonStyle}>
          Guardar
        </button>
      </div>
    </form>
  );
};

const inputStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #B7A57A",
  fontSize: "1rem",
  backgroundColor: "#fff",
  color: "#1A3C34",
};

const selectStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #B7A57A",
  fontSize: "1rem",
  backgroundColor: "#fff",
  color: "#1A3C34",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#1A3C34",
  color: "#E8E8E8",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "1rem",
  transition: "background-color 0.3s",
};

export default UserForm;
