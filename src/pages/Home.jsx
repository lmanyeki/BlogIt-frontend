import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import CTAButton from '../components/CTAButton';
import image from '../assets/background2.jpg';
const Home = () => {
  return (
    <Box sx={{ minHeight: '40vh' }}>
      
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