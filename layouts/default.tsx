import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { ReactNode } from "react"
import { Modal } from "../components/Modals"
import { Footer, /* MobileNavBar, NavBar */ } from "../components/Navigation"
import { useMode } from "../context"

const NavBar = dynamic(() => import('../components/Navigation/NavBar'),{ssr:false})
const MobileNavBar = dynamic(() => import('../components/Navigation/MobileNavBar'),{ssr:false})

type Props = {
    children: ReactNode
}

const DefaultLayout = ({children}:Props) => {

    const { mode } = useMode()
    const router = useRouter()

    return (
    <>
        <div className={`${mode} body h-full flex flex-col`}>
            <header className="w-full">
                <NavBar/>
                <MobileNavBar/>
            </header>
            <main className={`grow ${router.route !== '/' && 'py-4 mx-auto container'}`}>
                {children}
            </main>
            <Footer/>
        </div>
    </>
    )
}

export default DefaultLayout