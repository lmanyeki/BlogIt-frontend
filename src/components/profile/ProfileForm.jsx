import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Avatar, 
  Button,
  Typography 
} from '@mui/material';
import { CameraAlt } from '@mui/icons-material';

const ProfileForm = ({ initialData, onSave }) => {
  const [formData, setFormData] = useState(initialData);
  const [avatarPreview, setAvatarPreview] = useState(initialData.profilePhoto);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setFormData({ ...formData, profilePhoto: file });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box component="form" onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Avatar
          src={avatarPreview}
          sx={{ width: 100, height: 100, mr: 3 }}
        />
        <div>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="profile-photo-upload"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="profile-photo-upload">
            <Button 
              variant="outlined" 
              component="span"
              startIcon={<CameraAlt />}
              sx={{
                borderColor: '#800020',
                color: '#800020',
                '&:hover': {
                  borderColor: '#5a0015',
                  color: '#5a0015'
                }
              }}
            >
              Change Photo
            </Button>
          </label>
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            JPG, GIF or PNG. Max size 2MB
          </Typography>
        </div>
      </Box>

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
        label="Phone Number"
        name="phoneNumber"
        value={formData.phoneNumber || ''}
        onChange={handleChange}
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
        label="Occupation"
        name="occupation"
        value={formData.occupation || ''}
        onChange={handleChange}
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
        label="Bio"
        name="bio"
        multiline
        rows={4}
        value={formData.bio || ''}
        onChange={handleChange}
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
        label="Status"
        name="status"
        value={formData.status || ''}
        onChange={handleChange}
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
        label="Secondary Email"
        name="secondaryEmail"
        type="email"
        value={formData.secondaryEmail || ''}
        onChange={handleChange}
        margin="normal"
      />

      <Box sx={{ mt: 3 }}>
        <Button type="submit" variant="contained" sx={{
            backgroundColor: '#800020',
            '&:hover': { backgroundColor: '#5a0015' }
          }}>
          Save Profile
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileForm;