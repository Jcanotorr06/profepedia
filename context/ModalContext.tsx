import { createContext, ReactNode, useContext, useState } from "react"
import { modalTypes } from "../types/modalTypes"

type modalContext = {
    show: boolean,
    toggleModal: () => void,
    openModal: (type:modalTypes) => void,
    closeModal: () => void,
    modalContent: ReactNode,
    modalType: modalTypes
}

const modalContextDefault:modalContext = {
    show: false,
    toggleModal(){},
    openModal(){},
    closeModal(){},
    modalContent: '',
    modalType: ''
}

const ModalContext = createContext<modalContext>(modalContextDefault)

export function useModal() {
    return useContext(ModalContext)
}

type Props = {
    children: ReactNode
}

export function ModalProvider({children}:Props) {
    const [show, setShow] = useState<boolean>(false)
    const [modalContent, setModalContent] = useState<ReactNode>('')
    const [modalType, setModalType] = useState<modalTypes>('')

    const toggleModal = () => {
        console.log('MODAL TOGGLE')
        setShow(show => !show)
    }

    const openModal = (type:modalTypes) => {
        setModalType(type)
        setShow(true)
    }

    const closeModal = () => {
        setShow(false)
        setModalContent('')
        setModalType('')
    }

    const value:modalContext = {
        show,
        toggleModal,
        openModal,
        closeModal,
        modalContent,
        modalType
    }

    return (
        <>
            <ModalContext.Provider value={value}>
                {children}
            </ModalContext.Provider>
        </>
    )
}