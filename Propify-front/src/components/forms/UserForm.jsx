const UserForm = ({ type, role }) => {

  return (
    <form action="">
        <h2>{ type === "create" ? "Crear usuario" : "Editar usuario" }</h2>
      <input placeholder="Usuario" type="text"></input>
      <input placeholder="Email" type="email"></input>
      <input placeholder="Contraseña" type="password"></input>
      <select>
        <option value="cliente">Cliente</option>
        <option value="propietario">Propietario</option>
        <option value="SysAdmin">SysAdmin</option>
      </select>

      {role === "Cliente" ? null : (
        <div>
          <input placeholder="Nombre" type="text"></input>
          <input placeholder="Apellido" type="text"></input>
          <input placeholder="CBU" type="number"></input>
          <select>
            <option value="dni">DNI</option>
            <option value="pasaporte">Pasaporte</option>
          </select>
          <input placeholder="Numero de documento" type="string"></input>
        </div>
      )}

      <div>
        <button>Atras</button>
        {type === "create" ? null : <button>Eliminar</button>}
        <button>Guardar</button>
      </div>
    </form>

  );
};

export default UserForm;
