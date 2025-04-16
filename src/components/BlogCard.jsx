import React from 'react';
import { Card, CardMedia, CardContent, Typography, Avatar, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const BlogCard = ({
  title,
  excerpt,
  featuredImage,
  authorAvatar,
  authorUsername,
  updatedAt,
}) => {
  const formattedDate = new Date(updatedAt).toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Card
      component={Link}
      to={`/blogs/${title.toLowerCase().replace(/\s+/g, '-')}`} // link to blog detail
      sx={{
        textDecoration: 'none',
        borderRadius: '2xl',
        boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
        backgroundColor: '#f2f6d0',
        color: '#443627',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.03)',
        },
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={featuredImage || '/images/default.jpg'}
        alt={title}
        sx={{ objectFit: 'cover', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ fontFamily: 'Montserrat', color: '#443627' }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontFamily: 'Montserrat', color: '#443627', minHeight: '3em' }}
        >
          {excerpt.length > 100 ? excerpt.slice(0, 97) + '...' : excerpt}
        </Typography>
        <Box display="flex" alignItems="center" mt={2}>
          <Avatar
            src={authorAvatar || '/images/avatar-placeholder.png'}
            alt={authorUsername}
            sx={{ width: 30, height: 30, marginRight: 1 }}
          />
          <Typography variant="body2" sx={{ fontFamily: 'Montserrat', color: '#443627' }}>
            {authorUsername} · {formattedDate}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
