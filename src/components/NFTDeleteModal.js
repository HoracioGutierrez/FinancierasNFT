import { Button } from "antd";
import { useContext } from "react";
import { context } from "./ModalProvider";

const NFTDeleteModal = () => {

    const { closeModal} = useContext(context);

    return (
        <div>
            please confirm
            <Button onClick={closeModal}>cancelar</Button>
        </div>
    )
}

export default NFTDeleteModal
