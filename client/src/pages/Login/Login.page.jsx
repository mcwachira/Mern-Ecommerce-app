import React, { useState } from "react";
import {
    Container,
    Form,
    Wrapper,
    Title,
    Input,
    Button,
    Link,
    Error
} from './Login.styles'
import { login } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
const Login = () => {


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()


    const { isFetching, error } = useSelector((state) => state.user)

    const handleLogin = (e) => {
        e.preventDefault()

        login(dispatch, { email, password })

    }
    return (
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <Form>
                    <Input placeholder="email" type='email' required onChange={(e) => setEmail(e.target.value)} />
                    <Input placeholder="password" type='password' required onChange={(e) => setPassword(e.target.value)} />
                    <Button onClick={handleLogin} disabled={isFetching}>LOGIN</Button>
                    <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
                    <Link>CREATE A NEW ACCOUNT</Link>
                    {error && <Error>
                        something went wrong .. error
                    </Error>}

                </Form>
            </Wrapper>
        </Container>
    );
};

export default Login;