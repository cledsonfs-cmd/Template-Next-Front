import Link from "next/link";
import useAuth from "../../data/hook/useAuth";

interface PainelButtonProps{
    titulo: string,
    className?: string
    submeter?: (evento: any) => void
}

export default function PainelButton(props: PainelButtonProps) {
    
    return (
        <button className="            
            border
            text-xl 
            font-black 
            md:block            
            md:w-1/2            
            lg:w-1/4
            h-20
            rounded-lg
            hover:bg-gray-200 
            hover:text-gray-700            
            text-gray-200            
        "
        onClick={props.submeter}
        >            
            {props.titulo}            
        </button>
    )
}