import { createContext , useState } from "react";

export const context = createContext()
const { Provider } = context

const CustomProvider = ({children}) => {

    const [modal, setModal] = useState(false)
    const [modalContent, setModalContent] = useState(null)
    //const [callback, setCallback] = useState(null)

    const openModal = (content) => {
        setModal(true)
        setModalContent(content)
    }

    const closeModal = () => {
        setModal(false)
        setModalContent(null)
    }

    const handleOk = (callback) => {
        callback()
    }

    const valorContexto = {
        modal,
        modalContent,
        openModal,
        closeModal,
        //callback,
        //setCallback
        setCallback : handleOk
    }

    return (
        <Provider value={valorContexto}>
            {children}
        </Provider>
    )
}

export default CustomProvider