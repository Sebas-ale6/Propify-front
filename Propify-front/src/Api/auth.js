import env from "../utils/enviroment.js"

const Auth = {
    login: async (body) => {
      
        let url = `${env.backUrl}/api/auth/login`;

      
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        };

       
        const request = await fetch(url, options);

        const response = await request.json(); 

        if (response.token) {
            return response.token; // Retorna el token
        }

       
        throw new Error('Error al obtener el token');
    },

    register: async (body) => {
       
        let url = `${env.backUrl}/api/auth`;

        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        };

        
        const request = await fetch(url, options);

       
        const response = await request.json();

        
        return response;
    },
};

export default Auth;