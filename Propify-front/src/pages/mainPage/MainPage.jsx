import { Link } from "react-router-dom";

import "./MainPageStyle.css"
import section1Image from "../../assets/cabin.png"

const MainPage = () => {
    return (
        <div>
            <section className="section-1">
                <img src={section1Image} alt="cabin" className="image-cabin" />
                <nav className="navigation-menu">
                    <h4 className="logo">Nombre</h4>
                    <ul className="nav-links">
                        <li className="language"> <a href="#language">ES</a></li>
                        <li className="log-in"><Link to="/login">Iniciar Sesión</Link></li>
                        <li className="sign-up"><Link to="/register">Registrarse</Link></li>
                        <li className="my-reservations"><a href="#reservations">Mis Reservas</a></li>
                        <li className="my-reservations"> <a href="#reservations">Mis Reservas</a></li>
                    </ul>
                </nav>
                <div className="text-container">
                    <h1>Encuentra Tu Próxima Estadía</h1>
                    <p>Descubrí el lugar perfecto para tu próxima estadía, ya sea por unos días o una temporada completa. Conectamos personas con propiedades que se sienten como en casa.</p>
                </div>
                <div className="search-bar-airbnb">
                    <div className="search-item">
                        <label>Lugar</label>
                        <p>Explorar destinos</p>
                    </div>
                    <div className="search-item">
                        <label>Check-in</label>
                        <p>¿Cuándo?</p>
                    </div>
                    <div className="search-item">
                        <label>Check-out</label>
                        <p>¿Cuándo?</p>
                    </div>
                    <div className="search-item">
                        <label>Viajeros</label>
                        <p>¿Cuántos?</p>
                    </div>
                    <button className="search-button"></button>
                </div>

            </section>
        </div>
    )
}

export default MainPage