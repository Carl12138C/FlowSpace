import {
  Box,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useRef } from "react";
import { Avatar } from "stream-chat-react";
import { useNavigate } from "react-router-dom";
import Kirby from "../../../image/Desk_Kirby.png";
import { getUserContext } from "../context/AuthContext";

export default function Register() {
  const { setUserData } = getUserContext();
  const navigate = useNavigate();

  const [disabled, setDisabled] = useState(true);
  const [errorCode, setErrorCode] = useState();

  const emailRef = useRef();
  const usernameRef = useRef("");
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const regEx =
    /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/;

  async function registerUser() {
    try {
      const body = {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
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

      const data = await response.json();
      if (response.ok) {
        setUserData({
          email: emailRef.current.value,
          uid: data.user.uid,
          username: usernameRef.current.value,
          streamToken: data.streamToken,
          userTask: { data: [], dateTask: {} },
        });

        navigate("/chat");
      } else {
        setErrorCode(data.errorCode + " / Already Taken");
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
              Create New Account
            </Typography>

            <p>{errorCode}</p>

            <Stack spacing={2}>
              <TextField
                label="Username"
                inputRef={usernameRef}
                onKeyUp={() => {
                  setDisabled(
                    passwordRef.current.value !=
                      confirmPasswordRef.current.value ||
                      passwordRef.current.value.length < 8 ||
                      usernameRef.current.value.length < 4 ||
                      !regEx.test(emailRef.current.value)
                  );
                }}
              />
              <TextField
                label="Email"
                inputRef={emailRef}
                onKeyUp={() => {
                  setDisabled(
                    passwordRef.current.value !=
                      confirmPasswordRef.current.value ||
                      passwordRef.current.value.length < 8 ||
                      usernameRef.current.value.length < 4 ||
                      !regEx.test(emailRef.current.value)
                  );
                }}
              />
              <TextField
                label="Password"
                type="password"
                inputRef={passwordRef}
                onKeyUp={() => {
                  setDisabled(
                    passwordRef.current.value !=
                      confirmPasswordRef.current.value ||
                      passwordRef.current.value.length < 8 ||
                      usernameRef.current.value.length < 4 ||
                      !regEx.test(emailRef.current.value)
                  );
                }}
              />
              <TextField
                label="Confirm Password"
                type="password"
                inputRef={confirmPasswordRef}
                onKeyUp={() => {
                  setDisabled(
                    passwordRef.current.value !=
                      confirmPasswordRef.current.value ||
                      passwordRef.current.value.length < 8 ||
                      usernameRef.current.value.length < 4 ||
                      !regEx.test(emailRef.current.value)
                  );
                }}
              />
              <button disabled={disabled} onClick={registerUser}>
                Sign Up
              </button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
