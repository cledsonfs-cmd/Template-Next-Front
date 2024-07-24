import { IconeAdmin, IconeAjustes, IconeUser } from "../icons";
import Link from "next/link";
import useAuth from "../../data/hook/useAuth";

interface AvatarUsuarioProps {
  className?: string;
}

export default function AvatarUsuario(props: AvatarUsuarioProps) {
  const { usuario } = useAuth();
  return (
    <div>      
      
      <Link href="/perfil">
        {usuario?.role?.name === 'ROLE_ADMINISTRATOR' ? 
          IconeAdmin:
          IconeUser 
        }  
      
      </Link>
    </div>
  );
}
