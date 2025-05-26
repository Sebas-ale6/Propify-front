import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

import Auth from "../../Api/auth";
import Button from "../buttons/Button";


const RegisterForm = () => {
  const [emailState, setEmailState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [confirmPasswordState, setConfirmPasswordState] = useState("");
  const [usernameState, setUsernameState] = useState("");
  const [role, setRole] = useState("client");

  // Nuevos estados para el rol "owner"
  const [cbuState, setCbuState] = useState("");
  const [phoneState, setPhoneState] = useState("");
  const [dniState, setDniState] = useState("");
  const [docTypeState, setDocTypeState] = useState("DNI");

  const { t, language, setLanguage } = useLanguage();
  const navigate = useNavigate();

  const handleLanguageToggle = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  const handleSendData = async (event) => {
    try {
      event.preventDefault();

      if (!emailState.includes("@")) throw new Error("Esto no es un mail");
      if (!passwordState) throw new Error("Llena el password");
      if (passwordState !== confirmPasswordState)
        throw new Error("Las contraseñas no coinciden");
      if (!usernameState) throw new Error("Llena el username");

      // Validaciones extra para owner
      if (role === "owner") {
        if (!cbuState) throw new Error("Falta el CBU");
        if (!dniState) throw new Error("Falta el número de documento");
        if (!docTypeState) throw new Error("Falta el tipo de documento");
        if (!phoneState) throw new Error("Falta el número de teléfono");
      }

      const body = {
        username: usernameState,
        email: emailState,
        password: passwordState,
        role,
        ...(role === "owner" && {
          cbu: cbuState,
          phone: phoneState,
          dni: dniState,
          documentType: docTypeState,
        }),
      };

      await Auth.register(body);

      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSendData}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button type="button" onClick={handleLanguageToggle}>
            {language === "es" ? "EN" : "ES"}
          </button>
        </div>

        <h1>{t("register")}</h1>

        {/* Selección de rol */}
        <div>
          <label>
            <input
              type="radio"
              value="client"
              checked={role === "client"}
              onChange={() => setRole("client")}
            />
            Cliente
          </label>
          <label style={{ marginLeft: "1rem" }}>
            <input
              type="radio"
              value="owner"
              checked={role === "owner"}
              onChange={() => setRole("owner")}
            />
            Owner
          </label>
        </div>

        {/* Datos comunes */}
        <input
          type="text"
          placeholder={t("username")}
          value={usernameState}
          onChange={(e) => setUsernameState(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder={t("email")}
          value={emailState}
          onChange={(e) => setEmailState(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder={t("password")}
          value={passwordState}
          onChange={(e) => setPasswordState(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder={t("confirmPassword")}
          value={confirmPasswordState}
          onChange={(e) => setConfirmPasswordState(e.target.value)}
          required
        />

        {/* Campos adicionales solo si es owner */}
        {role === "owner" && (
          <>
            <input
              type="text"
              placeholder="CBU"
              value={cbuState}
              onChange={(e) => setCbuState(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Teléfono"
              value={phoneState}
              onChange={(e) => setPhoneState(e.target.value)}
              required
            />

            <select
              value={docTypeState}
              onChange={(e) => setDocTypeState(e.target.value)}
              required
            >
              <option value="DNI">DNI</option>
            </select>

            <input
              type="text"
              placeholder="Número de documento"
              value={dniState}
              onChange={(e) => setDniState(e.target.value)}
              required
            />
          </>
        )}

        <Button text={t("accept")} action={handleSendData} />
      </form>
    </div>
  );
};

export default RegisterForm;