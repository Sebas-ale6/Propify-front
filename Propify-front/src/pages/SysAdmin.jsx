import { useState } from "react";
import UsersList from "../components/List/UsersList";
import userData from "../data/UsersData";

const SysAdmin = () => {
  const [roleState, setRoleState] = useState("Cliente");

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
          <input />
          <button>
            <img />
          </button>
        </div>
      </div>

      <UsersList users={userData} role={roleState}></UsersList>
    </div>
  );
};
export default SysAdmin;


