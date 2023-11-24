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
import { useRef } from "react";

export default function Home() {
    const UserContext = getUserContext();
    const navigate = useNavigate();

    const emailRef = useRef();
    const passwordRef = useRef();

    async function login() {
        try {
            const body = {
                'email': emailRef.current.value,
                'password': passwordRef.current.value,
            }
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
            if(response.ok) {
                const newUser = await response.json();
                
                if(newUser.user == "") {
                    console.log("Invalid Login Credentials");
                    return;
                }

                UserContext.setUserData({
                    email: emailRef.current.value,
                    uid: newUser.user.uid,
                });
                console.log(newUser.user.uid);
                // navigate("/chat");
            }
        } catch (error) {
            console.log(error.code);
            console.log(error.message);
        }

    }

    async function signUp() {
        try {
            const body = {
                'email': emailRef.current.value,
                'password': passwordRef.current.value,
            }
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
            if(response.ok) {
                const newUser = await response.json();
                
                if(newUser.user == "") {
                    console.log("User Already Exists");
                    return;
                }

                UserContext.setUserData({
                    email: emailRef.current.value,
                    uid: newUser.user.uid,
                });

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
                            <TextField label="Username" inputRef={emailRef} />
                            <TextField
                                label="Password"
                                inputRef={passwordRef}
                            />
                            <button onClick={signUp} style={{ height: "20px" }}>
                                Sign Up
                            </button>
                            <button onClick={login} style={{ height: "20px" }}>
                                Login
                            </button>
                        </Stack>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
}
