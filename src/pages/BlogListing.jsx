import React, { useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  Button, 
  Avatar, 
  Chip,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import PersonIcon from '@mui/icons-material/Person';
import useUserStore from '../store/userStore';

const BlogListing = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state);
  
  // Fetch blog posts
  const { data: blogs, isLoading, isError, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/blogs', {
        withCredentials: true
      });
      return response.data;
    }
  });

  // Check if user is logged in, redirect to login if not
  useEffect(() => {
    if (!user?.username) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleReadMore = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress sx={{ color: '#800020' }} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', flexDirection: 'column' }}>
        <Typography variant="h6" color="error" gutterBottom>
          Error loading blogs
        </Typography>
        <Typography variant="body1">
          {error?.message || 'An unknown error occurred'}
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 'bold', 
            color: '#800020',
          }}
        >
          Discover Stories
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Explore thought-provoking articles from our community
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {blogs?.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog.id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.12)'
                },
                borderRadius: 2,
                overflow: 'hidden'
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={blog.featuredImage || 'https://via.placeholder.com/400x200?text=BlogIt'}
                alt={blog.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2" sx={{ color: '#800020', fontWeight: 'bold' }}>
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {blog.excerpt}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 1 }}>
                  {blog.author?.profilePhoto ? (
                    <Avatar src={blog.author.profilePhoto} alt={blog.author.username} />
                  ) : (
                    <Avatar sx={{ bgcolor: '#800020' }}>
                      <PersonIcon />
                    </Avatar>
                  )}
                  <Box sx={{ ml: 1 }}>
                    <Typography variant="subtitle2">
                      {blog.author.username}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatDistanceToNow(new Date(blog.updatedAt), { addSuffix: true })}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  sx={{ 
                    color: '#800020',
                    '&:hover': {
                      bgcolor: 'rgba(128, 0, 32, 0.08)'
                    }
                  }}
                  onClick={() => handleReadMore(blog.id)}
                >
                  Read More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {blogs?.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No blog posts found. Check back later for new content!
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default BlogListing;