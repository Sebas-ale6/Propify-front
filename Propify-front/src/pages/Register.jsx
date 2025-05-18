
import RegisterForm from "../components/forms/RegisterForm.jsx"
import cabinImage from "../assets/cabin.png";
import "../styles/LoginStyle.css";


const RegisterPage = () => {

  return (
    <div className="login-container">
      <img src={cabinImage} alt="Fondo de login" className="background-image" />
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
