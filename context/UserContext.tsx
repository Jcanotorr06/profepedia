import { AuthChangeEvent, Session } from "@supabase/supabase-js"
import { useRouter } from "next/router"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { supabase } from "../utils/supabaseClient"

type userContext = {
    user: any,
    session: Session|null,
    loading: boolean,
    message?: string,
    error?: string,
    login: (email:string) => void,
    logout: () => void
}

const userContextDefault:userContext = {
    user: null,
    session: null,
    loading: false,
    login(email:string) {
        
    },
    logout() {
        
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
    const [user, setUser] = useState<any>(null)
    const [session, setSession] = useState<Session|null>(null)
    const [error, setError] = useState<any>(undefined)
    const [loading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<string|undefined>(undefined)

    const checkUser = async () => {
        const supabaseUser = supabase.auth.user()
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
        const { data } = supabase.auth.onAuthStateChange((event, session) => {
            handleAuthChange(event, session)
            console.log(session)
            if(event === 'SIGNED_IN'){
                setSession(session)
                router.push('/')
            }
            if(event === 'SIGNED_OUT') {
                setSession(null)
            }
            checkUser()
        })
        return () => {
            data?.unsubscribe()
        }
    }, [])

    const login = async (email:string) => {
        setLoading(true)
        const { error, user } = await supabase.auth.signIn({email})
        if(!error){
            console.log(user)
            setMessage("logged_in_msg")
        }else{
            console.error(error)
            setError(error.message)
        }
        setLoading(false)
    }

    const logout = async () => {
        setLoading(true)
        const { error } = await supabase.auth.signOut()
        if(!error) {
            setUser(null)
            setMessage('logged_out_msg')
        }else{
            console.error(error)
            setError(error.message)
        }
        setLoading(false)
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