import { useEffect, useState } from "react";
import UsersList from "../components/List/UsersList";
import usersApi from "../Api/userApi";
import { useLanguage } from "../components/context/LanguageContext";
import UserForm from "../components/forms/UserForm";
import Logo from "../components/Logos/Logo";

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
    <div
      style={{
        backgroundColor: "#F2F4F7",
        height: "100vh",
        fontFamily: "'Roboto', sans-serif",
        color: "#333",
        overflow: "auto",
      }}
    >
      <header
        style={{
          width: "100vw",
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 20px",
          backgroundColor: "#DCEAEF",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
          alignItems: "center",
        }}
      >
        <Logo /> {/* ← Logo que redirige al home */}

        <button
          style={{
            padding: "8px 16px",
            backgroundColor: "#E57373",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#d35656")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#E57373")}
        >
          Cerrar sesión
        </button>
      </header>

      {screenState === "form" ? null : (
        <div
          style={{
            padding: "20px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <h3
            style={{
              color: "#336699",
              fontSize: "1.8rem",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            Gestión de usuarios
          </h3>

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "20px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {["Cliente", "owner", "SysAdmin"].map((role) => (
              <button
                key={role}
                onClick={() => setRoleState(role)}
                style={{
                  padding: "10px 20px",
                  backgroundColor:
                    roleState === role ? "#99CCFF" : "#FFFFFF",
                  color: roleState === role ? "#003366" : "#333",
                  border: "1px solid #99CCFF",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  transition: "all 0.3s",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#cfe6fc")
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor =
                    roleState === role ? "#99CCFF" : "#FFFFFF")
                }
              >
                {role}
              </button>
            ))}
            <button
              onClick={() => {
                setTypeFormState("create");
                setScreenState("form");
              }}
              style={{
                padding: "10px 20px",
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "1rem",
              }}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = "#43A047")
              }
              onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
            >
              Añadir usuario
            </button>
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <input
              value={inputState}
              onChange={handleInputChange}
              style={{
                backgroundColor: "#FFFFFF",
                color: "#333",
                padding: "10px",
                border: "1px solid #99CCFF",
                borderRadius: "5px",
                fontSize: "1rem",
                width: "300px",
              }}
              placeholder="Buscar..."
              onFocus={(e) => (e.target.style.borderColor = "#336699")}
              onBlur={(e) => (e.target.style.borderColor = "#99CCFF")}
            />
            <button
              onClick={handleSearch}
              style={{
                padding: "10px",
                border: "1px solid #99CCFF",
                borderRadius: "5px",
                backgroundColor: "#336699",
                color: "#fff",
                cursor: "pointer",
                fontSize: "1rem",
              }}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = "#285580")
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = "#336699")
              }
            >
              🔍
            </button>
          </div>
        </div>
      )}

      {screenState === "table" ? (
        <div
          style={{
            padding: "20px",
            maxWidth: "1200px",
            margin: "0 auto",
            backgroundColor: "#FFFFFF",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          {usersDataState.length === 0 ? (
            <p
              style={{
                color: "#666",
                fontSize: "1.2rem",
                textAlign: "center",
              }}
            >
              Cargando...
            </p>
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
            />
          )}
        </div>
      ) : (
        <UserForm type={typeFormState} role={roleState} />
      )}
    </div>
  );
};

export default SysAdmin;
