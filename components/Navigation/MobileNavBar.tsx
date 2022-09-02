import Image from "next/image"
import Link from "next/link"
import { HTMLMotionProps, motion, SVGMotionProps } from 'framer-motion'
import { IconButton, ModeSwitchButton, TextButton } from "../Buttons"
import { useState } from 'react';
import { LanguageDropdown, Translate } from "../Translation";
import { useModal, useMode, useSearch, useUser } from "../../context";
import { toast } from 'react-toastify';
import { useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form';

interface SearchInput {
  prof: string
}


const MobileNavBar = () => {
  
  const [show, setShow] = useState<boolean>(false)
  const { user, logout } = useUser()
  const { openModal } = useModal()
  const { handleSearch } = useSearch()
  const { mode } = useMode()
  const intl = useIntl()
  const { register, handleSubmit:formHandleSubmit, formState } = useForm<SearchInput>()

  const handleLink = () => {
    setShow(false)
  }

  const handleSubmit:SubmitHandler<SearchInput> = (data) => {
    handleSearch(data.prof)
    setShow(false)
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

  const handleLogin = () => {
    openModal("LOGIN")
    setShow(false)
  }

  const liVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.1
      }
    },
    open: {
      opacity: 1,
      y: "0%",
    }
  }
  return (
    <nav className="w-full top-0 justify-between items-center align-middle py-2 px-4 border-b flex lg:hidden">
      <div className="relative z-20">
        <Link href="/">
          <a onClick={() => handleLink()}>
            <Image src="/logo.svg" height={30} width={30} alt="logo"/>
          </a>
        </Link>
      </div>
      <motion.div
        initial={"closed"}
        animate={show ? "open" : "closed"}
        className="relative"
      >
        <button onClick={() => setShow(!show)} className="z-20 relative bg-transparent">
          <svg width="23" height="23" viewBox="0 0 23 23">
            <motion.path
              fill="transparent"
              strokeWidth="3"
              stroke={`hsl(0, 0%, ${mode === 'light' ? '0' : '100'}%)`}
              strokeLinecap="round"
              variants={{
                closed: { d: "M 2 2.5 L 20 2.5" },
                open: { d: "M 3 16.5 L 17 2.5" }
              }}
            />
            <motion.path
              fill="transparent"
              strokeWidth="3"
              stroke={`hsl(0, 0%, ${mode === 'light' ? '0' : '100'}%)`}
              strokeLinecap="round"
              d="M 2 9.423 L 20 9.423"
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 }
              }}
              transition={{ duration: 0.1 }}
            />
            <motion.path
              fill="transparent"
              strokeWidth="3"
              stroke={`hsl(0, 0%, ${mode === 'light' ? '0' : '100'}%)`}
              strokeLinecap="round"
              variants={{
                closed: { d: "M 2 16.346 L 20 16.346" },
                open: { d: "M 3 2.5 L 17 16.346" }
              }}
            />
          </svg>
        </button>
        <motion.div
        variants={{
          closed: {
            x: "100%",
            transition: {
              type: 'tween'
            }
          },
          open: {
            x: "0%",
            transition: {
              type: 'tween'
            }
          }
        }} 
        className="fixed top-0 left-0 h-screen w-screen text-center surface z-10 pt-16">
            <motion.ul
            variants={{
              closed: {
                transition: {
                  staggerChildren: 0.6,
                  staggerDirection: -1
                }
              },
              open: {
                transition: {
                  delayChildren: 0.5,
                  staggerChildren: 0.5
                }
              }
            }}
            className="flex flex-col items-center w-full gap-10 h-full">
              <motion.li
              key={"key_1"}
                whileTap={{scale: 0.95}}
              >
                <motion.div
                variants={liVariants}>
                  <Link href="/">
                    <a onClick={() => handleLink()}>
                      <Translate label="home" className="text-2xl font-medium"/>
                    </a>
                  </Link>
                </motion.div>
              </motion.li>
              <motion.li
              key={"key_2"}
                whileTap={{scale: 0.95}}
              >
                <motion.div
                variants={liVariants}>
                  <Link href="/about">
                    <a onClick={() => handleLink()}>
                      <Translate label="about" className="text-2xl font-medium"/>
                    </a>
                  </Link>
                </motion.div>
              </motion.li>
              <motion.li
              key={"key_3"}
                whileTap={{scale: 0.95}}
              >
                <motion.div
                variants={liVariants}>
                  <Link href="/faq">
                    <a onClick={() => handleLink()}>
                      <Translate label="faq" className="text-2xl font-medium"/>
                    </a>
                  </Link>
                </motion.div>
              </motion.li>
              <motion.li
              key={"key_4"}
                whileTap={{scale: 0.95}}
              >
                <motion.div
                variants={liVariants}>
                  <Link href="/contacto">
                    <a onClick={() => handleLink()}>
                      <Translate label="contact" className="text-2xl font-medium"/>
                    </a>
                  </Link>
                </motion.div>
              </motion.li>
              <motion.li
              key={"key_0"}
                whileTap={{scale: 0.95}}
                className="w-full px-4"
              >
                <motion.div
                className="w-full"
                variants={liVariants}>
                  <form name="nav_search_form" className="flex grow-1 justify-center w-full" onSubmit={formHandleSubmit(handleSubmit)}>
                      <div className="flex w-full text-sm input-text gap-2">
                        <IconButton icon="bi-search" type="submit" className="text-lg mr-3 px-2 rounded-full" rippleClassName="rounded-full"/>
                        <input 
                          type="text"
                          id="nav_search"
                          className="flex-1 border-none text-input"
                          autoComplete="search_professor"
                          placeholder={intl.formatMessage({id: 'search_placeholder', defaultMessage: 'Buscar profesor'})}
                          {...register("prof", {required: true, minLength: 2, maxLength: 20})}/>
                      </div>
                  </form>
                </motion.div>
              </motion.li>
              <motion.li
              key={"key_5"}
                whileTap={{scale: 0.95}}
                className="w-full px-4"
              >
                <motion.div
                variants={liVariants}
                className="w-full">
                  <TextButton 
                    text={!user ? "login" : "logout"} 
                    className="button-primary button-raised py-3 rounded-full font-bold text-sm w-full" 
                    rippleClassName="rounded-full w-full" 
                    handleClick={() => !user ? handleLogin() : handleLogout()}/>
                </motion.div>
              </motion.li>
              <motion.li
                key={"key_6"}
                whileTap={{scale: 0.95}}
                className="w-full px-4 flex justify-between gap-2">
                <motion.div
                  variants={liVariants}
                  className="flex-auto">
                  <LanguageDropdown/>
                </motion.div>
                <motion.div
                  variants={liVariants}
                  className="flex-1">
                  <motion.div
                    key={`btn-${mode}`}
                    initial={{opacity: 1, rotate: 360}}
                    animate={{opacity: 1,rotate: 0}}
                    >
                      <ModeSwitchButton/>
                  </motion.div>
                </motion.div>
              </motion.li>
              <motion.li
              key={"key_7"}
                whileTap={{scale: 0.95}}
                className="w-full px-4 mt-auto mb-4"
              >
                <motion.div
                variants={liVariants}
                className="w-full flex-col">
                  <div className="font-black">
                    <small>
                      <Link href="/terminos">
                        <a onClick={() => handleLink()}>Terminos y Condiciones</a>
                      </Link>
                    </small>
                    &nbsp;•&nbsp;
                    <small>
                      <Link href="/privacidad">
                        <a onClick={() => handleLink()}>Privacidad</a>
                      </Link>
                    </small>
                    &nbsp;•&nbsp;
                    <small>
                      <Link href="/reglas">
                        <a onClick={() => handleLink()}>Reglas de Uso</a>
                      </Link>
                    </small>
                    &nbsp;•&nbsp;
                    <small>
                      <Link href="/copyright">
                        <a onClick={() => handleLink()}>Copyright</a>
                      </Link>
                    </small>
                    &nbsp;•&nbsp;
                    <small>
                        <a onClick={() => handleLink()} href="https://ko-fi.com/profepedia" target="blank" rel="noref noopener">Donaciones</a>
                    </small>
                  </div>
                </motion.div>
              </motion.li>
            </motion.ul>
        </motion.div>
      </motion.div>
    </nav>
  )
}

export default MobileNavBar