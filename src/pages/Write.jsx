import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const apiUrl = 'http://localhost:5000'; // Replace with your actual backend

const Write = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    body: '',
    featuredImage: null,
  });

  const [error, setError] = useState('');

  const createBlogMutation = useMutation({
    mutationKey: ['create-blog'],
    mutationFn: async (data) => {
      const form = new FormData();
      form.append('title', data.title);
      form.append('excerpt', data.excerpt);
      form.append('body', data.body);
      form.append('featuredImage', data.featuredImage);

      const res = await axios.post(`${apiUrl}/blogs`, form, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return res.data;
    },
    onSuccess: (data) => {
      navigate(`/article/${data.id}`);
    },
    onError: (err) => {
      setError(err.response?.data?.message || 'Something went wrong.');
    },
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'featuredImage') {
      setFormData({ ...formData, featuredImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.excerpt || !formData.body || !formData.featuredImage) {
      setError('Please fill all required fields.');
      return;
    }

    createBlogMutation.mutate(formData);
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography
        variant="h4"
        sx={{ mb: 4, fontWeight: 'bold', color: '#800020' }}
      >
        Write a New Blog Post
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
      >
        <TextField
          label="Title"
          name="title"
          placeholder="Enter your title here"
          value={formData.title}
          onChange={handleChange}
          required
          sx={{
            '& label': { color: '#800020' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#800020' },
              '&:hover fieldset': { borderColor: '#d98324' },
              '&.Mui-focused fieldset': { borderColor: '#800020' },
            },
          }}
        />

        <TextField
          label="Excerpt"
          name="excerpt"
          placeholder="Enter excerpt here..."
          multiline
          rows={3}
          value={formData.excerpt}
          onChange={handleChange}
          required
          sx={{
            '& label': { color: '#800020' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#800020' },
              '&:hover fieldset': { borderColor: '#d98324' },
              '&.Mui-focused fieldset': { borderColor: '#800020' },
            },
          }}
        />

        <input
          type="file"
          name="featuredImage"
          accept="image/*"
          onChange={handleChange}
          required
        />

        <TextField
          label="Blog Body (Markdown supported)"
          name="body"
          placeholder="Write your blog content here in markdown..."
          multiline
          rows={10}
          value={formData.body}
          onChange={handleChange}
          required
          sx={{
            '& label': { color: '#800020' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#800020' },
              '&:hover fieldset': { borderColor: '#d98324' },
              '&.Mui-focused fieldset': { borderColor: '#800020' },
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: '#800020',
          }}
        >
          {createBlogMutation.isPending ? 'Publishing...' : 'Publish'}
        </Button>

        {error && <Typography color="error">{error}</Typography>}
      </Box>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#800020' }}>
          Live Preview
        </Typography>
        <Box
          sx={{
            p: 3,
            border: '1px solid #ccc',
            borderRadius: 2,
            backgroundColor: '#f9f9f9',
            color: '#443627',
          }}
        >
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => <Typography variant="h4" sx={{ color: '#800020' }} {...props} />,
              h2: ({ node, ...props }) => <Typography variant="h5" sx={{ color: '#800020' }} {...props} />,
              h3: ({ node, ...props }) => <Typography variant="h6" sx={{ color: '#800020' }} {...props} />,
              p: ({ node, ...props }) => <Typography paragraph sx={{ color: '#443627' }} {...props} />,
            }}
          >
            {formData.body}
          </ReactMarkdown>
        </Box>
      </Box>
    </Container>
  );
};

export default Write;
