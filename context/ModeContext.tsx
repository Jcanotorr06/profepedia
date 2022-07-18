import { createContext, ReactNode, useContext, useState } from "react"

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

    const swapMode = () =>{
        setMode(mode === 'light' ? 'dark' : 'light')
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