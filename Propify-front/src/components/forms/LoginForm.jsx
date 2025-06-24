import { useState } from "react";
import Button from "../buttons/Button";
import { useLanguage } from "../context/LanguageContext";
import Auth from "../../Api/auth";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [emailState, setEmailState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const { t, language, setLanguage } = useLanguage();
  const navigate = useNavigate();

  const handleEmailState = (event) => {
    setEmailState(event.target.value);
  };

  const handlePasswordState = (event) => {
    setPasswordState(event.target.value);
  };

  const handleLanguageToggle = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  //  función para decodificar el token y leer su payload
  const parseJwt = (token) => {
    if (!token) return null;
    return JSON.parse(atob(token.split(".")[1]));
  };

  const handleSendData = async (event) => {
    try {
      event.preventDefault();

      if (!emailState.includes("@")) {
        throw new Error("No es un mail");
      }

      if (!passwordState) {
        throw new Error("Llena el password");
      }

      const body = {
        email: emailState,
        password: passwordState,
      };

      const token = await Auth.login(body);
      localStorage.setItem("token", token);

      const tokenData = parseJwt(token);
      const roleClaim =
        tokenData[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];

      if (!roleClaim) {
        throw new Error("El token no contiene el rol");
      }

      let url = "";
      if (roleClaim === "owner") {
        url = "http://localhost:5021/api/owner";
      } else if (roleClaim === "client") {
        url = "http://localhost:5021/api/client";
      } else if (roleClaim === "sysAdmin") {
        url = "http://localhost:5021/api/sysAdmin";
      } else {
        throw new Error("Rol no reconocido");
      }

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("No se pudieron obtener los usuarios");

      const users = await res.json();

      const currentUser = users.find((u) => u.email === emailState);

      if (!currentUser) {
        throw new Error(`No se encontró un ${roleClaim} con ese email`);
      }

      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      localStorage.setItem("role", roleClaim);

      // Redirigir según si hay búsqueda pendiente
      const pendingSearch = localStorage.getItem("pendingSearch");

      if (pendingSearch) {
        const params = new URLSearchParams(JSON.parse(pendingSearch)).toString();
        localStorage.removeItem("pendingSearch");
        navigate(`/search?${params}`);
      } else {
        navigate("/"); // o a home, dashboard, etc.
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login">
      <form>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button type="button" onClick={handleLanguageToggle}>
            {language === "es" ? "EN" : "ES"}
          </button>
        </div>
        <h1 style={{ color: "black" }}>{t("login")}</h1>
        <input
          type="text"
          placeholder={t("email")}
          value={emailState}
          onChange={handleEmailState}
        />
        <input
          type="password"
          placeholder={t("password")}
          value={passwordState}
          onChange={handlePasswordState}
        />
        <Button text={t("accept")} action={handleSendData} />
        <a href="/register">{t("goRegister")}</a>
      </form>
    </div>
  );
};

export default LoginForm;