import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

import Auth from "../../Api/authreg";
import Button from "../buttons/Button";

const RegisterForm = () => {
  const [emailState, setEmailState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [confirmPasswordState, setConfirmPasswordState] = useState("");
  
  //const [usernameState, setUsernameState] = useState("");
  const [role, setRole] = useState("client");

  // Nuevos estados para el rol "owner"
  const [nameState, setNameState] = useState(""); // Nombre
  const [surnameState, setSurnameState] = useState(""); // Apellido
  const [cbuState, setCbuState] = useState("");
  const [phoneState, setPhoneState] = useState("");
  const [docTypeState, setDocTypeState] = useState(1); // 1 = DNI por defecto
  const [dniState, setDniState] = useState("");

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

      // Validaciones extra para owner
      if (role === "owner") {
        if (!nameState) throw new Error("Falta el nombre");
        if (!surnameState) throw new Error("Falta el apellido");
        if (!cbuState) throw new Error("Falta el CBU");
        if (!dniState) throw new Error("Falta el número de documento");
        if (!docTypeState) throw new Error("Falta el tipo de documento");
        if (!phoneState) throw new Error("Falta el número de teléfono");

        const ownerPayload = {
          name: nameState,
          surname: surnameState,
          email: emailState,
          password: passwordState,
          numberPhone: phoneState,
          documentType: docTypeState, // asegurate que sea número
          dni: dniState,
          cvu: parseInt(cbuState),
        };
        await Auth.register(ownerPayload, "owner");
      } else {
        if (!nameState) throw new Error("Falta el nombre");
        if (!surnameState) throw new Error("Falta el apellido");
        const clientPayload = {
          name: nameState,
          surname: surnameState,
          email: emailState,
          password: passwordState,
          numberPhone: phoneState,
          documentType: docTypeState, // asegurate que sea número
          dni: dniState,
        };

        await Auth.register(clientPayload, "client");
      }

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

        <h1 style={{ color: "black" }}>{t("register")}</h1>

        {/* Selección de rol */}
        <div>
          <label style={{ color: "black" }}>
            <input
              type="radio"
              value="client"
              checked={role === "client"}
              onChange={() => setRole("client")}
            />
            Cliente
          </label>
          <label style={{ marginLeft: "1rem", color: "black" }}>
            <input
              type="radio"
              value="owner"
              checked={role === "owner"}
              onChange={() => setRole("owner")}
            />
            Owner
          </label>
        </div>

        {/* Campos para cliente */}
        {role === "client" && (
          <>
            <input
              type="text"
              placeholder={t("name")}
              value={nameState}
              onChange={(e) => setNameState(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder={t("surname")}
              value={surnameState}
              onChange={(e) => setSurnameState(e.target.value)}
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
              onChange={(e) => setDocTypeState(parseInt(e.target.value, 10))}
              required
            >
              <option value={1}>DNI</option>
              <option value={2}>Passport</option>
              <option value={3}>License</option>
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

        {/* Datos comunes */}

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
              placeholder="Nombre"
              value={nameState}
              onChange={(e) => setNameState(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Apellido"
              value={surnameState}
              onChange={(e) => setSurnameState(e.target.value)}
              required
            />

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
              onChange={(e) => setDocTypeState(parseInt(e.target.value, 10))}
              required
            >
              <option value={1}>DNI</option>
              <option value={2}>Passport</option>
              <option value={3}>License</option>
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
