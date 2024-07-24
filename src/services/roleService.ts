import { api, requestConfig } from "../utils/config";

//Listar
const listar = async (token) => {
    const config = requestConfig("GET",null,token);
    
    try {
      const res = await fetch(api + "/roles", config)
        .then((res) => res.json())
        .catch((err) => err);
        
      return res;
    } catch (error) {
      console.log(error);
    }
  };
 
  const roleService = {
    listar,
  };
  
  
  export default roleService;