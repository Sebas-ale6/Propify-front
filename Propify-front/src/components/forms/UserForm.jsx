const UserForm = ({ type, role }) => {
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
    >
      <h2 style={{ textAlign: "center", color: "#1A3C34" }}>
        {type === "create" ? "Crear usuario" : "Editar usuario"}
      </h2>

      <input placeholder="Nombre" type="text" name="name" style={inputStyle} />
      <input
        placeholder="Apellido"
        type="text"
        name="surname"
        style={inputStyle}
      />
      <input placeholder="Email" type="email" name="email" style={inputStyle} />
      <input
        placeholder="Contraseña"
        type="password"
        name="password"
        style={inputStyle}
      />

      {type === "create" ? (
        <select name="role" defaultValue={role} style={selectStyle}>
          <option value={role}>{role}</option>
        </select>
      ) : (
        <select name="role" defaultValue={role} style={selectStyle}>
          <option value="cliente">Cliente</option>
          <option value="propietario">Propietario</option>
          <option value="SysAdmin">SysAdmin</option>
        </select>
      )}

      {role === "Cliente" ? null : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input placeholder="CBU" type="number" style={inputStyle} />
          <select style={selectStyle}>
            <option value="dni">DNI</option>
            <option value="pasaporte">Pasaporte</option>
          </select>
          <input
            placeholder="Número de documento"
            type="text"
            style={inputStyle}
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
        <button style={buttonStyle}>Atrás</button>
        {type === "create" ? null : (
          <button style={{ ...buttonStyle, backgroundColor: "#FF6B6B" }}>
            Eliminar
          </button>
        )}
        <button style={buttonStyle}>Guardar</button>
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
