import router from 'next/router'
import Cookies from 'js-cookie'
import { createContext, useEffect, useState } from 'react';
import firebase from '../../firebase/config';
import Usuario from '../../model/Usuatio';

interface AuthContextProps {
    usuario?: Usuario
    carregando?: boolean
    cadastrar?: (email: string, senha: string) => Promise<void>
    login?: (email: string, senha: string) => Promise<void>
    loginGoogle?: () => Promise<void>
    logout?: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({})

async function usuarioNormalizado(usuarioFirebase: firebase.User): Promise<Usuario> {
    const token = await usuarioFirebase.getIdToken()
    return {
        uid: usuarioFirebase.uid,
        nome: usuarioFirebase.displayName,
        email: usuarioFirebase.email,
        token,
        provedor: usuarioFirebase.providerData[0].providerId,
        imagemUrl: usuarioFirebase.photoURL
    }
}

function gerenciarCookie(logado: boolean) {
    if (logado) {
        Cookies.set('admin-template-auth', logado, {
            expires: 7 //dias
        })
    } else {
        Cookies.remove('admin-template-auth')
    }

}

export function AuthProvider(props) {
    const [carregando, setCarregando] = useState(true)
    const [usuario, setUsuario] = useState<Usuario>(null)

    async function configurarSessao(usuarioFirebase) {
        if (usuarioFirebase?.email) {
            const usuario = await usuarioNormalizado(usuarioFirebase)
            setUsuario(usuario)
            gerenciarCookie(true)
            setCarregando(false)
            return usuario.email
        } else {
            setUsuario(null)
            gerenciarCookie(false)
            setCarregando(false)
            return false
        }
    }

    async function login(email, senha) {
        try {
            setCarregando(true)
            const resp = await firebase.auth().signInWithEmailAndPassword(email, senha)
    
            await configurarSessao(resp.user)
            router.push('/')            
        } finally {
            setCarregando(false)
        }
    }

    async function cadastrar(email, senha) {
        try {
            setCarregando(true)
            const resp = await firebase.auth().createUserWithEmailAndPassword(email, senha)
    
            await configurarSessao(resp.user)
            router.push('/')            
        } finally {
            setCarregando(false)
        }
    }

    async function loginGoogle() {
        try {
            setCarregando(true)
            const resp = await firebase.auth().signInWithPopup(
                new firebase.auth.GoogleAuthProvider()
            )
    
            await configurarSessao(resp.user)
            router.push('/')            
        } finally {
            setCarregando(false)
        }
    }

    async function logout(){
        try {
            setCarregando(true)
            await firebase.auth().signOut()
            await configurarSessao(null)            
        } finally {
            setCarregando(false)
        }
    }

    useEffect(()=>{
        if(Cookies.get('admin-template-auth')){
            const cancelar = firebase.auth().onIdTokenChanged(configurarSessao)        
            return () => cancelar()
        } else {
            setCarregando(false)
        }
    },[])

    return (
        <AuthContext.Provider value={{
            usuario,
            carregando,
            cadastrar,
            login,
            loginGoogle, 
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext