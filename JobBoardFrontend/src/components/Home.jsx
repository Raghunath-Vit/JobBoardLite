import { useEffect, useState, useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import { Backdrop, CircularProgress } from "@mui/material";
import {
  TextField,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Stack,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
// import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DescriptionIcon from "@mui/icons-material/Description";

import { debounce } from "lodash";

function Home() {
  const { searchTerm, searchTrigger } = useContext(SearchContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Fetch jobs based on search query with debounce
  // const fetchJobs = debounce((query) => {
  //   if (!query) {
  //     // If query is empty, don't send the request
  //     return;
  //   }
  //   const url = `http://localhost:8086/api/jobs/search?role=${query}`;
  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log('Fetched Jobs:', data);
  //       setJobs(data);
  //     })
  //     .catch((err) => console.error(err));
  // }, 500); // 500ms debounce delay

  // const fetchJobs = debounce((query) => {
  //   if (!query) return;

  //   const url = `http://localhost:8086/api/jobs/search?role=${query}`;
  //   fetch(url)
  //     .then(async (res) => {
  //       if (!res.ok) {
  //         const errorData = await res.json();
  //         setJobs([]); // clear jobs
  //         setErrorMessage(errorData.message || 'Something went wrong.');
  //         return;
  //       }
  //       const data = await res.json();
  //       setJobs(data);
  //       setErrorMessage('');
  //     })
  //     .catch((err) => {
  //       setJobs([]);
  //       setErrorMessage('Failed to fetch jobs.');
  //       console.error(err);
  //     });
  // }, 500);

  const fetchJobs = debounce((query) => {
    if (!query) return;
    setLoading(true);
    const url = `http://localhost:8086/api/jobs/search?role=${query}`;
    fetch(url)
      .then(async (res) => {
        setLoading(false);
        if (!res.ok) {
          const errorData = await res.json();
          setJobs([]);
          setErrorMessage(errorData.message || "Something went wrong.");
          return;
        }
        const data = await res.json();
        setJobs(data);
        setErrorMessage("");
      })
      .catch((err) => {
        setLoading(false);
        setJobs([]);
        setErrorMessage("Failed to fetch jobs.");
        console.error(err);
      });
  }, 500);

  // useEffect(() => {
  //   if (searchTerm) {
  //     fetchJobs(searchTerm); // Fetch jobs when searchTerm changes
  //   } else {
  //     setErrorMessage('');
  //     // Fetch all jobs when no search term is entered
  //     fetch('http://localhost:8086/api/jobs')
  //       .then((res) => res.json())
  //       .then((data) => setJobs(data))
  //       .catch((err) => {console.error(err);
  //       setErrorMessage('Failed to fetch jobs.');});
  //   }
  // }, [searchTrigger]); // Run the effect when the `searchTerm` value changes

  useEffect(() => {
    if (searchTerm) {
      fetchJobs(searchTerm);
    } else {
      setErrorMessage("");
      setLoading(true);
      fetch("http://localhost:8086/api/jobs")
        .then((res) => res.json())
        .then((data) => {
          setJobs(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setErrorMessage("Failed to fetch jobs.");
          setLoading(false);
        });
    }
  }, [searchTrigger]);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div style={{ padding: "2rem" }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            justifyContent: "flex-start",
            ml: 5,
          }}
        >
          {errorMessage && (
            <Typography
              variant="h4"
              sx={{
                ml: 5,
                mt: 3,
                color: "#6a1b9a",
                fontWeight: "bold",
              }}
            >
              {errorMessage}
            </Typography>
          )}
          {jobs.map((job) => (
            <Box
              key={job.id}
              sx={{
                flex: "1 1 calc(33.333% - 32px)",
                maxWidth: "calc(33.333% - 32px)",
                minWidth: "250px",
                my: 2,
              }}
            >
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  padding: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight={600}>
                    {job.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {job.company}
                  </Typography>

                  <Stack spacing={1} mt={2}>
                    <Box display="flex" alignItems="center">
                      <LocationOnIcon fontSize="small" sx={{ mr: 1 }} />
                      <Typography variant="body2">
                        {job.location || "Multiple locations"}
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center">
                      <DescriptionIcon fontSize="small" sx={{ mr: 1 }} />
                      <Typography variant="body2">
                        {job.description?.length > 45
                          ? `${job.description.substring(0, 45)}...`
                          : job.description || "No description"}
                      </Typography>
                    </Box>
                  </Stack>

                  {/* <Chip label="Internship" color="warning" size="small" sx={{ mt: 2 }} /> */}
                  <Chip
                    label="Internship"
                    variant="outlined"
                    size="small"
                    sx={{
                      mt: 2,
                      color: "#6a1b9a",
                      borderColor: "#6a1b9a",
                      backgroundColor: "transparent",
                      fontWeight: 500,
                    }}
                  />
                </CardContent>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  px={2}
                  pb={2}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography
                      variant="body2"
                      sx={{ fontStyle: "italic", color: "gray", mr: 1, ml: 2 }}
                    >
                      Interested?
                    </Typography>

                    <Button
                      variant="contained"
                      onClick={() => navigate(`/jobs/${job.id}`)}
                      size="small"
                      sx={{
                        backgroundColor: "#6a1b9a",
                        "&:hover": { backgroundColor: "#4a148c" },
                        px: 3,
                        py: 0.8,
                        fontWeight: 500,
                        fontSize: "0.9rem",
                        borderRadius: "25px",
                      }}
                    >
                      View Details
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Box>
          ))}
        </Box>
      </div>
    </>
  );
}

export default Home;
