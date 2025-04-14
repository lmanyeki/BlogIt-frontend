// import React, { useState, useEffect } from 'react';
// import { Container, Box, Typography } from '@mui/material';
// import BlogList from '../components/blogs/BlogList';
// import { useAuth } from '../contexts/AuthContext';
// import api from '../api/blogService';

// const MyBlogsPage = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const { currentUser } = useAuth();

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const userBlogs = await api.getUserBlogs(currentUser.id);
//         setBlogs(userBlogs);
//       } catch (error) {
//         console.error('Failed to fetch blogs:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchBlogs();
//   }, [currentUser.id]);

//   const handleDeleteBlog = async (blogId) => {
//     try {
//       await api.deleteBlog(blogId);
//       setBlogs(blogs.filter(blog => blog.id !== blogId));
//     } catch (error) {
//       console.error('Failed to delete blog:', error);
//     }
//   };

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
//         My Blogs
//       </Typography>
      
//       <BlogList 
//         blogs={blogs} 
//         isLoading={isLoading} 
//         onDeleteBlog={handleDeleteBlog} 
//       />
//     </Container>
//   );
// };

// export default MyBlogsPage;