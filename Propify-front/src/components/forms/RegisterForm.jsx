import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../buttons/Button";


const RegisterForm = () => {
  const [emailState, setEmailState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [confirmPasswordState, setConfirmPasswordState] = useState("");
  const [usernameState, setUsernameState] = useState("");
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

      navigate("/");

      await Auth.register(body);

      window.location.href = `${env.frontUrl}`;

      
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="register">
      <form>
        <h1>Registrate</h1>
        <input
          type="text"
          placeholder="Usuario"
          value={usernameState}
          onChange={handleUsernameState}
          required={true}
        />
        <input
          type="text"
          placeholder="Email"
          value={emailState}
          onChange={handleEmailState}
          required={true}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={passwordState}
          onChange={handlePasswordState}
          required={true}
        />
        <input
          type="password"
          placeholder="Confirma contraseña"
          value={confirmPasswordState}
          onChange={handleConfirmPasswordState}
          required={true}
        />

        <Button text={"Aceptar"} action={handleSendData} />
      </form>
    </div>
  );
};

export default RegisterForm;
