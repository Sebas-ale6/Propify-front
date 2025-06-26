import usersApi from "../../Api/userApi";

const UsersList = ({ users, role, callback }) => {
  const deleteUser = async (id) => {
    const token = window.localStorage.getItem("token");
    await usersApi.delete(id, role, token);
    window.location.reload();
  };

  return (
    <div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={headerStyle}>Nombre</th>
            <th style={headerStyle}>Apellido</th>
            <th style={headerStyle}>Email</th>
            {/*<th style={headerStyle}>{headerField}</th>*/}
            <th style={headerStyle}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            {
              /* let field;
            if (role === "Cliente") {
              field = user.rent;
            } else if (role === "owner") {
              field = user.property;
            } else {
              field = user.date;
            } */
            }

            return (
              <tr key={user.id}>
                <td style={tdStyle}>{user.name}</td>
                <td style={tdStyle}>{user.surname}</td>
                <td style={tdStyle}>{user.email}</td>
                {/*<td style={tdStyle}>{field}</td>*/}
                <td style={tdStyle}>
                  <button onClick={callback}>Editar</button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    style={deleteButtonStyle}
                  >
                    X
                  </button>
                </td>
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
  textAlign: "left",
};

const tdStyle = {
  border: "1px solid #ccc",
  padding: "8px",
};

const deleteButtonStyle = {
  backgroundColor: "#FF0000",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  cursor: "pointer",
  marginLeft: "8px",
  ':hover': {
    backgroundColor: '#CC0000',
  },
};

export default UsersList;