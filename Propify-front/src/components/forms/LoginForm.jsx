import { useState } from "react";
import Button from "../buttons/Button";
import { useLanguage } from "../context/LanguageContext";
import Auth from "../../Api/auth";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [emailState, setEmailState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [role, setRole] = useState("client"); // Estado para el rol
  const { t, language, setLanguage } = useLanguage();
  const navigate = useNavigate();

  const handleEmailState = (event) => {
    setEmailState(event.target.value);
  };

  const handlePasswordState = (event) => {
    setPasswordState(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleLanguageToggle = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  const handleSendData = async (event) => {
    event.preventDefault();

    try {
      if (!emailState.includes("@")) throw new Error("No es un mail");
      if (!passwordState) throw new Error("Llena el password");

      // Enviar el role dentro del body
      const body = {
        email: emailState,
        password: passwordState,
  
      };

      // Llamar login con el body que incluye rol
      const token = await Auth.login(body);

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      // Obtener datos del usuario según rol, usando token
      const res = await fetch(`http://localhost:5021/api/${role}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("No se pudieron obtener los datos del usuario");

      const users = await res.json();

      const currentUser = users.find((u) => u.email === emailState);

      if (!currentUser) throw new Error("No se encontró el usuario");

      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      // Redirigir según si hay búsqueda pendiente
      const pendingSearch = localStorage.getItem("pendingSearch");

      if (pendingSearch) {
        const params = new URLSearchParams(JSON.parse(pendingSearch)).toString();
        localStorage.removeItem("pendingSearch");
        navigate(`/search?${params}`);
      } else {
        navigate("/");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSendData}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button type="button" onClick={handleLanguageToggle}>
            {language === "es" ? "EN" : "ES"}
          </button>
        </div>

        <h1 style={{ color: "black" }}>{t("login")}</h1>

        {/* Selector de rol */}
        <div>
          <label style={{ color: "black", marginRight: "1rem" }}>
            <input
              type="radio"
              name="role"
              value="client"
              checked={role === "client"}
              onChange={handleRoleChange}
            />
            Cliente
          </label>

          <label style={{ color: "black" }}>
            <input
              type="radio"
              name="role"
              value="owner"
              checked={role === "owner"}
              onChange={handleRoleChange}
            />
            Owner
          </label>
        </div>

        <input
          type="text"
          placeholder={t("email")}
          value={emailState}
          onChange={handleEmailState}
          required
        />

        <input
          type="password"
          placeholder={t("password")}
          value={passwordState}
          onChange={handlePasswordState}
          required
        />

        <Button text={t("accept")} action={handleSendData} />
        <a href="/register">{t("goRegister")}</a>
      </form>
    </div>
  );
};

export default LoginForm;
