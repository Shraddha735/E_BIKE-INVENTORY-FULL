import bgImage from "../assets/ebike.jpg";

import { Box, Paper, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("/auth/login", {
        email,
        password
      });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);

        if (res.data.role === "ADMIN") {
          navigate("/dashboard");
        } else if (res.data.role === "STAFF") {
          navigate("/staff-dashboard");
        } else {
          navigate("/login");
        }
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${bgImage})`,   // ✅ using your local image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative"
      }}
    >
      {/* Dark Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.55)"
        }}
      />

      <Paper
        elevation={6}
        sx={{
          position: "relative",
          p: 5,
          width: 400,
          borderRadius: 3,
          backdropFilter: "blur(6px)",
          backgroundColor: "rgba(255,255,255,0.95)"
        }}
      >
        <Typography variant="h4" align="center" fontWeight="bold">
          InnovaBike
        </Typography>

        <Typography
          variant="subtitle1"
          align="center"
          sx={{ mb: 3, color: "gray" }}
        >
          E-Bike Inventory System
        </Typography>

        <TextField
          fullWidth
          label="Email"
          sx={{ mb: 2 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          sx={{ mb: 3 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleLogin}
        >
          LOGIN
        </Button>
      </Paper>
    </Box>
  );
}

export default Login;
