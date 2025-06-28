import { useState } from 'react';
import usersApi from '../../Api/userApi';
import "../../styles/ChangePassword.css";
import logo from '../../assets/logo.png';
import { Link } from "react-router-dom";

const ChangePassword = () => {
  const [currentKeyState, setCurrentKeyState] = useState('');
  const [userPassword, setUserPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setCurrentKeyState(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const savedCode = window.localStorage.getItem("tempnumber")

    if (savedCode === currentKeyState) {
      setErrorMsg("");
      const userid = window.localStorage.getItem("userid")
      const userole = window.localStorage.getItem("selectedRole")
      const user = await usersApi.getById(parseInt(userid), userole)

      setUserPassword(`La constraseña de tu usuario es: <strong>${user.password}</strong>`)
      window.localStorage.clear();
    }
    else setErrorMsg("El código no coincide");

  };

  return (
    <div className="changePasswordLayout">
      <div className="particleBackground">
        {[...Array(20)].map((_, i) => (
          <span key={i} style={{ "--i": i }}></span>
        ))}
      </div>

      <div className="logoBox">
        <Link to="/">
          <img src={logo} alt="Logo Propify" className="logoFixed" />
        </Link>
      </div>
      <div className="formContainer">
        <form className="changePasswordForm" onSubmit={handleSubmit}>
          <h1>Revisa tu Email</h1>
          <label htmlFor="current-password">Introducí el código de 6 dígitos.</label>
          <input
            value={currentKeyState}
            onChange={handleChange}
            placeholder="******"
            required
            autoFocus
          />
          <button type="submit">Obtener contraseña</button>
          {errorMsg &&
            <div className="mensajeError">{errorMsg}</div>
          }

        </form>
        {userPassword &&(
          <div className="mensajeExito" dangerouslySetInnerHTML={{ __html: userPassword }} />
        )}
      </div>
    </div>
  );
};

export default ChangePassword;