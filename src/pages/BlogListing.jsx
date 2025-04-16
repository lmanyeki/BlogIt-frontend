import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Avatar, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BlogListing = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('http://localhost:3000/blogs'); // adjust this to your actual backend
        setBlogs(res.data);
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Latest Blogs</Typography>
      <Grid container spacing={4}>
        {blogs.map(blog => (
          <Grid item key={blog.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={blog.featuredImage || '/placeholder.jpg'}
                alt={blog.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>{blog.title}</Typography>
                <Typography variant="body2" color="text.secondary">{blog.excerpt}</Typography>
                <Box display="flex" alignItems="center" mt={2}>
                  <Avatar 
                    src={blog.author?.avatar || ''} 
                    alt={blog.author?.username || 'Author'} 
                    sx={{ mr: 1 }}
                  >
                    {!blog.author?.avatar && blog.author?.username?.[0]?.toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" fontWeight="bold">
                      {blog.author?.username || 'Unknown Author'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(blog.updatedAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
                <Button
                  component={Link}
                  to={`/blogs/${blog.id}`}
                  variant="outlined"
                  sx={{ mt: 2 }}
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BlogListing;
