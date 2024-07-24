import { useDispatch, useSelector } from "react-redux";

import Layout from "../components/template/Layout";
import { listar } from "../slices/userSlice";
import { useEffect } from "react";

export default function Usuario() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(listar());
  }, []);
  return (
    <Layout titulo="Usuarios" subtitulo="Usuários Cadastrados">
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
            {users
              ? users.map((usuario) => (
                  <div className="table-row">
                    <div className="table-cell ...">{usuario?.uid}</div>
                    <div className="table-cell ...">{usuario?.nome}</div>
                    <div className="table-cell ...">{usuario?.email}</div>
                    <div className="table-cell ...">{usuario?.role.name}</div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </Layout>
  );
}
