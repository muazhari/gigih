import {useDispatch, useSelector} from "react-redux";
import {AuthenticationState} from "../../slices/AuthenticationSlice.ts";
import {RootState} from "../../slices/Store.ts";
import domainSlice, {DomainState} from "../../slices/DomainSlice.ts";
import "./index.scss"
import {Button, Card, CardBody, CardHeader, FormControl, Heading, Input, Text} from "@chakra-ui/react";
import {useEffect, useRef} from "react";
import VideoService from "../../services/VideoService.ts";
import messageSlice from "../../slices/MessageSlice.ts";
import {useParams} from "react-router-dom";
import VideoProductMapService from "../../services/VideoProductMapService.ts";
import VideoProductMapAggregate from "../../models/aggregates/VideoProductMapAggregate.ts";
import useSocket from "../../hooks/UseSocket.ts";
import OneSocket from "../../sockets/OneSocket.ts";
import JoinRoomRequest from "../../models/value_objects/requests/rooms/JoinRoomRequest.ts";
import Result from "../../models/value_objects/Result.ts";
import SubmitCommentRequest from "../../models/value_objects/requests/comments/SubmitCommentRequest.ts";
import {useFormik} from "formik";
import CommentAggregate from "../../models/aggregates/CommentAggregate.ts";
import Product from "../../models/entities/Product.ts";

export default function VideoPage() {
    const dispatch = useDispatch()
    const authenticationState: AuthenticationState = useSelector((state: RootState) => state.authentication);
    const domainState: DomainState = useSelector((state: RootState) => state.domain);
    const videoService: VideoService = new VideoService();
    const videoProductMapService: VideoProductMapService = new VideoProductMapService();
    const params = useParams()

    useEffect(() => {
        Promise.all([
            videoService.readOneById(params.id!),
            videoProductMapService.readAll(true, {
                videoId: params.id!
            }),
        ])
            .then((responses) => {
                return {
                    video: responses[0].data,
                    videoProductMaps: responses[1].data,
                }
            })
            .then((
                {
                    video,
                    videoProductMaps,
                }
            ) => {
                dispatch(domainSlice.actions.setVideoDomain({
                    video: video.data,
                }))
                const newProducts = videoProductMaps.data.map((videoProductMap) => {
                    return (videoProductMap as VideoProductMapAggregate).product!
                })
                dispatch(domainSlice.actions.setProductDomain({
                    products: newProducts
                }))
                dispatch(domainSlice.actions.setSearchDomain({
                    products: newProducts
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

    const handleClickProduct = (product: Product) => {
        window.open(product.linkUrl!, "_blank")
    }

    const oneSocket = new OneSocket()
    useSocket(
        oneSocket.instance,
        (socket) => {
            socket.connect()
            socket.on("joinedRoom", (result: Result<CommentAggregate[]>) => {
                dispatch(domainSlice.actions.setCommentDomain({
                    comments: result.data
                }))
            })
            socket.emit("joinRoom", new JoinRoomRequest(
                params.id!,
                true
            ))
            socket.on("leftRoom", (result: Result<string>) => {
                if (result.data === params.id!) {
                    dispatch(domainSlice.actions.setCommentDomain({
                        comments: []
                    }))
                }
            })
            socket.on("submittedComment", (result: Result<CommentAggregate>) => {
                dispatch(domainSlice.actions.commentDomainAddComment(result.data))
            })
        },
        (socket) => {
            socket.emit("leaveRoom", params.id!)
            socket.off("joinedRoom")
            socket.off("submittedComment")
            socket.disconnect()
        })

    const commentFormik = useFormik({
        initialValues: new SubmitCommentRequest(
            params.id!,
            authenticationState.user!.username,
            undefined
        ),
        onSubmit: (values) => {
            oneSocket.instance.emit("submitComment", values)
        }
    })

    const commentListBottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        commentListBottomRef.current?.scrollIntoView({behavior: "smooth"})
    }, [domainState.commentDomain!.comments])

    const searchFormik = useFormik({
        initialValues: {
            searchValue: "",
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            dispatch(domainSlice.actions.setSearchDomain({
                products: domainState.productDomain!.products!.filter((product) => {
                    return JSON.stringify(product).toLowerCase().includes(values.searchValue.toLowerCase())
                }),
            }))
        }
    })

    return (
        <div className="page video">
            <Heading className="page-name">
                Video
            </Heading>
            <Heading className="video-id" as="h4" size="md">
                {params.id}
            </Heading>
            <div className="content">
                <div className="products">
                    <form className="search" onSubmit={searchFormik.handleSubmit}>
                        <Input
                            placeholder="Search"
                            name="searchValue"
                            onChange={searchFormik.handleChange}
                            onBlur={searchFormik.handleBlur}
                            onKeyUp={() => searchFormik.submitForm()}
                        />
                    </form>
                    <div className="list">
                        {
                            domainState.searchDomain!.products!.length > 0 ?
                                domainState.searchDomain!.products!.map((product) => {
                                    return (
                                        <Card
                                            key={product._id}
                                            className="product"
                                            onClick={() => handleClickProduct(product)}
                                        >
                                            <CardHeader className="header">
                                                <Heading as="h4" size="md">
                                                    {product.title}
                                                </Heading>
                                            </CardHeader>
                                            <CardBody className="body">
                                                <Text>
                                                    Rp. {product.price}
                                                </Text>
                                            </CardBody>
                                        </Card>
                                    )
                                })
                                :
                                <Heading as="h4" size="md">
                                    No products
                                </Heading>
                        }
                    </div>
                </div>
                <div className="video">
                    <iframe
                        src={domainState.videoDomain?.video?.contentUrl ?? ""}
                        allowFullScreen
                    />
                </div>
                <div className="comments">
                    <div className="list">
                        {
                            domainState.commentDomain!.comments!.length > 0 ?
                                domainState.commentDomain!.comments!
                                    .slice()
                                    .sort((a, b) => {
                                        return new Date(a.timestamp!).getTime() - new Date(b.timestamp!).getTime()
                                    })
                                    .map((comment) => {
                                        return (
                                            <Card
                                                key={comment._id}
                                                className="comment"
                                            >
                                                <CardBody className="body">
                                                    <Text className="username">
                                                        {comment.user!.username}
                                                    </Text>
                                                    <Text className="content">
                                                        {comment.content}
                                                    </Text>
                                                    <Text className="timestamp">
                                                        {new Date(comment.timestamp!).toLocaleString()}
                                                    </Text>
                                                </CardBody>
                                            </Card>
                                        )
                                    })
                                :
                                <Heading as="h4" size="md">
                                    No comments
                                </Heading>
                        }
                        <div ref={commentListBottomRef} className="bottom"/>
                    </div>
                    <div className="submission">
                        <form onSubmit={commentFormik.handleSubmit}>
                            <FormControl>
                                <Input
                                    name="content"
                                    onChange={commentFormik.handleChange}
                                    onBlur={commentFormik.handleBlur}
                                />
                            </FormControl>
                            <Button type="submit">
                                Submit
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

