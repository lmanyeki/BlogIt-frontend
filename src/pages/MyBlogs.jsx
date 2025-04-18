import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  CircularProgress,
  Alert
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import useUserStore from '../store/userStore';
import apiUrl from '../utils/api_url';

const MyBlogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [deleteStatus, setDeleteStatus] = useState({ loading: false, error: null });
  const user = useUserStore((state) => state);

  useEffect(() => {
    if (!user?.username) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get('${apiUrl}/blogs/my-blogs', {
          withCredentials: true
        });
        setBlogs(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to load your blogs. Please try again.');
        setLoading(false);
      }
    };

    if (user?.username) {
      fetchUserBlogs();
    }
  }, [user]);

  const formatDate = (dateString) => {
    return moment(dateString).format('MMMM DD, YYYY');
  };

  const handleDeleteClick = (blog) => {
    setBlogToDelete(blog);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setBlogToDelete(null);
  };

  const confirmDelete = async () => {
    if (!blogToDelete) return;
    
    setDeleteStatus({ loading: true, error: null });
    try {
      await axios.delete(`${apiUrl}/blogs/${blogToDelete.id}`, {
        withCredentials: true
      });
      
      setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id));
      closeDeleteDialog();
      setDeleteStatus({ loading: false, error: null });
    } catch (err) {
      console.error('Error deleting blog:', err);
      setDeleteStatus({ 
        loading: false, 
        error: 'Failed to delete blog. Please try again.' 
      });
    }
  };

  const handleEditClick = (blogId) => {
    navigate(`/edit-blog/${blogId}`);
  };

  const handleCreateNewBlog = () => {
    navigate('/write');
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress sx={{ color: '#800020' }} />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 2 }}>
       
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              color: '#800020', 
              fontWeight: 'bold'
            }}
          >
            My Blogs
          </Typography>
          
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateNewBlog}
            sx={{ 
              bgcolor: '#800020',
              '&:hover': { bgcolor: '#600018' }
            }}
          >
            Create New Blog
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {blogs.length === 0 ? (
          <Box textAlign="center" py={5}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              You haven't created any blogs yet.
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreateNewBlog}
              sx={{ 
                mt: 2,
                bgcolor: '#800020',
                '&:hover': { bgcolor: '#600018' }
              }}
            >
              Write Your First Blog
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {blogs.map((blog) => (
              <Grid item xs={12} key={blog.id}>
                <Card 
                  sx={{ 
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    height: '100%',
                    overflow: 'hidden'
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ 
                      width: { xs: '100%', sm: '200px' }, 
                      height: { xs: '160px', sm: 'auto' },
                      objectFit: 'cover'
                    }}
                    image={blog.featuredImage || '/placeholder-image.jpg'}
                    alt={blog.title}
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Link to={`/blog/${blog.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          <Typography component="h2" variant="h5" fontWeight="medium" gutterBottom>
                            {blog.title}
                          </Typography>
                        </Link>
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(blog.updatedAt || blog.createdAt)}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        paragraph
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {blog.excerpt}
                      </Typography>
                    </CardContent>
                    <Divider />
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                      <Button
                        startIcon={<EditIcon />}
                        onClick={() => handleEditClick(blog.id)}
                        sx={{ color: '#800020' }}
                      >
                        Edit
                      </Button>
                      <Button
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDeleteClick(blog)}
                        sx={{ color: '#d32f2f' }}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>

      <Dialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete "{blogToDelete?.title}"? This action cannot be undone.
          </DialogContentText>
          {deleteStatus.error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {deleteStatus.error}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={closeDeleteDialog} 
            color="primary"
            disabled={deleteStatus.loading}
          >
            Cancel
          </Button>
          <Button 
            onClick={confirmDelete} 
            color="error" 
            autoFocus
            disabled={deleteStatus.loading}
          >
            {deleteStatus.loading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MyBlogs;