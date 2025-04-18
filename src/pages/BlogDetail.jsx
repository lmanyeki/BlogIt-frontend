import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Avatar, 
  Divider,
  CircularProgress,
  Paper,
  Chip,
  Button
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useUserStore from '../store/userStore';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useUserStore((state) => state);

  const { data: blog, isLoading, isError, error } = useQuery({
    queryKey: ['blog', id],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/blogs/${id}`, {
        withCredentials: true
      });
      return response.data;
    }
  });

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress sx={{ color: '#800020' }} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" color="error" gutterBottom>
            Error loading blog
          </Typography>
          <Typography variant="body1" paragraph>
            {error?.message || 'The blog post could not be found or there was an error loading it.'}
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/bloglisting')}
            sx={{ 
              bgcolor: '#800020',
              '&:hover': { bgcolor: '#600018' }
            }}
          >
            Back to Blogs
          </Button>
        </Paper>
      </Container>
    );
  }

  const formattedDate = format(new Date(blog.updatedAt), 'MMMM dd, yyyy');

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Button 
        startIcon={<ArrowBackIcon />} 
        sx={{ mb: 4, color: '#800020' }}
        onClick={() => navigate('/bloglisting')}
      >
        Back to Blogs
      </Button>

      <Box sx={{ mb: 4, borderRadius: 2, overflow: 'hidden', maxHeight: '500px' }}>
        <img 
          src={`http://localhost:3000${blog.featuredImage}`} 
          alt={blog.title}
          style={{ width: '100%', objectFit: 'cover' }}
        />
      </Box>

      <Typography 
        variant="h3" 
        component="h1" 
        gutterBottom
        sx={{ 
          fontWeight: 'bold', 
          color: '#800020',
          mb: 3
        }}
      >
        {blog.title}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        {blog.author?.profilePhoto ? (
          <Avatar src={blog.author.profilePhoto} alt={blog.author.username} sx={{ width: 56, height: 56 }} />
        ) : (
          <Avatar sx={{ bgcolor: '#800020', width: 56, height: 56 }}>
            <PersonIcon />
          </Avatar>
        )}
        <Box sx={{ ml: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {`${blog.author.firstName} ${blog.author.lastName}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            @{blog.author.username} • {formattedDate}
          </Typography>
        </Box>
      </Box>
<Paper elevation={0} sx={{ p: 3, mb: 4, bgcolor: '#f9f9f9', borderRadius: 2 }}>
        <Typography variant="h6" sx={{ fontStyle: 'italic', color: '#555' }}>
          {blog.excerpt}
        </Typography>
      </Paper>

      <Divider sx={{ mb: 4 }} />
<Box sx={{ 
        '& h1': { color: '#800020', mb: 2, mt: 3 },
        '& h2': { color: '#800020', mb: 2, mt: 3 },
        '& h3': { fontWeight: 'bold', mb: 2, mt: 3 },
        '& p': { mb: 2, lineHeight: 1.7 },
        '& blockquote': { 
          borderLeft: '4px solid #800020',
          pl: 2,
          ml: 0,
          fontStyle: 'italic',
          color: '#555'
        },
        '& pre': {
          backgroundColor: '#f5f5f5',
          p: 2,
          borderRadius: 1,
          overflowX: 'auto'
        },
        '& ul, & ol': { mb: 2, pl: 3 },
        '& a': { color: '#800020' },
      }}>
        <ReactMarkdown>{blog.body}</ReactMarkdown>
      </Box>
{user?.username === blog.author.username && (
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Button
            variant="contained"
            sx={{ 
              bgcolor: '#800020',
              '&:hover': { bgcolor: '#600018' }
            }}
            onClick={() => navigate(`/edit-blog/${blog.id}`)}
          >
            Edit Blog
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default BlogDetail;