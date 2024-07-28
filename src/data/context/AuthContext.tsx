import { api, requestConfig } from "../../utils/config";
import { createContext, useEffect, useState } from "react";

import Cookies from "js-cookie";
import Usuario from "../../model/Usuario";
import router from "next/router";

interface AuthContextProps {
  usuario?: Usuario;
  usuarios?: Usuario[];
  carregando?: boolean;
  cadastrar?: (
    email: string,
    password: string,
    nome: string,
    role: string
  ) => Promise<void>;
  login?: (email: string, senha: string) => Promise<void>;
  //loginGoogle?: () => Promise<void>;
  listar?: () => Promise<void>;
  logout?: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({});

async function usuarioNormalizado(usuarioAPI: any): Promise<Usuario> {
  const token = await usuarioAPI?.token?.token;
  return {
    uid: usuarioAPI.uid,
    nome: usuarioAPI.nome,
    email: usuarioAPI.email,
    role: usuarioAPI.role,
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
  const [usuarios, setUsuarios] = useState<Usuario[]>(null);

  async function configurarSessao(objeto: any) {
    if (objeto?.email) {
      const usuario = await usuarioNormalizado(objeto);
      setUsuario(usuario);
      gerenciarCookie(true);
      setCarregando(false);
      localStorage.setItem("token", usuario.token);
      localStorage.setItem("usuario", usuario.nome);
      localStorage.setItem("role", usuario.role.name);
      return usuario.email;
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
      localStorage.removeItem("role");
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
    const response = await fetch(api + "/users/login", config).then((res) =>
      res.json()
    );

    if (response?.error) {
      setCarregando(false);
      throw new Error(response.error);
    } else {
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

    const response = await fetch(api + "/users", config).then((res) =>
      res.json()
    );

    if (response?.error) {
      setCarregando(false);
      throw new Error(response.error);
    } else {
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
      const token = localStorage.getItem("token");
      
      const config = requestConfig("POST", null,token);
      
      const response = await fetch(api + "/users/logout", config).then((res) =>
        res.text
      );      
      await configurarSessao(null);      
      
    } finally {
      setCarregando(false);
    }
  }

  async function listar() {    
    const token = localStorage.getItem('token')
    const config = requestConfig("GET", null, token);
  
    try {
      const response = await fetch(api + "/users/all", config).then((res) =>
        res.json()
      );
      if (response?.error) {
        setUsuarios([]);
        throw new Error(response.error);
      } else {        
        setUsuarios(response);
      }
  
    } catch (error) {
      console.log(error);
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
        usuarios,
        carregando,
        cadastrar,
        login,
        listar,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
