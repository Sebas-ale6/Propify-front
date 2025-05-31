import { useState } from "react";
import Button from "../buttons/Button";
import { useLanguage } from "../context/LanguageContext";
import Auth from "../../Api/auth"; // ✅ IMPORTANTE
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

      alert("Login exitoso. Token: " + token);

      localStorage.setItem("token", token);
      
      //traemos todos los owners
      const res = await fetch("http://localhost:5021/api/owner", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("No se pudieron obtener los owners");

      const owners = await res.json();

      // buscamos el owner con el mismo email
      const currentUser = owners.find((owner) => owner.email === emailState);

      if (!currentUser) {
        throw new Error("No se encontró un owner con ese email");
      }

      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      localStorage.setItem("role", "owner");

      // Redirigir
      navigate("/");
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
        <h1 style={{color: "black"}}>{t("login")}</h1>
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