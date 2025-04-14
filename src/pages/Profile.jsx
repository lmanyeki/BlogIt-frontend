import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Tabs, 
  Tab, 
  Paper,
  Alert
} from '@mui/material';
import ProfileForm from '../components/profile/ProfileForm';
import PersonalInfoForm from '../components/profile/PersonalInfoForm';
import PasswordForm from '../components/profile/PasswordForm';

const Profile = () => {
  const [tabValue, setTabValue] = useState(0);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  // Sample user data - replace with actual data from your auth system
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    username: 'johndoe',
    profilePhoto: '',
    phoneNumber: '',
    occupation: '',
    bio: '',
    status: '',
    secondaryEmail: ''
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleProfileSave = (data) => {
    // API call would go here
    setUserData({ ...userData, ...data });
    showAlert('Profile updated successfully!', 'success');
  };

  const handlePersonalInfoSave = (data) => {
    // API call would go here
    setUserData({ ...userData, ...data });
    showAlert('Personal information updated successfully!', 'success');
  };

  const handlePasswordChange = async (passwords) => {
    try {
      // API call would go here
      // await api.changePassword(passwords);
      showAlert('Password changed successfully!', 'success');
    } catch (error) {
      showAlert(error.message || 'Failed to change password', 'error');
    }
  };

  const showAlert = (message, severity) => {
    setAlert({ open: true, message, severity });
    setTimeout(() => setAlert({ ...alert, open: false }), 5000);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
        My Profile
      </Typography>

      {alert.open && (
        <Alert severity={alert.severity} sx={{ mb: 3 }}>
          {alert.message}
        </Alert>
      )}

      <Paper elevation={2} sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
          <Tab label="Profile" />
          <Tab label="Personal Info" />
          <Tab label="Password" />
        </Tabs>
      </Paper>

      <Box sx={{ pt: 2 }}>
        {tabValue === 0 && (
          <ProfileForm 
            initialData={userData} 
            onSave={handleProfileSave} 
          />
        )}

        {tabValue === 1 && (
          <PersonalInfoForm 
            initialData={userData} 
            onSave={handlePersonalInfoSave} 
          />
        )}

        {tabValue === 2 && (
          <PasswordForm 
            onChangePassword={handlePasswordChange} 
          />
        )}
      </Box>
    </Container>
  );
};

export default Profile;