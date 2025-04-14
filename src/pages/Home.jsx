import React from 'react';
import { Box, Container, Typography, AppBar, Toolbar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CTAButton from '../components/CTAButton';
import logo from '../assets/logo.png';
import image from '../assets/background2.jpg';
const Home = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <AppBar position="static" sx={{ backgroundColor: 'beige', boxShadow: 'none' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="BlogIt Logo" style={{ height: 40, marginRight: 10 }} />
            <Typography variant="h6" sx={{ color: '#800020', fontWeight: 'bold' }}>
              BlogIt
            </Typography>
          </Box>
          <Box>
            <Button color="inherit" sx={{ color: '#800020', fontWeight: 'bold' }} onClick={() => navigate('/login')}>
              Log In
            </Button>
            <Button variant="contained" sx={{ bgcolor: '#800020', ml: 2 }} onClick={() => navigate('/signup')}>
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{
        bgcolor: '#800020',
        py: 12,
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        textAlign: 'center',
        px: 2
      }}>
        <Container maxWidth="md">
          <Typography variant="h2" sx={{ 
            fontWeight: 800,
            mb: 3,
            lineHeight: 1.2
          }}>
            Share your story with the world
          </Typography>
          <Typography variant="h5" sx={{ 
            mb: 5,
            opacity: 0.9
          }}>
            Drop the mic, Blog It instead
          </Typography>
          <Typography variant="h5" sx={{ 
            mb: 5,
            opacity: 0.9
          }}>
            Where passionate writers meet curious readers. Publish, connect, and grow your audience.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
            <CTAButton variant="contained" to="/signup">
              Start Writing
            </CTAButton>
            <CTAButton variant="outlined" to="/signup">
              Explore Stories
            </CTAButton>
          </Box>
        </Container>
      </Box>
      </Box>
  );
};

export default Home;