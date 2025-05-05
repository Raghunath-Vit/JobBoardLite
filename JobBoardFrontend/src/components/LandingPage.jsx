import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { Backdrop, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const LandingPage = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const handleGetStarted = () => {
    navigate("/home");
  };

  if (loading) {
    return (
      <Backdrop
        open={true}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#fafafa",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        py: 10,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h3"
                component="h1"
                sx={{ fontWeight: "bold", color: "#4a148c", mb: 2 }}
              >
                Welcome to JobPortal
              </Typography>
              <Typography variant="h6" sx={{ mb: 3, color: "#555" }}>
                Connecting talent with opportunity. Whether you're looking to
                hire skilled professionals or seeking your next dream job,
                JobPortal makes it easy.
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={handleGetStarted}
                sx={{
                  backgroundColor: "#6a1b9a",
                  borderRadius: "8px",
                  px: 4,
                  py: 1.5,
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#4a148c",
                  },
                }}
              >
                Get Started
              </Button>
            </motion.div>
          </Grid>

          {/* <Grid item xs={12} md={6}>
            <motion.img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Job Portal Illustration"
              style={{ width: '100%', maxWidth: '400px', display: 'block', margin: '0 auto' }}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
          </Grid> */}
          {/* <Grid item xs={12} md={6}>
  <motion.div
    initial={{ x: 50, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.8 }}
    style={{ textAlign: 'center' }}
  >
    <img
      src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
      alt="Job Portal Illustration"
      style={{ width: '100%', maxWidth: '350px', margin: '0 auto' }}
    />

    <Box
      sx={{
        mt: 4,
        backgroundColor: '#ffffff',
        p: 3,
        borderRadius: 2,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        textAlign: 'left',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#6a1b9a', mb: 1 }}>
        Why Choose Us?
      </Typography>
      <Typography variant="body1" sx={{ color: '#555', mb: 1 }}>
        ✅ Post and find jobs easily.
      </Typography>
      <Typography variant="body1" sx={{ color: '#555', mb: 1 }}>
        ✅ Trusted by professionals and recruiters.
      </Typography>
      <Typography variant="body1" sx={{ color: '#555' }}>
        ✅ Seamless booking & communication system.
      </Typography>
    </Box>
  </motion.div>
</Grid> */}

          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "center",
                  justifyContent: { xs: "center", md: "flex-start" },
                  gap: 3,
                  flexWrap: "wrap",
                }}
              >
                <Box>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    alt="Job Portal Illustration"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    backgroundColor: "#ffffff",
                    p: 3,
                    borderRadius: 2,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    textAlign: "left",
                    maxWidth: 300,
                    ml: { md: 28 },
                    mt: { xs: 5, md: 18 },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#6a1b9a", mb: 1 }}
                  >
                    Why Choose Us?
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#555", mb: 1 }}>
                    ✅ Post and find jobs easily.
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#555", mb: 1 }}>
                    ✅ Trusted by professionals and recruiters.
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#555" }}>
                    ✅ Seamless booking & communication system.
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage;
