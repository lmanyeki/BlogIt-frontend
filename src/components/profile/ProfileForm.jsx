import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Avatar, 
  IconButton, 
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
        fullWidth
        label="Phone Number"
        name="phoneNumber"
        value={formData.phoneNumber || ''}
        onChange={handleChange}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Occupation"
        name="occupation"
        value={formData.occupation || ''}
        onChange={handleChange}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Bio"
        name="bio"
        multiline
        rows={4}
        value={formData.bio || ''}
        onChange={handleChange}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Status"
        name="status"
        value={formData.status || ''}
        onChange={handleChange}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Secondary Email"
        name="secondaryEmail"
        type="email"
        value={formData.secondaryEmail || ''}
        onChange={handleChange}
        margin="normal"
      />

      <Box sx={{ mt: 3 }}>
        <Button type="submit" variant="contained" color="primary">
          Save Profile
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileForm;