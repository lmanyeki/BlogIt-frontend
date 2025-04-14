import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Box, 
  Chip,
  IconButton
} from '@mui/material';
import { Edit, Delete, CalendarToday } from '@mui/icons-material';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog, onDelete }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(blog.id);
    setDeleteDialogOpen(false);
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h5" component="h3" gutterBottom>
          {blog.title}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <CalendarToday fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {format(new Date(blog.publishedAt), 'MMM d, yyyy')}
          </Typography>
          {blog.status === 'draft' && (
            <Chip label="Draft" size="small" sx={{ ml: 2 }} color="warning" />
          )}
        </Box>
        
        <Typography variant="body1" paragraph>
          {blog.excerpt || blog.content.substring(0, 150) + '...'}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button
            component={Link}
            to={`/edit-blog/${blog.id}`}
            variant="outlined"
            startIcon={<Edit />}
            size="small"
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Delete />}
            size="small"
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BlogCard;