import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import env from "../../utils/enviroments";
import usersApi from "../../Api/userApi";

const IntroducirMail = () => {
  const [email, setEmail] = useState("");
  const [userRoleState, setUserRoleState] = useState("client");

  useEffect(() => {
    window.localStorage.setItem("selectedRole", "client");
  }, []);

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

    const user=await usersApi.getByEmail(email,userRoleState)

    if(!user){
        alert("no se encontro ningun usuario con ese email")
        return
    }else{
        window.localStorage.setItem("userid",user.id.toString())
    }

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log("Correo enviado:", response.status, response.text);
        window.location.href = `${env.frontUrl}/Recover-Password/Confirm`;
      })
      .catch((error) => {
        console.error("Error al enviar el correo:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Cambio de contraseña</h1>

      <h3>Selecciona tu rol</h3>
      <div>
        <button type="button" onClick={() => setUserRole("client")}>Cliente</button>
        <button type="button" onClick={() => setUserRole("owner")}>Owner</button>
        <button type="button" onClick={() => setUserRole("sysAdmin")}>SysAdmin</button>
      </div>

      <p>Se buscará entre los usuarios de tipo: <strong>{userRoleState}</strong></p>

      <label htmlFor="email">Introduce tu email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <button type="submit">Enviar código</button>
    </form>
  );
};

export default IntroducirMail;