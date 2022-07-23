import { createContext, ReactNode, useContext, useState } from "react"

type modalContext = {
    show: boolean,
    toggleModal: () => void,
    openModal: (content:ReactNode) => void,
    closeModal: () => void,
    modalContent: ReactNode,
}

const modalContextDefault:modalContext = {
    show: false,
    toggleModal(){},
    openModal(){},
    closeModal(){},
    modalContent: '',
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

    const toggleModal = () => {
        console.log('MODAL TOGGLE')
        setShow(show => !show)
    }

    const openModal = (content:ReactNode) => {
        setModalContent(content)
        setShow(true)
    }

    const closeModal = () => {
        setShow(false)
        setModalContent('')
    }

    const value:modalContext = {
        show,
        toggleModal,
        openModal,
        closeModal,
        modalContent,
    }

    return (
        <>
            <ModalContext.Provider value={value}>
                {children}
            </ModalContext.Provider>
        </>
    )
}