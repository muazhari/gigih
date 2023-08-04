import "./index.scss"
import {useDispatch, useSelector} from "react-redux";
import {AuthenticationState} from "../../slices/AuthenticationSlice.ts";
import {RootState} from "../../slices/Store.ts";
import SpotifyContentService from "../../services/SpotifyContentService.ts";
import {DomainState} from "../../slices/DomainSlice.ts";
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";

type CreatePlaylistModalComponentProps = {
    isOpen: boolean,
    onClose: () => void,
    formik: any,
}

export default function CreatePlaylistModalComponent(props: CreatePlaylistModalComponentProps) {
    const {
        isOpen,
        onClose,
        formik
    } = props;

    const dispatch = useDispatch()
    const authenticationState: AuthenticationState = useSelector((state: RootState) => state.authentication);
    const domainState: DomainState = useSelector((state: RootState) => state.domain);
    const spotifyContentService: SpotifyContentService = new SpotifyContentService(authenticationState.accessToken)

    const handleClickSubmit = (event: any) => {
        formik.handleSubmit(event)
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent className="component create-playlist-modal">
                <ModalHeader>Create Playlist</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl>
                            <FormLabel htmlFor="name">Name</FormLabel>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{textAlign: "left"}}
                            />
                        </FormControl>
                    </form>
                </ModalBody>

                <ModalFooter>
                    <Button className="submit" variant="outline" onClick={handleClickSubmit}>
                        Submit
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
