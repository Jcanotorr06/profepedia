import React, { ReactNode } from 'react'
import { useModal } from '../../context'
import { MouseEventHandler } from 'react';
import { IconButton } from '../Buttons';

interface Props extends  React.HTMLAttributes<HTMLDialogElement>{
    children?: ReactNode,
    isOpen?: boolean
}


const Modal = ({ children, ...rest }:Props) => {
  const { show, closeModal, modalContent } = useModal()

  const handleOverlayClick:MouseEventHandler = (e) => {
    let id = (e.target as Element).id
    if(id === 'modal_overlay'){
      closeModal()
    }
  }

  return (
    <div 
    className={`fixed w-screen h-screen bg-black bg-opacity-40 flex justify-center items-center z-40 ${show ? '' : ' hidden'}`}
    onClick={handleOverlayClick}
    id="modal_overlay">
        <dialog id="modal_dialog" className="w-full h-full  md:w-3/4 md:h-4/5 xl:w-1/2 xl:h-3/4 flex flex-col p-4 bg-white z-50">
          <div className="flex justify-end">
            <IconButton icon="bi-x" handleClick={closeModal} className="text-3xl"/>
          </div>
          <div>
            {modalContent} &nbsp;
          </div>
        </dialog>
    </div>
  )
}

export default Modal