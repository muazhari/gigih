import {useEffect} from "react";
import "./index.scss"
import authenticationSlice, {AuthenticationState} from "../../slices/AuthenticationSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../slices/Store.ts";
import {NavLink, useNavigate} from "react-router-dom";
import AuthenticationService from "../../services/AuthenticationService.ts";
import {Button, FormControl, FormLabel, Heading, Input, Text} from "@chakra-ui/react";
import {useFormik} from "formik";
import RegisterByUsernameAndPasswordRequest
    from "../../models/value_objects/requests/authentications/RegisterByUsernameAndPasswordRequest.ts";
import messageSlice from "../../slices/MessageSlice.ts";

export default function RegisterPage() {
    const dispatch = useDispatch()
    const authenticationState: AuthenticationState = useSelector((state: RootState) => state.authentication);
    const navigate = useNavigate()
    const authenticationService = new AuthenticationService()

    useEffect(() => {
        if (authenticationState.isLoggedIn) {
            navigate("/")
        }
    }, [authenticationState.isLoggedIn])

    const registerFormik = useFormik({
        initialValues: new RegisterByUsernameAndPasswordRequest(undefined, undefined),
        onSubmit: (values) => {
            console.log(values)
            authenticationService
                .register(values)
                .then((response) => {
                    return response.data
                })
                .then((result) => {
                    dispatch(authenticationSlice.actions.register({
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
        <div className="page register">
            <Heading>
                Sign Up
            </Heading>
            <form onSubmit={registerFormik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        Username
                    </FormLabel>
                    <Input
                        type="text"
                        name="username"
                        onChange={registerFormik.handleChange}
                        onBlur={registerFormik.handleBlur}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>
                        Password
                    </FormLabel>
                    <Input
                        type="password"
                        name="password"
                        onChange={registerFormik.handleChange}
                        onBlur={registerFormik.handleBlur}
                    />
                </FormControl>
                <Button type="submit">
                    Register
                </Button>
            </form>
            <Text>
                Do have an account? <NavLink to="/authentications/logins">Sign in here</NavLink>
            </Text>
        </div>
    )
}

