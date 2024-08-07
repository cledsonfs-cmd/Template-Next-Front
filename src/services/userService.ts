import { api, requestConfig } from "../utils/config";

//Listar
const listar = async (token) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/users/all", config)
      .then((res) => res.json())
      .catch((err) => err);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const roleService = {
  listar,
};

export default roleService;
