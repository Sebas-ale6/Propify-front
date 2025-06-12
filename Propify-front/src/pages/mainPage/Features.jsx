import oven from '../../assets/oven.png';
import wifi from '../../assets/wifi-2.png';
import headset from '../../assets/headphone-mic.png';
import clock from '../../assets/clock-4.png';
import { useLanguage } from "../../components/context/LanguageContext";

const Features = () => {
   const { t } = useLanguage();
  
  return (
        <section className="features-container">
      <div className="feature-box">
        <img src={oven} alt={t("featureKitchen")} />
        <p>{t("featureKitchen")}</p>
      </div>
      <div className="feature-box">
        <img src={wifi} alt={t("featureWifi")} />
        <p>{t("featureWifi")}</p>
      </div>
      <div className="feature-box">
        <img src={headset} alt={t("featureSupport")} />
        <p>{t("featureSupport")}</p>
      </div>
      <div className="feature-box">
        <img src={clock} alt={t("featureLateCheckout")} />
        <p>{t("featureLateCheckout")}</p>
      </div>
    </section>
  );
};

export default Features;

