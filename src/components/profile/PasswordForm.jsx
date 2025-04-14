import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const PasswordForm = ({ onChangePassword }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.currentPassword) newErrors.currentPassword = 'Current password is required';
    if (!formData.newPassword) newErrors.newPassword = 'New password is required';
    else if (formData.newPassword.length < 8) newErrors.newPassword = 'Password must be at least 8 characters';
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onChangePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        sx={{
          width: '60%',
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#800020' },
            '&:hover fieldset': { borderColor: '#800020' },
            '&.Mui-focused fieldset': { borderColor: '#800020' }
          },
          '& label.Mui-focused': { color: '#800020' }
        }}
        label="Current Password *"
        name="currentPassword"
        type={showPassword.current ? 'text' : 'password'}
        value={formData.currentPassword}
        onChange={handleChange}
        error={!!errors.currentPassword}
        helperText={errors.currentPassword}
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword({ ...showPassword, current: !showPassword.current })}
                edge="end"
              >
                {showPassword.current ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        sx={{
          width: '60%',
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#800020' },
            '&:hover fieldset': { borderColor: '#800020' },
            '&.Mui-focused fieldset': { borderColor: '#800020' }
          },
          '& label.Mui-focused': { color: '#800020' }
        }}
        label="New Password *"
        name="newPassword"
        type={showPassword.new ? 'text' : 'password'}
        value={formData.newPassword}
        onChange={handleChange}
        error={!!errors.newPassword}
        helperText={errors.newPassword}
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                edge="end"
              >
                {showPassword.new ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        sx={{
          width: '60%',
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#800020' },
            '&:hover fieldset': { borderColor: '#800020' },
            '&.Mui-focused fieldset': { borderColor: '#800020' }
          },
          '& label.Mui-focused': { color: '#800020' }
        }}
        label="Confirm New Password *"
        name="confirmPassword"
        type={showPassword.confirm ? 'text' : 'password'}
        value={formData.confirmPassword}
        onChange={handleChange}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
                edge="end"
              >
                {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Box sx={{ mt: 3 }}>
        <Button type="submit" 
          variant="contained"
          sx={{
            backgroundColor: '#800020',
            '&:hover': { backgroundColor: '#5a0015' }
          }}
          >
          Change Password
        </Button>
      </Box>
    </Box>
  );
};

export default PasswordForm;