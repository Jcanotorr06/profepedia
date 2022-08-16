import { createContext, ReactNode, useContext, useState } from "react"
import { modalProps, modalTypes } from "../types/modalTypes"

type modalContext = {
    show: boolean,
    toggleModal: () => void,
    openModal: (type:modalTypes, props?: modalProps) => void,
    closeModal: () => void,
    modalContent: ReactNode,
    modalProps: modalProps | null,
    modalType: modalTypes
}

const modalContextDefault:modalContext = {
    show: false,
    toggleModal(){},
    openModal(){},
    closeModal(){},
    modalContent: '',
    modalProps: null,
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
    const [modalProps, setModalProps] = useState<modalProps|null>(null)

    const toggleModal = () => {
        console.log('MODAL TOGGLE')
        setShow(show => !show)
    }

    const openModal = (type:modalTypes, props?:modalProps) => {
        setModalType(type)
        setModalProps(props ? props : null)
        setShow(true)
    }

    const closeModal = () => {
        setShow(false)
        setModalContent('')
        setModalType('')
        setModalProps(null)
    }

    const value:modalContext = {
        show,
        toggleModal,
        openModal,
        closeModal,
        modalContent,
        modalProps,
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