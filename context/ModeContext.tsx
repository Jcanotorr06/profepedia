import { createContext, ReactNode, useContext, useEffect, useState } from "react"

type modeContext = {
    mode: "light" | "dark",
    swapMode: () => void
}

const modeContextDefault:modeContext = {
    mode: "light",
    swapMode() {
        
    },
}

const ModeContext = createContext<modeContext>(modeContextDefault)

export function useMode() {
    return useContext(ModeContext)
}

type Props = {
    children: ReactNode
}

export function ModeProvider({children}:Props) {
    const [mode, setMode] = useState<"light"|"dark">("light")

    useEffect(() => {
        let cancelled = false
        if(!cancelled){
            let storedMode = localStorage.getItem("mode")
            if(storedMode && (storedMode === 'light' || storedMode === 'dark')){
                setMode(storedMode)
            }else{
                localStorage.setItem("mode", "light")
            }
        }
        return () => {cancelled = true}
    }, [])

    const swapMode = () =>{
        setMode(mode === 'light' ? 'dark' : 'light')
        localStorage.setItem("mode", localStorage.getItem("mode") === 'light' ? "dark" : "light")
        console.log(mode)
    }

    const value:modeContext = {
        mode,
        swapMode
    }

    return (
        <>
            <ModeContext.Provider value={value}>
                {children}
            </ModeContext.Provider>
        </>
    )
}