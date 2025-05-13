import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";


import Button from "../buttons/Button";


const RegisterForm = () => {
  const [emailState, setEmailState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [confirmPasswordState, setConfirmPasswordState] = useState("");
  const [usernameState, setUsernameState] = useState("");
  const { t, language, setLanguage } = useLanguage();

const handleLanguageToggle = () => {
  setLanguage(language === "es" ? "en" : "es");
};
  const navigate = useNavigate();

  const handleEmailState = (event) => {
    setEmailState(event.target.value);
  };
  const handlePasswordState = (event) => {
    setPasswordState(event.target.value);
  };
  const handleConfirmPasswordState = (event) => {
    setConfirmPasswordState(event.target.value);
  };
  const handleUsernameState = (event) => {
    setUsernameState(event.target.value);
  };

  const handleSendData = async (event) => {
    try {
      event.preventDefault();

      if (!emailState.includes("@")) {
        throw new Error("Esto no es un mail");
      }
      if (!passwordState) {
        throw new Error("Llena el password");
      }
      if (passwordState !== confirmPasswordState) {
        throw new Error("Las contraseñas no coinciden");
      }
      if (!usernameState) {
        throw new Error("Llena el username");
      }

      const body = {
        username: usernameState,
        email: emailState,
        password: passwordState,
      };

       await Auth.register(body);

      navigate("/"); //

    

      
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="register">
      <form>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button type = "button"onClick={handleLanguageToggle}>
            {language === "es" ? "EN" : "ES"}
          </button>
        </div>
        <h1>{t("register")}</h1>
        <input
          type="text"
          placeholder={t("username")}
          value={usernameState}
          onChange={handleUsernameState}
          required={true}
        />
        <input
          type="text"
          placeholder={t("email")}
          value={emailState}
          onChange={handleEmailState}
          required={true}
        />
        <input
          type="password"
          placeholder={t("password")}
          value={passwordState}
          onChange={handlePasswordState}
          required={true}
        />
        <input
          type="password"
          placeholder={t("confirmPassword")}
          value={confirmPasswordState}
          onChange={handleConfirmPasswordState}
          required={true}
        />

        <Button text={t("accept")} action={handleSendData} />
      </form>
    </div>
  );
};

export default RegisterForm;
