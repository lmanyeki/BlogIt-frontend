import React from 'react';
import { Grid, Typography } from '@mui/material';
import BlogCard from '../components/BlogCard';

const dummyBlogs = [
  {
    title: "How I Started My Tech Journey",
    excerpt: "In this post, I reflect on my transition from curiosity to code. It all began with HTML tags...",
    featuredImage: "/images/journey.jpg",
    authorAvatar: "/images/lydiah.jpg",
    authorUsername: "lydiahmanyeki",
    updatedAt: "2025-04-12T10:00:00Z",
  },
  {
    title: "Understanding Express.js as a Beginner",
    excerpt: "Express makes Node.js backend development much easier. Here's how I built my first REST API with it...",
    featuredImage: "/images/express.jpg",
    authorAvatar: "/images/lydiah.jpg",
    authorUsername: "lydiahmanyeki",
    updatedAt: "2025-04-10T16:20:00Z",
  },
  {
    title: "Why I Chose Prisma with PostgreSQL",
    excerpt: "Prisma simplified my DB workflows. Migrations, relations, and querying have never felt this clean...",
    featuredImage: "/images/prisma.jpg",
    authorAvatar: "/images/lydiah.jpg",
    authorUsername: "lydiahmanyeki",
    updatedAt: "2025-04-08T13:45:00Z",
  },
  {
    title: "Learning React the Real Way",
    excerpt: "Forget memorizing syntax. Here’s how I learned React by building real projects with real problems...",
    featuredImage: "/images/react.jpg",
    authorAvatar: "/images/lydiah.jpg",
    authorUsername: "lydiahmanyeki",
    updatedAt: "2025-04-05T09:30:00Z",
  },
  {
    title: "CSS Struggles and Wins",
    excerpt: "From centering divs to embracing Flexbox and Grid — here's my love-hate journey with CSS.",
    featuredImage: "/images/css.jpg",
    authorAvatar: "/images/lydiah.jpg",
    authorUsername: "lydiahmanyeki",
    updatedAt: "2025-04-02T17:10:00Z",
  },
];

const MyBlogs = () => {
  return (
    <div style={{ backgroundColor: '#f2f6d0', minHeight: '100vh', padding: '2rem' }}>
      <Typography variant="h4" sx={{ fontFamily: 'Montserrat', color: '#443627', marginBottom: '2rem' }}>
        My Blogs
      </Typography>
      <Grid container spacing={3}>
        {dummyBlogs.map((blog, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <BlogCard {...blog} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MyBlogs;
