import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button
} from '@mui/material';

const PersonalInfoForm = ({ initialData, onSave }) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.username) newErrors.username = 'Username is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
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
        label="First Name *"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        error={!!errors.firstName}
        helperText={errors.firstName}
        margin="normal"
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
        label="Last Name *"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        error={!!errors.lastName}
        helperText={errors.lastName}
        margin="normal"
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
        label="Email *"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        margin="normal"
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
        label="Username *"
        name="username"
        value={formData.username}
        onChange={handleChange}
        error={!!errors.username}
        helperText={errors.username}
        margin="normal"
      />

      <Box sx={{ mt: 3 }}>
        <Button type="submit" variant="contained" sx={{
            backgroundColor: '#800020',
            '&:hover': { backgroundColor: '#5a0015' }
          }}>
          Save Personal Info
        </Button>
      </Box>
    </Box>
  );
};

export default PersonalInfoForm;