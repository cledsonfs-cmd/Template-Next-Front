import { api, requestConfig } from "../../utils/config";
import { createContext, useEffect, useState } from "react";

import Cookies from "js-cookie";
//import firebase from "../../firebase/config";
import Usuario from "../../model/Usuatio";
import router from "next/router";

interface AuthContextProps {
  usuario?: Usuario;
  carregando?: boolean;
  cadastrar?: (
    email: string,
    password: string,
    nome: string,
    role: string
  ) => Promise<void>;
  login?: (email: string, senha: string) => Promise<void>;
  loginGoogle?: () => Promise<void>;
  logout?: () => Promise<void>;
}

interface ErrorRetorno {
  status: string;
  error: any;
  timestamp: any;
}

function errorNormalizado(errorAPI: ErrorRetorno) {
  console.log(errorAPI.status);
  return {
    status: errorAPI.status,
    error: errorAPI.error,
    timestamp: errorAPI.timestamp,
  };
}

const AuthContext = createContext<AuthContextProps>({});

async function usuarioNormalizado(usuarioAPI: any): Promise<Usuario> {
  const token = await usuarioAPI?.token.token;
  return {
    uid: usuarioAPI.uid,
    nome: usuarioAPI.displayName,
    email: usuarioAPI.email,
    token,
    provedor: "teste",
    imagemUrl: usuarioAPI.imageUrl,
  };
}

function gerenciarCookie(logado: boolean) {
  if (logado) {
    Cookies.set("admin-template-auth", logado, {
      expires: 7, //dias
    });
  } else {
    Cookies.remove("admin-template-auth");
  }
}

export function AuthProvider(props) {
  const [carregando, setCarregando] = useState(true);
  const [usuario, setUsuario] = useState<Usuario>(null);

  async function configurarSessao(objeto: any) {
    if (objeto?.email) {
      const usuario = await usuarioNormalizado(objeto);
      setUsuario(usuario);
      gerenciarCookie(true);
      setCarregando(false);
      return usuario.email;
    } else {
      setUsuario(null);
      gerenciarCookie(false);
      setCarregando(false);
      return false;
    }
  }

  async function login(email, password) {
    const data = {
      email,
      password,
    };
    const config = requestConfig("POST", data);
    setCarregando(true);
      const response = await fetch(api + "/users/login", config)
      .then((res)=>res.json());

      if(response?.error){
        setCarregando(false);
        throw new Error(response.error);
      }else{
        configurarSessao(response);
        router.push("/");
      }      
  }

  async function cadastrar(email, password, nome, role) {
    const data = {
      email,
      nome,
      password,
      idstatus: 1,
      role,
    };
    const config = requestConfig("POST", data);
    setCarregando(true);

    const response = await fetch(api + "/users", config)
      .then((res)=>res.json());

      if(response?.error){
        setCarregando(false);
        throw new Error(response.error);
      }else{
        configurarSessao(response);
        router.push("/");
      }      
  }

  async function loginGoogle() {
    try {
      setCarregando(true);
      const resp = null;

      // await firebase
      // .auth()
      // .signInWithPopup(new firebase.auth.GoogleAuthProvider());

      await configurarSessao(resp);
      router.push("/");
    } finally {
      setCarregando(false);
    }
  }

  async function logout() {
    try {
      setCarregando(true);
      await configurarSessao(null);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    //if (Cookies.get("admin-template-auth")) {
    // const cancelar = null; //firebase.auth().onIdTokenChanged(configurarSessao);
    // return () => cancelar();
    //} else {
    setCarregando(false);
    //}
  }, []);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        carregando,
        cadastrar,
        login,
        loginGoogle,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
