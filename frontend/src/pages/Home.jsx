import { getUserContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { Avatar, Box, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import Kirby from "../../../image/Desk_Kirby.png"

export default function Home() {
  const UserContext = getUserContext();
  const navigate = useNavigate();

  function login() {
    UserContext.setUserData("boo");
    navigate("/chat");
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
              <TextField label="Username" />
              <TextField label="Password" />
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
