import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  CircularProgress,
  Alert
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/blogService';

const EditBlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogData = await api.getBlogById(id);
        setBlog(blogData);
      } catch (error) {
        setError('Failed to load blog');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.updateBlog(id, blog);
      setSuccess('Blog updated successfully!');
      setTimeout(() => navigate('/my-blogs'), 1500);
    } catch (error) {
      setError('Failed to update blog');
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!blog) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h6">Blog not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
        Edit Blog
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {success}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={blog.title}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Excerpt (Optional)"
          name="excerpt"
          value={blog.excerpt || ''}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={2}
        />

        <TextField
          fullWidth
          label="Content"
          name="content"
          value={blog.content}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={12}
          required
        />

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/my-blogs')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
          >
            Update Blog
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EditBlogPage;