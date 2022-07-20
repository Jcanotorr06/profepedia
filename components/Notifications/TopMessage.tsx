import { useEffect, useState } from 'react';
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion";
import moment from "moment";
import { IconButton } from "../Buttons"
import { Translate } from "../Translation"


const TopMessage = () => {
  const [show, setShow] = useState<boolean>(false)

  const handleHide = () => {
    setShow(false)
  }

  useEffect(() => {
    //Show top message once every day on first access
    let lastShown = localStorage.getItem("lastShown")
    if(!lastShown || moment(lastShown).startOf('day').isBefore(moment().startOf('day'))){
      setShow(true)
      localStorage.setItem("lastShown", moment().startOf('day').toString())
    }
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
        key="message"
        initial={{y:-100}} 
        animate={{y: 0}}
        className="w-screen max-w-full py-2 px-4 bg-rose-500 text-white flex items-center gap-8 ">
            <div className="font-bold ml-auto text-sm hidden md:block">
                <Translate label="kofi_message"/>
            </div>
            <a 
              href="https://ko-fi.com/profepedia"
              target="blank"
              rel="noref noopener"
              onClick={() => handleHide()}
              className="bg-white px-4 py-1 text-black text-xs shadow-sm rounded-lg border-slate-300 border-2 flex items-center gap-2 hover:bg-slate-100 hover:text-slate-900 hover:no-underline transition-colors">
                <Image src="/landing/kofi.svg" height={20} width={20} alt="kofi logo" layout="intrinsic"/>
                <Translate label="kofi_button"/>
            </a>
            <div className=" ml-auto">
              <IconButton icon="bi-x" className="text-2xl hover:text-slate-200" handleClick={() => handleHide()}/>
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default TopMessage