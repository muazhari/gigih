import {Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay,} from '@chakra-ui/react'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../slices/Store.ts";
import messageSlice, {MessageState} from "../../slices/MessageSlice.ts";

export default function MessageModalComponent() {

    const messageState: MessageState = useSelector((state: RootState) => state.message);
    const dispatch = useDispatch()

    const handleOnClose = () => {
        dispatch(messageSlice.actions.set({
            isShow: false,
            type: undefined,
            message: undefined,
        }))
    }

    return (
        <Modal isOpen={messageState.isShow!} onClose={handleOnClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>
                    {
                        {
                            success: "Success",
                            error: "Error",
                            warning: "Warning",
                            info: "Info",
                        }[messageState.type!]
                    }
                </ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    {messageState.message}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
