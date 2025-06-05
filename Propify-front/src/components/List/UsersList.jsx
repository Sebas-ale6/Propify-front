const UsersList = ({ users, role, callback }) => {
  const filteredByRole = users.filter((user) => user.role === role);

  let headerField;
  if (role === "Cliente") {
    headerField = "Alquiler";
  } else if (role === "Propietario") {
    headerField = "Propiedad";
  } else {
    headerField = "Fecha de alta";
  }

  return (
    <div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={headerStyle}>Nombre</th>
            <th style={headerStyle}>{headerField}</th>
            <th style={headerStyle}>Rol</th>
            <th style={headerStyle}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredByRole.map((user) => {
            let field;
            if (role === "Cliente") {
              field = user.rent;
            } else if (role === "Propietario") {
              field = user.property;
            } else {
              field = user.date;
            }

            return (
              <tr key={user.id}>
                <td style={tdStyle}>{user.name}</td>
                <td style={tdStyle}>{field}</td>
                <td style={tdStyle}>{user.role}</td>
                <td style={tdStyle}><button onClick={callback}>Editar</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const headerStyle = {
  border: "1px solid #ccc",
  padding: "8px",
  backgroundColor: "#000",
  color: "#fff",
  textAlign: "left"
};

const tdStyle = {
  border: "1px solid #ccc",
  padding: "8px"
};

export default UsersList;
