import { useState } from 'react';
import usersApi from '../../Api/userApi';

const ChangePassword = () => {
  const [currentKeyState, setCurrentKeyState] = useState('');
  const [userPassword,setUserPassword] = useState("")

  const handleChange = (e) => {
    setCurrentKeyState(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const savedCode = window.localStorage.getItem("tempnumber")

    if(savedCode===currentKeyState){

        const userid=window.localStorage.getItem("userid")
        const userole=window.localStorage.getItem("selectedRole")
        const user=await usersApi.getById(parseInt(userid),userole)

        

        setUserPassword(`la constraseña de tu usuario es ${user.password}`)
        window.localStorage.clear();
    }
    else{alert("el codigo no coincide")}
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="current-password">Introduce tu clave</label>
      <input
        value={currentKeyState}
        onChange={handleChange}
      />
      <button type="submit">obtener contraseña</button>
      <h3>{userPassword}</h3>
    </form>
  );
};

export default ChangePassword;