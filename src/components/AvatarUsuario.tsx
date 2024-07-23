import { IconeAdmin } from "../icons";
import Link from "next/link";

interface AvatarUsuarioProps {
  className?: string;
}

export default function AvatarUsuario(props: AvatarUsuarioProps) {
  return (
    <div>
      <Link href="/perfil">
        <img
          src={"/images/avata.svg"}
          alt="Avatr do Usuário"
          className={`
          h-10 w-10 rounded-full cursor-pointer
          ${props.className}
          `}
        />
      </Link>
    </div>
  );
}
