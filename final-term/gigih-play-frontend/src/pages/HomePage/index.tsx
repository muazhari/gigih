import {useDispatch, useSelector} from "react-redux";
import authenticationSlice, {AuthenticationState} from "../../slices/AuthenticationSlice.ts";
import {RootState} from "../../slices/Store.ts";
import domainSlice, {DomainState} from "../../slices/DomainSlice.ts";
import "./index.scss"
import {AspectRatio, Button, Card, CardBody, CardHeader, Heading, Text} from "@chakra-ui/react";
import {useEffect} from "react";
import VideoService from "../../services/VideoService.ts";
import messageSlice from "../../slices/MessageSlice.ts";
import { Image } from '@chakra-ui/react'
import {useNavigate} from "react-router-dom";
import Video from "../../models/entities/Video.ts";

export default function HomePage() {
    const dispatch = useDispatch()
    const authenticationState: AuthenticationState = useSelector((state: RootState) => state.authentication);
    const domainState: DomainState = useSelector((state: RootState) => state.domain);
    const videoService: VideoService = new VideoService();
    const navigate = useNavigate()

    useEffect(() => {
        videoService
            .readAll()
            .then ((response) => {
                return response.data
            })
            .then((result) => {
                dispatch(domainSlice.actions.setVideoDomain({
                    videos: result.data
                }))
            })
            .catch((error) => {
                dispatch(messageSlice.actions.set({
                    isShown: true,
                    message: error.response.message,
                    type: "error"
                }))
            })
    }, [])

    const handleClickCard = (video: Video) => {
        navigate(`/videos/${video._id}`)
    }

    return (
        <div className="page home">
            <Heading>
                Home
            </Heading>
            <div className="videos">
                {domainState.videoDomain!.videos!.length > 0 ?
                    domainState.videoDomain!.videos!.map((video) => {
                        return (
                            <Card
                                key={video._id}
                                className="card"
                                onClick={() => handleClickCard(video)}
                            >
                                <CardHeader className="header">
                                    <Heading size='md'>{video._id}</Heading>
                                </CardHeader>
                                <CardBody className="body">
                                    <AspectRatio ratio={1} maxW="100%">
                                        <Image src={video.thumbnailUrl} />
                                    </AspectRatio>
                                </CardBody>
                            </Card>
                        )
                    }) :
                    <Text>
                        No video
                    </Text>
                }
            </div>

        </div>
    )
}

