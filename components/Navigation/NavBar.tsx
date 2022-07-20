import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from "framer-motion"
import { useMode, useUser } from "../../context"
import { Button, IconButton } from "../Buttons"
import { LanguageDropdown } from "../Translation"


const NavBar = () => {

  const { mode, swapMode } = useMode()
  const { user } = useUser()
  const route = useRouter()

  const classNames = {
    'light': 'text-yellow-400 hover:text-yellow-500 hover:border-yellow-200 focus:text-yellow-600 focus:border-yellow-300',
    'dark': 'text-indigo-500 hover:text-indigo-300 hover:border-indigo-400 focus:text-indigo-300 focus:border-indigo-500'
  }
  return (
    <nav className="bg-transparent w-full top-0 mb-4 justify-between items-center align-middle py-2 px-4 border-b hidden lg:flex">
      <Link href="/">
        <a>
          <Image src="/logo.svg" height={40} width={40} alt="logo"/>
        </a>
      </Link>
      {
        route.pathname !== '/' && (
          <div>
            Search Bar
          </div>
        )
      }
      <div className="flex items-center row gap-5">
        <div className="col-span-1">
          <Button 
            text={!user ? "login" : "logout"} 
            className="button-primary button-raised px-12 py-2 rounded-full font-bold" 
            handleClick={() => {}}/>
        </div>
        <div className="col-span-1">
          <LanguageDropdown/>
        </div>
            <motion.div
            key={`btn-${mode}`}
            initial={{opacity: 1, rotate: 360}}
            animate={{opacity: 1,rotate: 0}}
            >
              <IconButton
                icon={mode === 'light' ? 'bi-sun-fill' : 'bi-moon-stars-fill'} 
                className={`icon-btn py-2 px-3 rounded-full text-lg border border-transparent ${classNames[mode]}`} 
                handleClick={() => swapMode()}/>
            </motion.div>
      </div>
    </nav>
  )
}

export default NavBar