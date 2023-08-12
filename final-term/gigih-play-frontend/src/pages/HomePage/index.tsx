import {useDispatch, useSelector} from "react-redux";
import {AuthenticationState} from "../../slices/AuthenticationSlice.ts";
import {RootState} from "../../slices/Store.ts";
import domainSlice, {DomainState} from "../../slices/DomainSlice.ts";
import "./index.scss"
import {AspectRatio, Card, CardBody, CardHeader, Heading, Image, Input, Text} from "@chakra-ui/react";
import {useEffect} from "react";
import VideoService from "../../services/VideoService.ts";
import messageSlice from "../../slices/MessageSlice.ts";
import {useNavigate} from "react-router-dom";
import Video from "../../models/entities/Video.ts";
import {useFormik} from "formik";

export default function HomePage() {
    const dispatch = useDispatch()
    const authenticationState: AuthenticationState = useSelector((state: RootState) => state.authentication);
    const domainState: DomainState = useSelector((state: RootState) => state.domain);
    const videoService: VideoService = new VideoService();
    const navigate = useNavigate()

    useEffect(() => {
        videoService
            .readAll()
            .then((response) => {
                return response.data
            })
            .then((result) => {
                dispatch(domainSlice.actions.setVideoDomain({
                    videos: result.data
                }))
                dispatch(domainSlice.actions.setSearchDomain({
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

    const searchFormik = useFormik({
        initialValues: {
            searchValue: "",
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            dispatch(domainSlice.actions.setSearchDomain({
                videos: domainState.videoDomain!.videos!.filter((video) => {
                    return JSON.stringify(video).toLowerCase().includes(values.searchValue.toLowerCase())
                }),
            }))
        }
    })

    return (
        <div className="page home">
            <Heading className="page-name">
                Home
            </Heading>
            <form className="search" onSubmit={searchFormik.handleSubmit}>
                <Input
                    placeholder="Search"
                    name="searchValue"
                    onChange={searchFormik.handleChange}
                    onBlur={searchFormik.handleBlur}
                    onKeyUp={() => searchFormik.submitForm()}
                />
            </form>
            <div className="videos">
                {domainState.searchDomain!.videos!.length > 0 ?
                    domainState.searchDomain!.videos!.map((video) => {
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
                                        <Image src={video.thumbnailUrl}/>
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

