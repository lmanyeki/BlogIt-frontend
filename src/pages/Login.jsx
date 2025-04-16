import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  TextField, 
  Typography, 
  Link 
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import useUserStore from '../store/userStore.js';
import logo from '../assets/logo.png';
import apiUrl from '../utils/api_url.js';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    identifier: '', 
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const setUserInformation = useUserStore((state) => state.setUserInformation);

  const loginMutation = useMutation({
    mutationKey: ["login-user"],
    mutationFn: async ({ identifier, password }) => {
      try {
      const response = await axios.post(`http://localhost:3000/auth/login`, {
        identifier, 
        password
      }, 
        {withCredentials: true});
      return response.data;
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      throw new Error(err.response?.data?.message || "Login failed. Please try again.");
    }
    },
    onSuccess: (data) => {
      setUserInformation(data)
      navigate('/bloglisting')
    },
    onError: (err) => {
      setError(err.message);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!credentials.identifier || !credentials.password) {
      setError("Please fill in all fields");
      return;
    }
    loginMutation.mutate(credentials);
  };

  return (
    <Container maxWidth="xs" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 4}}>
        <img src={logo} alt="BlogIt Logo" style={{ height: 50 }} />
        <Typography variant="h5" sx={{ mt: 2, color: '#800020', fontWeight: 'bold' }}>
          Welcome back to BlogIt
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Email or Username"
          variant="outlined"
          margin="normal"
          value={credentials.identifier}
          onChange={(e) => setCredentials({...credentials, identifier: e.target.value})}
          required
        />

        <TextField
          fullWidth
          label="Password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          margin="normal"
          value={credentials.password}
          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
          InputProps={{
            endAdornment: (
              <Box 
              component="button"
              type="button"
              onClick={() => setShowPassword(!showPassword)} sx={{ cursor: 'pointer' }}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </Box>
            ),
          }}
          required
        />

        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}

        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={loginMutation.isPending}
          sx={{
            mt: 3,
            py: 1.5,
            bgcolor: '#800020',
            '&:hover': { bgcolor: '#600018' }
          }}
        >
          {loginMutation.isPending ? 'Logging in...' : 'Log In'}
        </Button>

        <Typography sx={{ mt: 2, textAlign: 'center' }}>
          Don't have an account?{' '}
          <Link href="/signup" sx={{ color: '#800020', fontWeight: 'bold' }}>
            Sign up
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;