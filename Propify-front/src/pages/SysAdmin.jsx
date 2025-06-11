import { useEffect, useState } from "react";
import UsersList from "../components/List/UsersList";
import usersApi from "../Api/userApi";
import { useLanguage } from "../components/context/LanguageContext";
import UserForm from "../components/forms/UserForm";

const SysAdmin = () => {
  const [roleState, setRoleState] = useState("Cliente");
  const [inputState, setInputState] = useState("");
  const [userDataFilterState, setUserDataFilterState] = useState([]);
  const { t, language, setLanguage } = useLanguage();
  const [screenState, setScreenState] = useState("table");
  const [typeFormState, setTypeFormState] = useState("create");
  const [usersDataState, setUsersDataState] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const data = await usersApi.getAll();
      setUsersDataState(data);
    };
    getUsers();
  }, []);

  const handleInputChange = (e) => {
    setInputState(e.target.value);
  };

  const handleSearch = () => {
    const filtered = usersDataState.filter(
      (user) =>
        user.name?.toLowerCase().includes(inputState.toLowerCase()) ||
        user.apellido?.toLowerCase().includes(inputState.toLowerCase()) ||
        user.property?.toLowerCase().includes(inputState.toLowerCase()) ||
        user.rent?.toLowerCase().includes(inputState.toLowerCase()) ||
        user.date?.toLowerCase().includes(inputState.toLowerCase())
    );
    setUserDataFilterState(filtered);
  };

  return (
    <div style={{ backgroundColor: "grey", height: "100vh" }}>
      <header
        style={{
          width: "100vw",
          display: "flex",
          justifyContent: "space-between",
          padding: "5px",
        }}
      >
        <span className="logo" style={{ alignContent: "center" }}>
          {t("logo")}
        </span>
        <button>Cerrar sesion</button>
      </header>

      {screenState === "form" ? null : (
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
                setRoleState("owner");
              }}
            >
              Owner
            </button>
            <button
              onClick={() => {
                setRoleState("SysAdmin");
              }}
            >
              Sysadmin
            </button>
            <button
              onClick={() => {
                setTypeFormState("create");
                setScreenState("form");
              }}
            >
              Añadir usuario
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
      )}
      {screenState === "table" ? (
        <div>
          {usersDataState.length === 0 ? (
            <p>Cargando...</p>
          ) : (
            <UsersList
              users={
                userDataFilterState.length === 0
                  ? usersDataState
                  : userDataFilterState
              }
              role={roleState}
              callback={() => {
                setTypeFormState("edit");
                setScreenState("form");
              }}
            ></UsersList>
          )}
        </div>
      ) : (
        <UserForm type={typeFormState} role={roleState}></UserForm>
      )}
    </div>
  );
};

export default SysAdmin;
