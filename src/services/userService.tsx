import { api, requestConfig } from "../utils/config";

import Usuario from "../model/Usuatio";
import { createContext } from "vm";

const listar = async (token) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/all", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const usuarioService = {
  listar,
};

export default usuarioService;
