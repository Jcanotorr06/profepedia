import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from "framer-motion"
import { useModal, useMode, useUser, useSearch } from "../../context"
import { TextButton, IconButton, ModeSwitchButton } from "../Buttons"
import { LanguageDropdown, Translate } from "../Translation"
import { useIntl } from "react-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormEvent, useState } from 'react';
import Logo from '../../public/logo.svg'
import { LoginModal } from "../Modals";
import { toast } from "react-toastify";

interface SearchInput {
  prof: string
}

const NavBar = () => {

  const intl = useIntl()
  const route = useRouter()
  const { register, handleSubmit:formHandleSubmit, formState } = useForm<SearchInput>()
  const { mode, swapMode } = useMode()
  const { user, logout } = useUser()
  const { openModal } = useModal()
  const { handleSearch, previousQuery, query:_query } = useSearch()

  const handleSubmit:SubmitHandler<SearchInput> = (data) => {
    handleSearch(data.prof)
  }

  const handleLogout = async () => {
    await logout()
      .then(res => {
        if(res){
          toast.success(intl.formatMessage({id: "logout_success", defaultMessage: "Sesión cerrada exitosamente."}))
        }else{
          toast.error(intl.formatMessage({id: "logout_error", defaultMessage: "Ha ocurrido un error al cerrar sesión."}))
        }
      })
  }

  const classNames = {
    'light': 'text-yellow-400 hover:text-yellow-500 hover:border-yellow-200 focus:text-yellow-600 focus:border-yellow-300',
    'dark': 'text-indigo-500 hover:text-indigo-300 hover:border-indigo-400 focus:text-indigo-300 focus:border-indigo-500'
  }

  return (
    <nav className="w-full top-0 justify-between items-center align-middle py-2 px-4 border-b hidden lg:flex">
      <Link href="/">
        <a>
          <Image src={Logo} height={40} width={40} alt="logo"/>
        </a>
      </Link>
      <div className="flex gap-4 mr-auto ml-8 text-sm xl:text-base">
        <Link href="/">
          <a>
            <Translate label="home" className={route.route === '/' ? 'font-bold' : ''}/>
          </a>
        </Link>
        <Link href="/about">
          <a>
            <Translate label="about" className={route.route === '/about' ? 'font-bold' : ''}/>
          </a>
        </Link>
        <Link href="/faq">
          <a>
            <Translate label="faq" className={route.route === '/faq' ? 'font-bold' : ''}/>
          </a>
        </Link>
        <Link href="/contacto">
          <a>
            <Translate label="contact" className={route.route === '/contacto' ? 'font-bold' : ''}/>
          </a>
        </Link>
      </div>
      <form name="nav_search_form" className="flex grow-1 px-8 justify-center" onSubmit={formHandleSubmit(handleSubmit)}>
          <div className="flex w-full max-w-xl text-sm input-text gap-2 ground rounded-full">
            <IconButton icon="bi-search" type="submit" className="text-lg mr-3 px-2 rounded-full" rippleClassName="rounded-full"/>
            <input 
              type="text"
              id="nav_search"
              className="flex-1 border-none text-input"
              autoComplete="search_professor"
              placeholder={intl.formatMessage({id: 'search_placeholder', defaultMessage: 'Buscar profesor'})}
              {...register("prof", {required: true, minLength: 2, maxLength: 20, pattern: {value: /^[A-Za-z]+$/, message: "only_letters"}})}/>
          </div>
      </form>
      <div className="flex items-center row gap-5">
        <div className="col-span-1">
          <TextButton 
            text={!user ? "login" : "logout"} 
            className="btn btn-success btn-md button-raised px-8 rounded-full font-bold text-sm xl:text-md" 
            rippleClassName="rounded-full"
            handleClick={() => !user ? openModal("LOGIN") : handleLogout()}/>
        </div>
        <div className="col-span-1">
          <LanguageDropdown/>
        </div>
            <motion.div
            key={`btn-${mode}`}
            initial={{opacity: 1, rotate: 360}}
            animate={{opacity: 1,rotate: 0}}
            >
              <ModeSwitchButton/>
            </motion.div>
      </div>
    </nav>
  )
}

export default NavBar