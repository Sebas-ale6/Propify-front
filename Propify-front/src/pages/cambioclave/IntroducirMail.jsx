import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import env from "../../utils/enviroments";
import usersApi from "../../Api/userApi";
import "../../styles/IntroducirMail.css";
import logo from '../../assets/logo.png';
import { Link } from "react-router-dom";

const IntroducirMail = () => {
  const [email, setEmail] = useState("");
  const [userRoleState, setUserRoleState] = useState("client");
  const [mensaje, setMensaje] = useState("");
  const [esError, setEsError] = useState(false);

  useEffect(() => {
    window.localStorage.setItem("selectedRole", "client");
  }, []);

  useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => setMensaje(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [mensaje]);

  const setUserRole = (role) => {
    window.localStorage.setItem("selectedRole", role);
    setUserRoleState(role);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email ingresado:", email);

    const serviceId = "service_s5allyw";
    const templateId = "template_7e94r4m";
    const publicKey = "7Jc_Zb7xEeC5jNDCw";

    const number = Math.floor(100000 + Math.random() * 900000);
    window.localStorage.setItem("tempnumber", number.toString());

    const templateParams = {
      name: "Propify",
      time: new Date().toLocaleString(),
      message: number.toString(),
      email: email,
    };

    const user = await usersApi.getByEmail(email, userRoleState)
    console.log("Usuario encontrado:", user);

    if (!user) {
      setMensaje("No se encontró ningún usuario con ese email");
      setEsError(true);
      return
    } else {
      window.localStorage.setItem("userid", user.id.toString())
    }

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        setMensaje("Código enviado correctamente");
        setEsError(false);
        setTimeout(() => {
          window.location.href = `${env.frontUrl}/Recover-Password/Confirm`;
        }, 2500);
      })
      .catch((error) => {
        console.error("Error al enviar el correo:", error);
        setMensaje("Hubo un error al enviar el código");
        setEsError(true);
      });
  };
  return (
    <div className="loginLayout">
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
      <form className="formEmail" onSubmit={handleSubmit}>
        <h1 className="titleClave">  Cambio de contraseña 🔐</h1>

        <h3 className="subtitleRole">Selecciona tu rol</h3>
        <div className="roleButtons">
          <button type="button"
            className={userRoleState === "client" ? "roleButton active" : "roleButton"}
            onClick={() => setUserRole("client")}>Cliente</button>
          <button type="button"
            className={userRoleState === "owner" ? "roleButton active" : "roleButton"}
            onClick={() => setUserRole("owner")}>Owner</button>
          <button type="button"
            className={userRoleState === "sysAdmin" ? "roleButton active" : "roleButton"}
            onClick={() => setUserRole("sysAdmin")}>SysAdmin</button>
        </div>

        <p className="roleText">
          Se buscará entre los usuarios de tipo: <strong>{userRoleState}</strong>
        </p>

        <label className="labelEmail" htmlFor="email">Introduce tu email:</label>
        <input
          className="inputEmail"
          placeholder="ejemplo@correo.com"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
          aria-label="Correo electrónico"
        />
        {mensaje && (
          <div className={esError ? "mensajeError" : "mensajeExito"}>
            {mensaje}
          </div>
        )}

        <button className="submitButtonEmail" type="submit">Enviar código</button>
      </form>
    </div>
  );
};

export default IntroducirMail;