import { useState } from "react";

import Button from "../buttons/Button";
import { useLanguage } from "../context/LanguageContext"







const LoginForm = () => {
    const [emailState, setEmailState] = useState("");
    const [passwordState, setPasswordState] = useState("");
    const { t, language, setLanguage } = useLanguage();
    
    
  
    const handleEmailState = (event) => {
      setEmailState(event.target.value);
    };
    const handlePasswordState = (event) => {
      setPasswordState(event.target.value);
    };

    const handleLanguageToggle = () => {
    setLanguage(language === "es" ? "en" : "es");}
  
    const handleSendData = async(event) => {
      try {
  
        event.preventDefault();
  
        if (!emailState.includes(["@"])) {
          throw new Error("No es un mail");
        }
        if (!passwordState) {
          throw new Error("Llena el password");
        }
  
        const body = {
          email: emailState,
          password: passwordState,
        };
  
      
      } catch (error) {
        alert(error.message);
      }
    };
  
    
  return (
    <div className="login">
      <form>
     <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button type = "button"onClick={handleLanguageToggle}>
            {language === "es" ? "EN" : "ES"}
          </button>
        </div>
        <h1>{t("login")}</h1>
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