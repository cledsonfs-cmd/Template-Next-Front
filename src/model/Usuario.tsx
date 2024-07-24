import Role from "./Role";

export default interface Usuario {
  uid: string;
  email: string;
  nome: string;
  token: string;
  provedor: string;
  imagemUrl: string;
  role: Role;
}
