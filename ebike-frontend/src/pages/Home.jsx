import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import bgImage from "../assets/ebike.jpg";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      if (role === "ADMIN") {
        navigate("/dashboard");
      } else if (role === "STAFF") {
        navigate("/staff-dashboard");
      }
    }
  }, [navigate]);

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Dark Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: "relative",
          textAlign: "center",
          color: "white",
        }}
      >
        <Typography variant="h2" fontWeight="bold" sx={{ mb: 2 }}>
          E-Bike Inventory System
        </Typography>

        <Typography variant="h6" sx={{ mb: 4 }}>
          Manage stock, sales and analytics easily.
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/login")}
        >
          LOGIN
        </Button>
      </Box>
    </Box>
  );
}

export default Home;
