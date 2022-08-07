import { ReactNode } from "react"
import { Modal } from "../components/Modals"
import { Footer, MobileNavBar, NavBar } from "../components/Navigation"
import { useMode } from "../context"

type Props = {
    children: ReactNode
}

const DefaultLayout = ({children}:Props) => {

    const { mode } = useMode()

    return (
    <>
        <div className={`${mode} body h-full flex flex-col`}>
            <header className="w-full">
                <NavBar/>
                <MobileNavBar/>
            </header>
            <main className="py-4 container mx-auto grow">
                {children}
            </main>
            <Footer/>
        </div>
    </>
    )
}

export default DefaultLayout