import React, { ReactNode } from 'react'
import { useModal, useMode } from '../../context'
import { MouseEventHandler } from 'react';
import { IconButton } from '../Buttons';
import { AnimatePresence, AnimationProps, motion } from 'framer-motion';
import { LoginModal, LoginConfirmationModal } from './'

interface Props extends  React.HTMLAttributes<HTMLDialogElement>{
    children?: ReactNode,
    isOpen?: boolean
}


const Modal = ({ children, ...rest }:Props) => {
  const { show, closeModal, modalContent, modalType } = useModal()
  const { mode } = useMode()

  const handleOverlayClick:MouseEventHandler = (e) => {
    let id = (e.target as Element).id
    if(id === 'modal_overlay'){
      closeModal()
    }
  }

  const variants = {
    out: {
      
    }
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
        initial={{opacity: 0}} 
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        key="overlay"
        transition={{delayChildren: 1, duration: 0.1}}
        className={`fixed w-screen h-screen bg-black bg-opacity-40 flex justify-center items-center z-40 ${mode} `}
        onClick={handleOverlayClick}
        id="modal_overlay">
            <motion.dialog 
              key="modal" 
              initial={{y: -100, opacity: 0}} 
              animate={{y: 0, opacity: 1}}
              transition={{delay: 0.15}}
              id="modal_dialog" 
              className="w-full h-full  md:w-3/4 md:h-4/5 xl:w-1/2 xl:h-3/4 flex flex-col p-4 surface z-50 md:rounded-xl">
              <div className="flex justify-end">
                <IconButton icon="bi-x" handleClick={closeModal} className="text-3xl rounded-full px-2 py-1"/>
              </div>
              <div>
                {
                  modalType === 'LOGIN' ? 
                    <LoginModal/>:
                  modalType === 'LOGIN_CONFIRMATION' ? 
                    <LoginConfirmationModal/>
                  :
                    'ANOTHER TYPE'
                }
              </div>
            </motion.dialog>
        </motion.div>
      )}

    </AnimatePresence>
  )
}

export default Modal