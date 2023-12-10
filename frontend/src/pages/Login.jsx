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
    Link,
} from "@mui/material";
import Kirby from "../../../image/Desk_Kirby.png";
import { useRef, useState } from "react";
import { getUserData, getUserTask } from "../FirebaseUtil";

export default function Home() {
    const UserContext = getUserContext();
    const navigate = useNavigate();

    const emailRegex = /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/;

    const emailRef = useRef();
    const passwordRef = useRef();

    const [error, setError] = useState(false);

    async function login() {
        try {
            const body = {
                email: emailRef.current.value,
                password: passwordRef.current.value,
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

                const newUserTask = await getUserTask(newUser.user.uid);

                UserContext.setUserData({
                  email: emailRef.current.value,
                  uid: newUser.user.uid,
                  username: newUser.username,
                  streamToken: newUser.streamToken,
                  userTask: newUserTask ?? {data: [], dateTask:{}},
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
                    width: "100%",
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
                            <TextField
                                data-cy="input-email"
                                label="Email"
                                inputRef={emailRef}
                                error={error}
                                onKeyUp={() => {
                                    setError(
                                        !emailRegex.test(emailRef.current.value)
                                    );
                                }}
                            />
                            <TextField
                                data-cy="input-password"
                                label="Password"
                                type="password"
                                inputRef={passwordRef}
                            />
                            <button
                                data-cy="button-login"
                                onClick={login}
                                style={{ height: "20px" }}
                                disabled={error}
                            >
                                Login
                            </button>
                        </Stack>
                    </CardContent>
                </Card>
                <Link
                    onClick={() => {
                        navigate("register");
                    }}
                    component="button"
                    sx={{ paddingTop: "5px" }}
                >
                    Don't have an account?
                </Link>
            </Box>
        </>
    );
}
