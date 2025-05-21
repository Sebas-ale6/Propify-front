import oven from '../../assets/oven.png';
import wifi from '../../assets/wifi-2.png';
import headset from '../../assets/headphone-mic.png';
import clock from '../../assets/clock-4.png';

const Features = () => {
  return (
    <section className="features-container">
      <div className="feature-box">
        <img src={oven} alt="Cocina" />
        <p>Cocina con todo el equipamiento</p>
      </div>
      <div className="feature-box">
        <img src={wifi} alt="WiFi" />
        <p>Acceso al WiFi con un solo toque</p>
      </div>
      <div className="feature-box">
        <img src={headset} alt="Soporte 24/7" />
        <p>Atención disponible las 24 horas</p>
      </div>
      <div className="feature-box">
        <img src={clock} alt="Late checkout" />
        <p>Solicitud de checkout tardío</p>
      </div>
    </section>
  );
};

export default Features;

