import { createContext, ReactNode, useContext, useState } from "react"

type reviewContext = {
    mode: "light" | "dark",
    swapMode: () => void
}

const reviewContextDefault:reviewContext = {
    mode: "light",
    swapMode() {
        
    },
}

const ReviewContext = createContext<reviewContext>(reviewContextDefault)

export function useReview() {
    return useContext(ReviewContext)
}

type Props = {
    children: ReactNode
}

export function ReviewProvider({children}:Props) {
    const [mode, setMode] = useState<"light"|"dark">("light")

    const swapMode = () =>{
        setMode(mode === 'light' ? 'dark' : 'light')
        console.log(mode)
    }

    const value:reviewContext = {
        mode,
        swapMode
    }

    return (
        <>
            <ReviewContext.Provider value={value}>
                {children}
            </ReviewContext.Provider>
        </>
    )
}