import "./index.scss"
import {AspectRatio, Button, FormControl, Heading, Image, Input, Text} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import authenticationSlice, {AuthenticationState} from "../../slices/AuthenticationSlice.ts";
import {RootState} from "../../slices/Store.ts";
import {useNavigate, useParams} from "react-router-dom";
import AuthenticationService from "../../services/AuthenticationService.ts";
import UserService from "../../services/UserService.ts";
import {useFormik} from "formik";
import messageSlice from "../../slices/MessageSlice.ts";
import User from "../../models/entities/User.ts";
import {useEffect} from "react";
import domainSlice from "../../slices/DomainSlice.ts";

export default function ProfilePage() {
    const dispatch = useDispatch()
    const authenticationState: AuthenticationState = useSelector((state: RootState) => state.authentication);
    const navigate = useNavigate()
    const authenticationService = new AuthenticationService()
    const domainState = useSelector((state: RootState) => state.domain)
    const userService = new UserService()
    const params = useParams()

    useEffect(() => {
        userService
            .readOneById(params.id!)
            .then((response) => {
                return response.data
            })
            .then((result) => {
                dispatch(domainSlice.actions.setUserDomain({
                    user: result.data
                }))
            })
            .catch((error) => {
                dispatch(domainSlice.actions.setUserDomain({
                    user: undefined
                }))
                dispatch(messageSlice.actions.set({
                    isShow: true,
                    type: "error",
                    message: error.response.data.message
                }))
            })
    }, [params.id])

    const profileFormik = useFormik({
        initialValues: domainState.userDomain?.user === undefined ?
            new User(
                undefined,
                undefined,
                undefined,
                undefined,
            ) : domainState.userDomain!.user,
        enableReinitialize: true,
        onSubmit: (values) => {
            userService
                .patchOneById(values._id!, values)
                .then((response) => {
                    return response.data
                })
                .then((result) => {
                    dispatch(authenticationSlice.actions.login({
                        user: result.data
                    }))
                    dispatch(messageSlice.actions.set({
                        isShow: true,
                        type: "success",
                        message: result.message
                    }))
                })
                .catch((error) => {
                    dispatch(messageSlice.actions.set({
                        isShow: true,
                        type: "error",
                        message: error.response.data.message
                    }))
                })
        }
    })

    return (
        <div className="page profile">
            <Heading className="page-name">
                Profile
            </Heading>
            <AspectRatio
                className="picture"
            >
                <Image
                    src={profileFormik.values.pictureUrl}
                    fallback={<Text>Loading...</Text>}
                />
            </AspectRatio>
            <form onSubmit={profileFormik.handleSubmit}>
                <FormControl>
                    <Input
                        type="text"
                        name="username"
                        onChange={profileFormik.handleChange}
                        onBlur={profileFormik.handleBlur}
                        value={profileFormik.values.username}
                    />
                </FormControl>
                <FormControl>
                    <Input
                        type="text"
                        name="password"
                        onChange={profileFormik.handleChange}
                        onBlur={profileFormik.handleBlur}
                        value={profileFormik.values.password}
                    />
                </FormControl>
                <FormControl>
                    <Input
                        type="text"
                        name="pictureUrl"
                        onChange={profileFormik.handleChange}
                        onBlur={profileFormik.handleBlur}
                        value={profileFormik.values.pictureUrl}
                    />
                </FormControl>
                {
                    (params.id === authenticationState.user!._id) &&
                    <Button type="submit">
                        Submit
                    </Button>
                }
            </form>
        </div>
    )
}
