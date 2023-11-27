import { getUserContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import Kirby from "../../../image/Desk_Kirby.png";
import { useRef, useState } from "react";
import { RegisterData, getUserData } from "../FirebaseUtil";

export default function Home() {
    const UserContext = getUserContext();
    const navigate = useNavigate();

    const emailRegex = /[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+/g;

    const emailRef = useRef();
    const passwordRef = useRef();
    const usernameRef = useRef();

    const [error, setError] = useState(false);

    async function login() {
        try {
            const body = {
                email: emailRef.current.value,
                password: passwordRef.current.value,
                username: usernameRef.current.value,
            };
            const response = await fetch(
                import.meta.env.VITE_SERVER + "/firebase/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept-type": "application/json",
                    },
                    body: JSON.stringify(body),
                }
            );
            if (response.ok) {
                const newUser = await response.json();

                if (newUser.user == "") {
                    console.log("Invalid Login Credentials");
                    return;
                }

                UserContext.setUserData({
                    email: emailRef.current.value,
                    uid: newUser.user.uid,
                    streamToken: newUser.streamToken,
                    username: usernameRef.current.value,
                });

                navigate("/chat");
            }
        } catch (error) {
            console.log(error.code);
            console.log(error.message);
        }
    }

    async function signUp() {
        try {
            const body = {
                email: emailRef.current.value,
                password: passwordRef.current.value,
                username: usernameRef.current.value,
            };
            const response = await fetch(
                import.meta.env.VITE_SERVER + "/firebase/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept-type": "application/json",
                    },
                    body: JSON.stringify(body),
                }
            );

            if (response.ok) {
                const newUser = await response.json();

                if (newUser.user == "") {
                    console.log("User Already Exists");
                    return;
                }

                UserContext.setUserData({
                    email: emailRef.current.value,
                    uid: newUser.user.uid,
                    streamToken: newUser.streamToken,
                    username: usernameRef.current.value,
                });

                await RegisterData(newUser.user.uid);
                
                navigate("/chat");
            }
        } catch (error) {
            console.log(error.code);
            console.log(error.message);
        }
    }

    return (
        <>
            <Box
                sx={{
                    width: "100vw",
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, width: 150, height: 150 }} src={Kirby} />
                <Card>
                    <CardContent>
                        <Typography
                            sx={{ fontSize: 28 }}
                            color="text.secondary"
                            gutterBottom
                        >
                            Welcome to FlowSpace
                        </Typography>
                        <Stack spacing={2}>
                            <TextField label="Userame" inputRef={usernameRef} />
                            <TextField
                                label="Email"
                                inputRef={emailRef}
                                error={error}
                                onBlur={() => {
                                    setError(
                                        !emailRegex.test(emailRef.current.value)
                                    );
                                }}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                inputRef={passwordRef}
                            />
                            <button
                                onClick={signUp}
                                style={{ height: "20px" }}
                                disabled={error}
                            >
                                Sign Up
                            </button>
                            <button
                                onClick={login}
                                style={{ height: "20px" }}
                                disabled={error}
                            >
                                Login
                            </button>
                        </Stack>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
}
