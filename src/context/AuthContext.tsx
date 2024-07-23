import { api, requestConfig } from "../utils/config";
import { createContext, useEffect, useState } from "react";

import Usuario from "../model/Usuario";
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

const AuthContext = createContext<AuthContextProps>({});

async function usuarioNormalizado(usuarioAPI: any): Promise<Usuario> {
  const token = await usuarioAPI?.token.token;
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

function gerenciarCookie(logado: boolean) {}

export function AuthProvider(props: any) {
  return (
    <AuthContext.Provider value={{}}>{props.children}</AuthContext.Provider>
  );
}

export default AuthContext;
