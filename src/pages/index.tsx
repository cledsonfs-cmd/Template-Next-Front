import Layout from "../components/template/Layout";
import useAuth from "../data/hook/useAuth";

export default function Home() {
  const { usuario } = useAuth();
  return (
    <Layout titulo="Pagina Inicial" subtitulo={usuario?.nome}>
      <h3>Conteudo</h3>
    </Layout>
  );
}
