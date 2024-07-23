import Layout from "../components/Layout";

export default function Usuario() {
  return (
    <Layout titulo="Usuários" subtitulo="Usuários Cadastrados">
      <div className="w-3/4">
        <div className="table w-full">
          <div className="table-header-group ...">
            <div className="table-row">
              <div className="table-cell text-left border-y-white...">#id</div>
              <div className="table-cell text-left ...">Nome</div>
              <div className="table-cell text-left ...">Email</div>
              <div className="table-cell text-left ...">Role</div>
            </div>
          </div>
          <div className="table-row-group">
            <div className="table-row">
              <div className="table-cell ...">1</div>
              <div className="table-cell ...">
                The Sliding Mr. Bones (Next Stop, Pottersville)
              </div>
              <div className="table-cell ...">Malcolm Lockyer</div>
              <div className="table-cell ...">1961</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
