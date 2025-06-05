import { useState } from "react";
import UsersList from "../components/List/UsersList";
import userData from "../data/UsersData";

const SysAdmin = () => {
  const [roleState, setRoleState] = useState("Cliente");
  const [inputState, setInputState] = useState("");
  const [userDataFilterState, setUserDataFilterState] = useState([]);

  const handleInputChange = (e) => {
    setInputState(e.target.value);
  };

  const handleSearch = () => {
    const filtered = userData.filter((user) =>
      (user.name?.toLowerCase().includes(inputState.toLowerCase()) ||
       user.apellido?.toLowerCase().includes(inputState.toLowerCase()) ||
       user.property?.toLowerCase().includes(inputState.toLowerCase()) ||
       user.rent?.toLowerCase().includes(inputState.toLowerCase()) ||
       user.date?.toLowerCase().includes(inputState.toLowerCase()))
    );
    setUserDataFilterState(filtered);
  };

  return (
    <div>
      <header>
        <nav>
          <button>Usuarios</button>
          <button>Roles de ususario</button>
        </nav>
        <nav>
          <button>Cerrar sesion</button>
        </nav>
      </header>

      <div>
        <h3>Gestion de usuarios</h3>
        <div>
          <button
            onClick={() => {
              setRoleState("Cliente");
            }}
          >
            Clientes
          </button>
          <button
            onClick={() => {
              setRoleState("Propietario");
            }}
          >
            Propietario
          </button>
          <button
            onClick={() => {
              setRoleState("SysAdmin");
            }}
          >
            Sysadmin
          </button>
        </div>

        <div>
          <input
            value={inputState}
            onChange={handleInputChange}
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
            placeholder="Buscar..."
          />
          <button
            onClick={handleSearch}
            style={{
              padding: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "black",
              color: "white",
            }}
          >
            🔍
          </button>
        </div>
      </div>

      <UsersList
        users={userDataFilterState.length === 0 ? userData : userDataFilterState}
        role={roleState}
      ></UsersList>
    </div>
  );
};

export default SysAdmin;


