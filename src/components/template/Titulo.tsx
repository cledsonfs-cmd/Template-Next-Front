interface TituloProps {
  titulo: string;
  subtitulo: string;
}

export default function Titulo(props: TituloProps) {
  return (
    <div>
      <h1 className={``}>{props.titulo}</h1>
      <h1 className={``}>{props.subtitulo}</h1>
    </div>
  );
}
