import { useContext, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import {
  Box,
  Grid,
  Typography,
  Link,
  Stack,
  IconButton,
  TextField,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import WorkIcon from "@mui/icons-material/Work";
import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HelpIcon from "@mui/icons-material/Help";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { searchTerm, setSearchTerm, setSearchTrigger } =
    useContext(SearchContext);

  const isLoggedIn = false;
  const showSignup = !isLoggedIn;

  const handleLanguageMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleLanguageMenuClose = () => setAnchorEl(null);

  return (
    <Box sx={{ bgcolor: "#4a148c", color: "#fff", py: 2, px: 5 }}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            CareerConnect
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          md={4}
          sx={{ display: "flex", mx: "auto", justifyContent: "center" }}
        >
          <TextField
            fullWidth
            placeholder="Search Jobs"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                setSearchTrigger((prev) => prev + 1);
              }
            }}
            sx={{
              bgcolor: "#fff",
              borderRadius: 1,
              width: { xs: "100%", md: 350 },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {!isMobile && (
          <Grid item>
            <Stack direction="row" spacing={3}>
              {/* <Link href="#" underline="hover" color="inherit" display="flex" alignItems="center">
                <InfoIcon sx={{ mr: 1 }} /> About
              </Link> */}
              <Link
                component={RouterLink}
                to="/"
                underline="hover"
                color="inherit"
                display="flex"
                alignItems="center"
              >
                <InfoIcon sx={{ mr: 1 }} /> About
              </Link>
              <Link
                href="#"
                underline="hover"
                color="inherit"
                display="flex"
                alignItems="center"
              >
                <WorkIcon sx={{ mr: 1 }} /> My Listings
              </Link>
              {!isLoggedIn && showSignup && (
                <Link
                  href="#"
                  underline="hover"
                  color="inherit"
                  display="flex"
                  alignItems="center"
                >
                  <PersonAddIcon sx={{ mr: 1 }} /> Sign Up
                </Link>
              )}
              <IconButton sx={{ color: "#fff", p: 0.5 }}>
                <NotificationsIcon />
              </IconButton>
              <Link
                href="#"
                underline="hover"
                color="inherit"
                display="flex"
                alignItems="center"
              >
                <HelpIcon sx={{ mr: 1 }} /> Help
              </Link>
            </Stack>
          </Grid>
        )}

        {isMobile && (
          <Grid item>
            <IconButton
              sx={{ color: "#fff" }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <MenuIcon />
            </IconButton>
          </Grid>
        )}
      </Grid>

      {isMobile && menuOpen && (
        <Box sx={{ mt: 2, bgcolor: "#6a1b9a", padding: 2, borderRadius: 1 }}>
          <Stack direction="column" spacing={2}>
            <Link
              component={RouterLink}
              to="/"
              underline="hover"
              color="inherit"
            >
              About
            </Link>
            <Link href="#" underline="hover" color="inherit">
              My Listings
            </Link>
            {!isLoggedIn && showSignup && (
              <Link href="#" underline="hover" color="inherit">
                Sign Up
              </Link>
            )}
            <Link href="#" underline="hover" color="inherit">
              Help
            </Link>
            <Link href="#" underline="hover" color="inherit">
              Notifications
            </Link>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Header;
