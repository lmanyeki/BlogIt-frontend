import React, { useState } from 'react';
import { 
  Box, 
  Typography,
  Button,
  CircularProgress
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import BlogCard from './BlogCard';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';

const BlogList = ({ blogs, isLoading, onDeleteBlog }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  const handleDeleteClick = (blogId) => {
    setBlogToDelete(blogId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    onDeleteBlog(blogToDelete);
    setDeleteDialogOpen(false);
    setBlogToDelete(null);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (blogs.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          You haven't written any blogs yet
        </Typography>
        <Button
          component={Link}
          to="/write"
          variant="contained"
          startIcon={<Add />}
          sx={{ mt: 2 }}
        >
          Create Your First Blog
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button
          component={Link}
          to="/write"
          variant="contained"
          startIcon={<Add />}
        >
          New Blog
        </Button>
      </Box>

      {blogs.map((blog) => (
        <BlogCard 
          key={blog.id} 
          blog={blog} 
          onDelete={handleDeleteClick} 
        />
      ))}

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
};

export default BlogList;