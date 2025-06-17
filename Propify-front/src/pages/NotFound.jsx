import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{
      textAlign: 'center',
      padding: '4rem 1rem',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f3eb',
      animation: 'fadeIn 0.5s ease-in'
    }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>😕  404 </h1>
      <p style={{ fontSize: '1.1rem', color: '#4a3629', marginBottom: '2rem' }}>
        Ups... no encontramos lo que estás buscando.
      </p>
      <Link to="/">
        <button style={{
          padding: '0.7rem 1.5rem',
          backgroundColor: '#4a3629',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: '600',
          fontSize: '1rem',
          transition: 'background-color 0.3s ease'
        }}>
          Volver al inicio
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
