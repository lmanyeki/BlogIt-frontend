import React from 'react';
import { AppBar, Toolbar, Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import useUserStore from '../store/userStore';
import logo from './../assets/logo.png';

const NavBar = () => {
    const user = useUserStore((state) => state.user);
    const removeUserInformation = useUserStore((state) => state.removeUserInformation);

    function handleLogOut() {
        removeUserInformation();
    }

    return (
        <AppBar position="static" elevation={0} sx={{ bgcolor: 'transparent', py: 2 }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
                        <img src={logo} alt="BlogIt Logo" style={{ height: 40, marginRight: 10 }} />
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#800020' }}>
                            BlogIt
                        </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button
                            component={Link}
                            to="/about"
                            sx={{
                                color: '#800020',
                                fontWeight: 500,
                                textTransform: 'none'
                            }}
                        >
                            About BlogIt
                        </Button>
                        {!user ? (
                            <>
                                <Button
                                    component={Link}
                                    to="/login"
                                    variant="outlined"
                                    sx={{
                                        borderColor: '#800020',
                                        color: '#800020',
                                        '&:hover': { bgcolor: 'rgba(128, 0, 32, 0.05)' }
                                    }}
                                >
                                    Log In
                                </Button>
                                <Button
                                    component={Link}
                                    to="/signup"
                                    variant="contained"
                                    sx={{
                                        bgcolor: '#D4AF37',
                                        color: 'white',
                                        '&:hover': { bgcolor: '#c1931a' }
                                    }}
                                >
                                    Sign Up
                                </Button>
                            </>
                        ) : (
                            <>
                                <Typography variant="body1" sx={{ color: '#800020', fontWeight: 500 }}>
                                    Welcome, {user.username}
                                </Typography>
                                <Button
                                    onClick={handleLogOut}
                                    variant="outlined"
                                    sx={{
                                        borderColor: '#800020',
                                        color: '#800020',
                                        '&:hover': { bgcolor: 'rgba(128, 0, 32, 0.05)' }
                                    }}
                                >
                                    Log Out
                                </Button>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavBar;
