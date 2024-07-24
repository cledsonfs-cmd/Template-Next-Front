import AuthInput from "../components/Auth/AuthInput";
import { IconeAtencao } from "../components/icons";
import useAuth from "../data/hook/useAuth";
import { useState } from "react";

export default function Autenticacao() {
  const { cadastrar, login } = useAuth();

  const [modo, setModo] = useState<"login" | "cadastro">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [erro, setErro] = useState(null);
  const [role, setRole] = useState("ROLE_CUSTOMER");

  function exibirErro(msg, tempoEmSegundos = 5) {
    setErro(msg);
    setTimeout(() => setErro(null), tempoEmSegundos * 1000);
  }

  async function submeter() {
    try {
      if (modo === "login") {
        await login(email, password);
      } else {
        await cadastrar(email, password, nome, role);
      }
    } catch (e) {
      exibirErro(e?.message ?? "Erro desconhecido!");
    }
  }

  function modoCadastrar() {
    setModo("cadastro");
    setEmail("");
    setPassword("");
    setNome("");
    setRole("ROLE_CUSTOMER");
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="hidden md:block md:w-1/2 lg:w-2/3">
        <img
          src="https://random.imagecdn.app/800/600"
          alt="Imagem da Tela de Autenticação"
          className="h-screen w-full object-cover"
        />
      </div>
      <div className="m-10 w-full md:w-1/2 lg:w-1/3">
        <h1 className={`text-3xl font-bold mb-5 `}>
          {modo === "login"
            ? "Entre com Sua Conta"
            : "Cadastre-se na Plataforma"}
        </h1>

        {erro ? (
          <div
            className={`flex items-center
                        bg-red-400 text-white
                        py-3 px-5 my-2 border border-red-700 rounded-lg
                    `}
          >
            {IconeAtencao()}
            <span className="ml-3">{erro}</span>
          </div>
        ) : (
          false
        )}

        <AuthInput
          label="Email"
          tipo="email"
          valor={email}
          valorMudou={setEmail}
          obrigatorio
        />
        <AuthInput
          label="Password"
          tipo="password"
          valor={password}
          valorMudou={setPassword}
          obrigatorio
        />
        <AuthInput
          label="Nome"
          tipo="text"
          valor={nome}
          valorMudou={setNome}
          obrigatorio
          naoRenderizarQuando={modo === "login"}
        />
        {modo === "cadastro" ? (
          <div className="flex flex-col mt-4">
            <label>Role</label>
            <select
              className={`px-4 py-3 rounded-lg bg-gray-200 mt-2 
                    border focus:border-blue-500 focus:bg-white
                    focus:outline-none`}
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="ROLE_CUSTOMER" selected>
                CUSTOMER
              </option>
              <option value="ROLE_ADMINISTRATOR">ADMINISTRATOR</option>
            </select>
          </div>
        ) : null}

        <button
          onClick={submeter}
          className={`
                w-full bg-indigo-500 hover:bg-indigo-400
                text-white rounded-lg px-4 py-3 mt-6
            `}
        >
          {modo === "login" ? "Entrar" : "Cadastar"}
        </button>

        <hr className="my-6 border-gray-300 w-full" />

        {/* <button onClick={loginGoogle} className={`
                w-full bg-red-500 hover:bg-red-400
                text-white rounded-lg px-4 py-3
                `}>
                    Entrar com o Google
                </button> */}
        {modo === "login" ? (
          <p className="mt-8">
            Novo por aqui?
            <a
              onClick={() => modoCadastrar()}
              className={`
                            focus-within:text-blue-500 hover:text-blue-700 
                            font-semibold cursor-pointer                            
                        `}
            >
              {" "}
              Crie uma Conta Gratuitamente
            </a>
          </p>
        ) : (
          <p className="mt-8">
            Já faz parte da nossa comunidade?
            <a
              onClick={() => setModo("login")}
              className={`
                            focus-within:text-blue-500 hover:text-blue-700 
                            font-semibold cursor-pointer                            
                        `}
            >
              {" "}
              Entre com as suas credências
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
