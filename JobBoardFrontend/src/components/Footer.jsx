import { Box, Grid, Typography, Link, Stack } from '@mui/material';
import AppleIcon from '@mui/icons-material/Apple';
import AndroidIcon from '@mui/icons-material/Android';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#4a148c', color: '#fff', mt: 5, pt: 5 }}>
      <Grid container spacing={4} justifyContent="center" px={5}>
        <Grid item xs={12} sm={6} md={3}>
          <Stack spacing={1}>
            <Link href="#" underline="hover" color="inherit">About us</Link>
            <Link href="#" underline="hover" color="inherit">We're hiring</Link>
            <Link href="#" underline="hover" color="inherit">Hire interns for your company</Link>
            <Link href="#" underline="hover" color="inherit">Post a Job</Link>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Stack spacing={1}>
            <Link href="#" underline="hover" color="inherit">Team Diary</Link>
            <Link href="#" underline="hover" color="inherit">Blog</Link>
            <Link href="#" underline="hover" color="inherit">Our Services</Link>
            <Link href="#" underline="hover" color="inherit">Free Job Alerts</Link>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Stack spacing={1}>
            <Link href="#" underline="hover" color="inherit">Terms & Conditions</Link>
            <Link href="#" underline="hover" color="inherit">Privacy</Link>
            <Link href="#" underline="hover" color="inherit">Contact us</Link>
            <Link href="#" underline="hover" color="inherit">Resume Maker</Link>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Stack spacing={1}>
            <Link href="#" underline="hover" color="inherit">Sitemap</Link>
            <Link href="#" underline="hover" color="inherit">College TPO registration</Link>
            <Link href="#" underline="hover" color="inherit">List of Companies</Link>
            <Link href="#" underline="hover" color="inherit">Jobs for Women</Link>
          </Stack>
        </Grid>
      </Grid>

      <Box mt={4} px={5} display="flex" justifyContent="space-between" flexWrap="wrap" alignItems="center">
        <Stack direction="row" spacing={2}>
          <Box sx={{ bgcolor: '#000', color: '#fff', borderRadius: 1, px: 2, py: 1, display: 'flex', alignItems: 'center' }}>
            <AndroidIcon />
            <Typography variant="body2" ml={1}>Google Play</Typography>
          </Box>
          <Box sx={{ bgcolor: '#000', color: '#fff', borderRadius: 1, px: 2, py: 1, display: 'flex', alignItems: 'center' }}>
            <AppleIcon />
            <Typography variant="body2" ml={1}>App Store</Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2} mt={{ xs: 2, sm: 0 }}>
          <InstagramIcon />
          <TwitterIcon />
          <YouTubeIcon />
          <LinkedInIcon />
        </Stack>
      </Box>

      
      <Box textAlign="center" py={3} mt={5}>
        <Typography variant="body2">
          © Copyright 2025 Raghunath Singh <br />
          (Ascendion Engenerring Private Limited)
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
