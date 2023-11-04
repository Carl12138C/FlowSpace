import { getUserContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import { Avatar, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import Kirby from "../../../image/Kirby Full.png"

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
