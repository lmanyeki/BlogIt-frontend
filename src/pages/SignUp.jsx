import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Paper
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff,
} from '@mui/icons-material';
import { 
  Google as GoogleIcon, 
  Facebook as FacebookIcon, 
  Twitter as TwitterIcon 
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import apiUrl from '../utils/api_url';

const theme = createTheme({
  palette: {
    primary: {
      main: '#800020',
    },
    secondary: {
      main: '#D4AF37', 
    },
    background: {
      default: '#f8f8f8',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    subtitle1: {
      fontWeight: 500,
    },
  },
  
});

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '', 
    emailAddress: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    username: '', 
    emailAddress: '',
    password: '',
    confirmPassword: '',
    serverError: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

  if (name === 'password' || name === 'confirmPassword') {
    const newPassword = name === 'password' ? value : formData.password;
      const newConfirm = name === 'confirmPassword' ? value : formData.confirmPassword;

      setErrors(prev => ({
        ...prev,
        confirmPassword: newPassword !== newConfirm ? 'Passwords do not match' : '',
      }));
    }
  };

  const { isPending, mutate } = useMutation({
    mutationKey: ["register-user"],
    mutationFn: async () => {
      const response = await axios.post(`${apiUrl}/auth/signup`, 
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
          emailAddress: formData.emailAddress,
          password: formData.password
        });
      return response.data;
    },
    onSuccess: () => {
      navigate('/login')
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        setErrors(prev => ({
          ...prev,
          serverError: err.response?.data?.message || "Registration failed.",
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          serverError: "Something went wrong.",
        }));
      }
    },
  });
    
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Passwords must match' }));
      return;
    }
    mutate();
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ p: 12, borderRadius: 2 }}>
          <Box  sx={{ textAlign: 'center', mb: 4 }}>
            <img src={logo} alt="BlogIt Logo" style={{ height: 50, marginBottom: 8 }} />
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                mb: 1,
                color: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1
              }}
            >
                  BlogIt
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>
              Drop the mic, Blog It instead.
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={formData.firstName}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      width: '350px' 
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      width: '350px' 
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={formData.username}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      width: '350px' 
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="emailAddress"
                  label="Email Address"
                  name="emailAddress"
                  autoComplete="email"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      width: '350px'
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      width: '350px' 
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      width: '350px' 
                    }
                  }}
                />
              </Grid>
            </Grid>

            {errors.serverError && (
              <Typography color="error" sx={{ mt: 2 }}>
                {errors.serverError}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isPending}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                borderRadius: 1,
                bgcolor: 'primary.main',
                '&:hover': {
                  bgcolor: '#600018',
                },
              }}
            >
              {
                isPending ? "Please wait...": "Sign up"
              }
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid>
              Already have an account?
                <Link to="/login" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" sx={{ color: 'primary.main' }}>
                  Sign in
                </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 3 }}>OR</Divider>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <IconButton
              sx={{
                border: '1px solid #ddd',
                '&:hover': {
                  bgcolor: '#f5f5f5',
                },
              }}
            >
              <GoogleIcon sx={{ color: '#DB4437' }} />
            </IconButton>
            <IconButton
              sx={{
                border: '1px solid #ddd',
                '&:hover': {
                  bgcolor: '#f5f5f5',
                },
              }}
            >
              <FacebookIcon sx={{ color: '#4267B2' }} />
            </IconButton>
            <IconButton
              sx={{
                border: '1px solid #ddd',
                '&:hover': {
                  bgcolor: '#f5f5f5',
                },
              }}
            >
              <TwitterIcon sx={{ color: '#1DA1F2' }} />
            </IconButton>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};
  

export default SignUp;