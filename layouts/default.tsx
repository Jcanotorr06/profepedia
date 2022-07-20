import { ReactNode } from "react"
import { Footer, MobileNavBar, NavBar } from "../components/Navigation"
import { useMode } from "../context/ModeContext"

type Props = {
    children: ReactNode
}

const DefaultLayout = ({children}:Props) => {

    const { mode } = useMode()

    return (
        <div className={`${mode} gradient-background p-4 min-h-screen`}>
            <NavBar/>
            <main className="pt-4">
                {children}
            </main>
            <Footer/>
        </div>
    )
}

export default DefaultLayout