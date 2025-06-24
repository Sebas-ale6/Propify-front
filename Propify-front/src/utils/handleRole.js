import env from "./enviroments";
import {jwtDecode} from "jwt-decode";

const roleLevels = {
  client: 1,
  owner: 2,
  sysAdmin: 3,
};

const handleRole = (requiredRole) => {
  const requiredLevel = roleLevels[requiredRole];
  if (!requiredLevel) return; 

  const token = window.localStorage.getItem("token");
  if (!token) {
    window.location.href = env.frontUrl + "/";
    return;
  }

  const decodedToken = jwtDecode(token);
  const userRole = decodedToken[
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
  ];

  const userLevel = roleLevels[userRole];

  if (!userLevel || userLevel < requiredLevel) {
    window.location.href = env.frontUrl + "/";
  }
};

export default handleRole;