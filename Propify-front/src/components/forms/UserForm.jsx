const UserForm = ({ type, role }) => {

  return (
    <form action="">
        <h2>{ type === "create" ? "Crear usuario" : "Editar usuario" }</h2>
      <input placeholder="Nombre" type="text" name="name"></input>
      <input placeholder="Apellido" type="text" name="surname"></input>
      <input placeholder="Email" type="email" name="email"></input>
      <input placeholder="Contraseña" type="password" name="password"></input>
      {type === "create" ? <select name="role" defaultValue={role}>
          <option value={role}>{role}</option>
      </select>
       :  
      <select name="role" defaultValue={role}>
        <option value="cliente">Cliente</option>
        <option value="propietario">Propietario</option>
        <option value="SysAdmin">SysAdmin</option>
      </select>
      }
      {role === "Cliente" ? null : (
        <div>
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
