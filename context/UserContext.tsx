import { AuthChangeEvent, Session } from "@supabase/supabase-js"
import { useRouter } from "next/router"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { supabase } from "../utils/supabaseClient"
import { useModal } from "./ModalContext"

type userContext = {
    user: any,
    session: Session|null,
    loading: boolean,
    message?: string,
    error?: string,
    /**
     * Función que toma como parametro un email para realizar el inicio de sesion. Si el inicio de sesión es exitoso, regresa true, de otra manera, regresa false. 
     * @param {string} email Direccion de correo electronico
     * @returns {Promise<boolean>} true o false
     */
    login: (email:string) => Promise<boolean>
    logout: () => Promise<boolean>
}

const userContextDefault:userContext = {
    user: null,
    session: null,
    loading: false,
    login(email) {
        return new Promise<boolean>((resolve) => {resolve(true)})
    },
    logout() {
        return new Promise<boolean>((resolve) => {resolve(true)})
    },
}

const UserContext = createContext<userContext>(userContextDefault)

export function useUser() {
    return useContext(UserContext)
}

type Props = {
    children: ReactNode
}

export function UserProvider({children}:Props) {
    const router = useRouter()
    const { openModal } = useModal()
    const [user, setUser] = useState<any>(null)
    const [session, setSession] = useState<Session|null>(null)
    const [error, setError] = useState<any>(undefined)
    const [loading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<string|undefined>(undefined)

    const checkUser = async () => {
        const supabaseUser = supabase.auth.user()
        console.log(supabaseUser)
        setUser(supabaseUser)
    } 

    const handleAuthChange = async (event:AuthChangeEvent, session:Session|null) => {
        await fetch('/api/auth', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            credentials: 'same-origin',
            body: JSON.stringify({ event, session })
        })
    }

    useEffect(() => {
        let cancelled = false
        if(!cancelled){
            checkUser()
        }
        return () => {cancelled = true}
    }, [])

    useEffect(() => {
        const { data } = supabase.auth.onAuthStateChange((event, session) => {
            handleAuthChange(event, session)
            console.log(session)
            if(event === 'SIGNED_IN'){
                if(router.route === '/'){
                    router.push('/')
                }
                setSession(session)
            }
            if(event === 'SIGNED_OUT') {
                setSession(null)
            }
            checkUser()
        })
        return () => {
            data?.unsubscribe()
        }
    }, [router])

    const login = (email:string) => {
        return new Promise<boolean>(async (resolve, reject) => {
            setLoading(true)
            const { error, user } = await supabase.auth.signIn({email})
            if(!error) {
                console.log(user)
                resolve(true)
                setLoading(false)
                return
            }else{
                console.error(error)
                resolve(false)
                setLoading(false)
                return
            }
        })
    }

    const logout = async () => {
        return new Promise<boolean>(async (resolve, reject) => {
            setLoading(true)
            const { error } = await supabase.auth.signOut()
            if(!error) {
                setUser(null)
                setMessage('logged_out_msg')
                resolve(true)
                setLoading(false)
                router.push('/')
                return
            }else{
                console.error(error)
                setError(error.message)
                resolve(false)
                setLoading(false)
                return
            }
        })
    }

    const value:userContext = {
        user,
        session,
        loading,
        message,
        error,
        login,
        logout
    }

    return (
        <>
            <UserContext.Provider value={value}>
                {children}
            </UserContext.Provider>
        </>
    )
}