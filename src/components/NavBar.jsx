import React from 'react';
import { AppBar, Toolbar, Button, Typography, Box, Stack, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';
import logo from '../assets/logo.png';

const Navbar = () => {
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.removeUserInformation);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser();
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#f7ebd3', px: 2 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
      <Box component={RouterLink} sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <Link to="/bloglisting">
            <img src={logo} alt="BlogIt Logo" style={{ height: 40 }} />
        </Link>
      
        <Typography
          component={RouterLink}
          to="/bloglisting"
          variant="h6"
          sx={{ textDecoration: 'none', color: '#800020', fontWeight: 'bold', lineHeight: 1 }}
        >
          BlogIt
        </Typography>
        </Box>
      

        <Stack direction="row" spacing={2} alignItems="center">
          {!user ? (
            <>
              <Button sx={{ color: '#800020' }} component={RouterLink} to="/about">About</Button>
              <Button sx={{ color: '#800020' }} component={RouterLink} to="/login">Log In</Button>
              <Button variant="outlined" sx={{ bgcolor: '#800020', color: '#D4AF37', borderColor: '#D4AF37' }} component={RouterLink} to="/signup">
                Sign Up
              </Button>
            </>
          ) : (
            <>
              <Button sx={{ color: '#800020' }} component={RouterLink} to="/bloglisting">Explore</Button>
              <Button sx={{ color: '#800020' }} component={RouterLink} to="/write">Write</Button>
              <Button sx={{ color: '#800020' }} component={RouterLink} to="/myblogs">My Blogs</Button>
              <Button sx={{ color: '#800020' }} component={RouterLink} to="/articles">Explore</Button>

              <Typography sx={{ color: '#800020', ml: 2 }}>Hi, {user.username}</Typography>

              <Button variant="outlined" sx={{ bgcolor: '#800020', color: '#d4af37', borderColor: 'white' }} onClick={handleLogout}>
                Log Out
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
