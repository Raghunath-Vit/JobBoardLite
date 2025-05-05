import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Container,
  Chip,
  Box,
  Paper,
  Divider,
  Stack,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8086/api/jobs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched job: ", data);
        setJob(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      <Backdrop
        open={loading}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, color: "#fff" }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {!loading && job && (
        <Container maxWidth="md" sx={{ mt: 5, mb: 6 }}>
          <Paper elevation={4} sx={{ borderRadius: 3, overflow: "hidden" }}>
            <Box
              // #4a148c
              sx={{
                backgroundColor: "#65209b",
                color: "white",
                border: "2px solid white",
                borderRadius: "8px",
                m: 2,
                p: 3,
              }}
            >
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {job.title}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <WorkOutlineIcon fontSize="small" />
                <Typography variant="h6">{job.company}</Typography>
                <LocationOnIcon fontSize="small" />
                <Typography>{job.location}</Typography>
              </Stack>
            </Box>

            <Divider sx={{ mx: 2, borderColor: "#ccc" }} />

            <Box sx={{ p: 4 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" fontWeight="medium" gutterBottom>
                  Full Job Description
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                  {job.description}
                </Typography>
              </Box>
              <Divider />

              {job.salaryRange && (
                <>
                  <Box sx={{ mt: 4, mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Salary Range
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <CurrencyRupeeIcon />
                      <Typography variant="body1">{job.salaryRange}</Typography>
                    </Stack>
                  </Box>
                  <Divider />
                </>
              )}

              {job.requiredSkills && job.requiredSkills.length > 0 && (
                <>
                  <Box sx={{ mt: 4, mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Required Skills
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                      {job.requiredSkills.map((skill, index) => (
                        <Chip
                          key={index}
                          label={skill}
                          variant="outlined"
                          sx={{
                            color: "secondary.main",
                            borderColor: "secondary.main",
                            backgroundColor: "transparent",
                            fontWeight: 500,
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                  <Divider />
                </>
              )}

              {job.applicationInstructions && (
                <>
                  <Box sx={{ mt: 4, mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      How to Apply
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontStyle: "italic", color: "text.secondary" }}
                    >
                      {job.applicationInstructions}
                    </Typography>
                  </Box>
                  <Divider />
                </>
              )}

              <Box sx={{ mt: 5, textAlign: "center" }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate(`/apply/${job.id}`)}
                  sx={{
                    backgroundColor: "#6a1b9a",
                    "&:hover": { backgroundColor: "#4a148c" },
                    px: 3,
                    py: 0.8,
                    fontWeight: 750,
                    fontSize: "0.9rem",
                    borderRadius: "25px",
                  }}
                >
                  Apply Now
                </Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      )}
    </>
  );
}

export default JobDetails;
