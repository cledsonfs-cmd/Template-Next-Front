import { api, requestConfig } from "../../utils/config";
import { createContext, useEffect, useState } from "react";

import Cookies from "js-cookie";
//import firebase from "../../firebase/config";
import Usuario from "../../model/Usuatio";
import router from "next/router";

interface AuthContextProps {
  usuario?: Usuario;
  carregando?: boolean;
  cadastrar?: (email: string, senha: string) => Promise<void>;
  login?: (email: string, senha: string) => Promise<void>;
  loginGoogle?: () => Promise<void>;
  logout?: () => Promise<void>;
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
    try {
      setCarregando(true);
      const res = await fetch(api + "/users/login", config)
        .then((res) => res.json())
        .catch((err) => err);
      await configurarSessao(res);
      router.push("/");
    } finally {
      setCarregando(false);
    }

    // try {
    //         const res = await fetch(api + "/users/login", config)
    //             .then((res) => res.json())
    //             .catch((err) => err);

    //         if (res._id) {
    //             localStorage.setItem("user", JSON.stringify(res));
    //             localStorage.setItem("token", JSON.stringify(res.token));
    //         }
    //         console.log(res)
    //         return res;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // try {
    //     setCarregando(true)
    //     const resp = await firebase.auth().signInWithEmailAndPassword(email, senha)

    //     await configurarSessao(resp.user)
    //     router.push('/')
    // } finally {
    //     setCarregando(false)
    // }
  }

  async function cadastrar(email, senha) {
    try {
      setCarregando(true);
      const resp = null; //= await firebase
      //   .auth()
      //   .createUserWithEmailAndPassword(email, senha);

      await configurarSessao(resp);
      router.push("/");
    } finally {
      setCarregando(false);
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
      //await firebase.auth().signOut();
      await configurarSessao(null);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    if (Cookies.get("admin-template-auth")) {
      const cancelar = null; //firebase.auth().onIdTokenChanged(configurarSessao);
      return () => cancelar();
    } else {
      setCarregando(false);
    }
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
