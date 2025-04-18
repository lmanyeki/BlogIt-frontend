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
import axios from 'axios';
import ProfileForm from '../components/profile/ProfileForm';
import PersonalInfoForm from '../components/profile/PersonalInfoForm';
import PasswordForm from '../components/profile/PasswordForm';
import apiUrl from '../utils/api_url';

const Profile = () => {
  const [tabValue, setTabValue] = useState(0);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  const [userData, setUserData] = useState({
    firstName: 'Anna',
    lastName: 'Davis',
    email: 'annad@gmail.com',
    username: 'anna_dave',
    profilePhoto: '',
    phoneNumber: '',
    occupation: '',
    bio: '',
    status: '',
    secondaryEmail: ''
  });

  useEffect(() => {
    axios
      .get('${apiUrl}/api/profile')
      .then((response) => setUserData(response.data))
      .catch((error) => showAlert('Failed to load user data', 'error'));
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleProfileSave = async (data) => {
    try {
      await axios.put('${apiUrl}/api/profile', data);
      setUserData({ ...userData, ...data });
    showAlert('Profile updated successfully!', 'success');
  } catch (error) {
    showAlert('Failed to update profile', 'error');
  }
  };

  const handlePersonalInfoSave = async (data) => {
    try {
      await axios.put('${apiUrl}/api/profile', data);
      setUserData({ ...userData, ...data });
      showAlert('Personal information updated successfully!', 'success');
    } catch (error) {
      showAlert('Failed to update personal info', 'error');
    }
  };

  const handlePasswordChange = async (passwords) => {
    try {
      await axios.put('${apiUrl}/api/change-password', passwords);
      showAlert('Password changed successfully!', 'success');
    } catch (error) {
      showAlert(error.message || 'Failed to change password', 'error');
    }
  };

  const showAlert = (message, severity) => {
    setAlert({ open: true, message, severity });
    setTimeout(() => setAlert((prev) => ({ ...prev, open: false })), 5000);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: '#800020' }}>
        My Profile
      </Typography>

      {alert.open && (
        <Alert severity={alert.severity} sx={{ mb: 3 }}>
          {alert.message}
        </Alert>
      )}

      <Paper elevation={2} sx={{ mb: 3, bgcolor: '#f2f6d0', borderRadius: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          TabIndicatorProps={{ style: { backgroundColor: '#800020' } }}
          sx={{
            '& .MuiTab-root': {
              fontWeight: 'bold',
              fontFamily: 'Montserrat, sans-serif',
              color: '#443627'
            },
            '& .Mui-selected': {
              color: '#800020'
            },
            bgcolor: '#efdcab'
          }}
        >
          <Tab label="Profile" />
          <Tab label="Personal Info" />
          <Tab label="Password" />
        </Tabs>
      </Paper>

      <Box sx={{ pt: 2, fontFamily: 'Montserrat, sans-serif' }}>
        {tabValue === 0 && (
          <ProfileForm
            initialData={userData}
            onSave={handleProfileSave}
            themeColor="#800020"
          />
        )}

        {tabValue === 1 && (
          <PersonalInfoForm
            initialData={userData}
            onSave={handlePersonalInfoSave}
            themeColor="#800020"
          />
        )}

        {tabValue === 2 && (
          <PasswordForm
            onChangePassword={handlePasswordChange}
            themeColor="#800020"
          />
        )}
      </Box>
    </Container>
  );
};

export default Profile;
