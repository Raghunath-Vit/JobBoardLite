import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ApplyForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", email: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    window.scrollTo({ top: 0, behavior: "smooth" });

    setLoading(true);

    const payload = {
      jobId: id,
      fullName: form.fullName,
      email: form.email,
    };

    try {
      const response = await fetch("http://localhost:8086/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success("Application submitted successfully!", {
          onClose: () => navigate("/home"),
          autoClose: 2000,
        });
      } else {
        const err = await response.json();
        toast.error(`Submission failed: ${err.message}`);
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while submitting.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <ToastContainer />

      {/* Backdrop for loading */}
      <Backdrop
        open={loading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 4,
          width: "100%",
          maxWidth: 500,
          backgroundColor: "#ffffff",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          align="center"
          sx={{ fontWeight: "bold", color: " #4a148c" }}
        >
          Apply Now
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Job ID"
            value={id}
            disabled
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
          />

          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button
              variant="contained"
              type="submit"
              size="large"
              disabled={loading}
              sx={{
                backgroundColor: "#6a1b9a",
                "&:hover": { backgroundColor: "#4a148c" },
                px: 5,
                py: 1.5,
                fontWeight: "bold",
                fontSize: "1rem",
                borderRadius: "30px",
              }}
            >
              Submit Application
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}

export default ApplyForm;
