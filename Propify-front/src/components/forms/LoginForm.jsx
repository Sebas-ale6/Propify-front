import { useState } from "react";

import Button from "../Buttons/Button.jsx";



const LoginForm = () => {
    const [emailState, setEmailState] = useState("");
    const [passwordState, setPasswordState] = useState("");
  
    const handleEmailState = (event) => {
      setEmailState(event.target.value);
    };
    const handlePasswordState = (event) => {
      setPasswordState(event.target.value);
    };
  
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
          <h1>Iniciar Sesión</h1>
          <input
            type="text"
            placeholder="Email"
            value={emailState}
            onChange={handleEmailState}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={passwordState}
            onChange={handlePasswordState}
          />
  
          <Button text={"Aceptar"} action={handleSendData} />
  
          <a href="/register"> Registrate Propify </a>
  
        </form>
      </div>
    );
  };
  
  export default LoginForm;
  