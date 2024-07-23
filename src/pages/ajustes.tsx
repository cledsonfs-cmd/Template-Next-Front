import Layout from "../components/Layout";
import router from "next/router";

export default function Ajustes() {
  const listarUsuarios = () => {
    router.push("/usuario");
  };
  return (
    <Layout
      titulo="Ajustes & Configurações"
      subtitulo="Personalize o sistema por aqui!"
    >
      <div className="flex h-screen items-top justify-left">xxx</div>
    </Layout>
  );
}
