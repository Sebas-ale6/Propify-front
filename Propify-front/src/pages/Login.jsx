import LoginForm from "../components/forms/LoginForm.jsx";
import cabinImage from "../assets/cabin.png";
import "../styles/LoginStyle.css";



const LoginPage = () => {

    return (
      <div className="login-container">
        <img src={cabinImage} alt="Fondo de login" className="background-image" />
        <LoginForm />
      </div>
    );
  };
  
  export default LoginPage;
  