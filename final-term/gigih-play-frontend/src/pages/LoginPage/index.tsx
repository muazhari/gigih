import "./index.scss"
import authenticationSlice, {AuthenticationState} from "../../slices/AuthenticationSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../slices/Store.ts";
import {NavLink, useNavigate} from "react-router-dom";
import AuthenticationService from "../../services/AuthenticationService.ts";
import {Button, FormControl, FormLabel, Heading, Input, Text} from "@chakra-ui/react";
import {useFormik} from "formik";
import LoginByUsernameAndPasswordRequest
    from "../../models/value_objects/requests/authentications/LoginByUsernameAndPasswordRequest.ts";
import messageSlice from "../../slices/MessageSlice.ts";

export default function LoginPage() {
    const dispatch = useDispatch()
    const authenticationState: AuthenticationState = useSelector((state: RootState) => state.authentication);
    const navigate = useNavigate()
    const authenticationService = new AuthenticationService()

    const loginFormik = useFormik({
        initialValues: new LoginByUsernameAndPasswordRequest(undefined, undefined),
        onSubmit: (values) => {
            authenticationService
                .login(values)
                .then((response) => {
                    return response.data
                })
                .then((result) => {
                    dispatch(authenticationSlice.actions.login({
                        user: result.data
                    }))
                    navigate("/home")
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
        <div className="page login">
            <Heading>
                Sign In
            </Heading>
            <form onSubmit={loginFormik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        Username
                    </FormLabel>
                    <Input
                        type="text"
                        name="username"
                        onChange={loginFormik.handleChange}
                        onBlur={loginFormik.handleBlur}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>
                        Password
                    </FormLabel>
                    <Input
                        type="password"
                        name="password"
                        onChange={loginFormik.handleChange}
                        onBlur={loginFormik.handleBlur}
                    />
                </FormControl>
                <Button type="submit">
                    Login
                </Button>
            </form>
            <Text>
                Don't have an account? <NavLink to="/authentications/registers">Sign up here</NavLink>
            </Text>
        </div>
    )
}

