import { ReactNode } from "react"
import { Footer, MobileNavBar, NavBar } from "../components/Navigation"
import { useMode } from "../context/ModeContext"

type Props = {
    children: ReactNode
}

const DefaultLayout = ({children}:Props) => {

    const { mode } = useMode()

    return (
        <div className={`${mode} gradient-background min-h-screen h-full flex flex-col`}>
            <header className="w-full">
                <NavBar/>
                <MobileNavBar/>
            </header>
            <main className="pt-4 container mx-auto min-h-full grow">
                {children}
            </main>
            <Footer/>
        </div>
    )
}

export default DefaultLayout