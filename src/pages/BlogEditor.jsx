import React, { useState, useRef } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  TextField, 
  Typography, 
  Paper,
  Grid,
  Alert,
  IconButton,
  Divider,
  Tooltip
} from '@mui/material';
import { 
  FormatBold, 
  FormatItalic, 
  FormatUnderlined,
  Title,
  FormatListBulleted,
  FormatListNumbered,
  InsertLink,
  FormatQuote,
  Code
} from '@mui/icons-material';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useUserStore from '../store/userStore';
import ReactMarkdown from 'react-markdown';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageIcon from '@mui/icons-material/Image';
import { styled } from '@mui/material/styles';
import apiUrl from '../utils/api_url';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const BlogEditor = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state);
  const [preview, setPreview] = useState(false);
  const bodyRef = useRef(null);

  const [blogData, setBlogData] = useState({
    title: '',
    excerpt: '',
    body: '',
    featuredImage: null,
    featuredImagePreview: null
  });

  const [errors, setErrors] = useState({
    title: '',
    excerpt: '',
    body: '',
    featuredImage: '',
    serverError: ''
  });

  React.useEffect(() => {
    if (!user?.username) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData({
      ...blogData,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) { 
      setErrors({ ...errors, featuredImage: 'Image size should be less than 5MB' });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setBlogData({
        ...blogData,
        featuredImage: file,
        featuredImagePreview: reader.result
      });
      setErrors({ ...errors, featuredImage: '' });
    };
    reader.readAsDataURL(file);
  };

  const insertFormatting = (formatType) => {
    if (!bodyRef.current) return;
    
    const textArea = bodyRef.current;
    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;
    const text = blogData.body;
    let formattedText = '';
    
    switch (formatType) {
      case 'bold':
        formattedText = text.substring(0, start) + '**' + text.substring(start, end) + '**' + text.substring(end);
        break;
      case 'italic':
        formattedText = text.substring(0, start) + '*' + text.substring(start, end) + '*' + text.substring(end);
        break;
      case 'underline':
        formattedText = text.substring(0, start) + '<u>' + text.substring(start, end) + '</u>' + text.substring(end);
        break;
      case 'h1':
        formattedText = text.substring(0, start) + '# ' + text.substring(start, end) + text.substring(end);
        break;
      case 'h2':
        formattedText = text.substring(0, start) + '## ' + text.substring(start, end) + text.substring(end);
        break;
      case 'h3':
        formattedText = text.substring(0, start) + '### ' + text.substring(start, end) + text.substring(end);
        break;
      case 'bulletList':
        formattedText = text.substring(0, start) + '\n- ' + text.substring(start, end) + text.substring(end);
        break;
      case 'numberedList':
        formattedText = text.substring(0, start) + '\n1. ' + text.substring(start, end) + text.substring(end);
        break;
      case 'link':
        formattedText = text.substring(0, start) + '[' + (text.substring(start, end) || 'link text') + '](url)' + text.substring(end);
        break;
      case 'quote':
        formattedText = text.substring(0, start) + '\n> ' + text.substring(start, end) + text.substring(end);
        break;
      case 'code':
        formattedText = text.substring(0, start) + '```\n' + text.substring(start, end) + '\n```' + text.substring(end);
        break;
      default:
        formattedText = text;
    }
    
    setBlogData({ ...blogData, body: formattedText });
    
    setTimeout(() => {
      textArea.focus();
      const newCursorPos = end + (formattedText.length - text.length);
      textArea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const blogMutation = useMutation({
    mutationKey: ["create-blog"],
    mutationFn: async () => {

      const formErrors = {};
      if (!blogData.title.trim()) formErrors.title = 'Title is required';
      if (!blogData.excerpt.trim()) formErrors.excerpt = 'Excerpt is required';
      if (!blogData.body.trim()) formErrors.body = 'Content is required';
      if (!blogData.featuredImage) formErrors.featuredImage = 'Featured image is required';
      
      if (Object.keys(formErrors).length > 0) {
        setErrors({ ...errors, ...formErrors });
        throw new Error('Please fix the errors before submitting');
      }
      
      const formData = new FormData();
      formData.append('title', blogData.title);
      formData.append('excerpt', blogData.excerpt);
      formData.append('body', blogData.body);
      formData.append('featuredImage', blogData.featuredImage);
      
      const response = await axios.post('${apiUrl}/blogs', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
      
      return response.data;
    },
    onSuccess: (data) => {
      navigate(`/blog/${data.id}`);
    },
    onError: (err) => {
      console.error('Blog submission error:', err);
      setErrors({
        ...errors,
        serverError: err.response?.data?.message || err.message || 'Failed to create blog post'
      });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    blogMutation.mutate();
  };

  const togglePreview = () => {
    setPreview(!preview);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{ color: '#800020', fontWeight: 'bold', textAlign: 'center', mb: 4 }}
        >
          Create New Blog Post
        </Typography>

        {errors.serverError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errors.serverError}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            
            <Grid item xs={12}>
              <Box 
                sx={{ 
                  border: errors.featuredImage ? '1px dashed #d32f2f' : '1px dashed #ccc',
                  borderRadius: 2, 
                  p: 3, 
                  textAlign: 'center',
                  backgroundColor: '#f9f9f9',
                  mb: 2
                }}
              >
                {blogData.featuredImagePreview ? (
                  <Box sx={{ position: 'relative' }}>
                    <img 
                      src={blogData.featuredImagePreview} 
                      alt="Featured preview" 
                      style={{ 
                        maxWidth: '100%', 
                        maxHeight: '200px', 
                        objectFit: 'contain',
                        borderRadius: '8px'
                      }} 
                    />
                    <Button
                      component="label"
                      variant="contained"
                      sx={{ 
                        mt: 2, 
                        bgcolor: '#800020',
                        '&:hover': { bgcolor: '#600018' }
                      }}
                      startIcon={<CloudUploadIcon />}
                    >
                      Change Image
                      <VisuallyHiddenInput type="file" accept="image/*" onChange={handleImageUpload} />
                    </Button>
                  </Box>
                ) : (
                  <Button
                    component="label"
                    variant="contained"
                    sx={{ 
                      bgcolor: '#800020',
                      '&:hover': { bgcolor: '#600018' }
                    }}
                    startIcon={<ImageIcon />}
                  >
                    Upload Featured Image
                    <VisuallyHiddenInput type="file" accept="image/*" onChange={handleImageUpload} />
                  </Button>
                )}
                {errors.featuredImage && (
                  <Typography color="error" variant="caption" sx={{ display: 'block', mt: 1 }}>
                    {errors.featuredImage}
                  </Typography>
                )}
                <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary' }}>
                  Upload a high-quality image for your blog (Max: 5MB)
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={blogData.title}
                onChange={handleInputChange}
                placeholder="Enter your title here"
                variant="outlined"
                error={!!errors.title}
                helperText={errors.title || `${blogData.title.length}/100 characters`}
                inputProps={{ maxLength: 100 }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Excerpt"
                name="excerpt"
                value={blogData.excerpt}
                onChange={handleInputChange}
                placeholder="Enter a brief summary of your post"
                variant="outlined"
                multiline
                rows={3}
                error={!!errors.excerpt}
                helperText={errors.excerpt || `${blogData.excerpt.length}/200 characters`}
                inputProps={{ maxLength: 200 }}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Paper elevation={0} sx={{ p: 1, backgroundColor: '#f5f5f5', borderRadius: 1, mb: 1 }}>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Tooltip title="Heading 1">
                    <IconButton size="small" onClick={() => insertFormatting('h1')}>
                      <Typography variant="button" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>H1</Typography>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Heading 2">
                    <IconButton size="small" onClick={() => insertFormatting('h2')}>
                      <Typography variant="button" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>H2</Typography>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Heading 3">
                    <IconButton size="small" onClick={() => insertFormatting('h3')}>
                      <Typography variant="button" sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>H3</Typography>
                    </IconButton>
                  </Tooltip>
                  <Divider orientation="vertical" flexItem />
                  <Tooltip title="Bold">
                    <IconButton size="small" onClick={() => insertFormatting('bold')}>
                      <FormatBold fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Italic">
                    <IconButton size="small" onClick={() => insertFormatting('italic')}>
                      <FormatItalic fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Underline">
                    <IconButton size="small" onClick={() => insertFormatting('underline')}>
                      <FormatUnderlined fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Divider orientation="vertical" flexItem />
                  <Tooltip title="Bullet Points">
                    <IconButton size="small" onClick={() => insertFormatting('bulletList')}>
                      <FormatListBulleted fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Numbered List">
                    <IconButton size="small" onClick={() => insertFormatting('numberedList')}>
                      <FormatListNumbered fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Divider orientation="vertical" flexItem />
                  <Tooltip title="Link">
                    <IconButton size="small" onClick={() => insertFormatting('link')}>
                      <InsertLink fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Quote">
                    <IconButton size="small" onClick={() => insertFormatting('quote')}>
                      <FormatQuote fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Code Block">
                    <IconButton size="small" onClick={() => insertFormatting('code')}>
                      <Code fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Paper>
            </Grid>

            
            <Grid item xs={12}>
              <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={togglePreview}
                  sx={{ 
                    color: '#800020',
                    borderColor: '#800020',
                    '&:hover': { 
                      borderColor: '#800020',
                      backgroundColor: 'rgba(128, 0, 32, 0.08)'
                    }
                  }}
                >
                  {preview ? "Edit" : "Preview"}
                </Button>
              </Box>

              {preview ? (
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 3, 
                    minHeight: '400px', 
                    border: '1px solid #e0e0e0', 
                    borderRadius: 1,
                    overflow: 'auto'
                  }}
                >
                  <ReactMarkdown>{blogData.body}</ReactMarkdown>
                </Paper>
              ) : (
                <TextField
                  fullWidth
                  label="Content"
                  name="body"
                  value={blogData.body}
                  onChange={handleInputChange}
                  placeholder="Write your story here... (Supports Markdown)"
                  variant="outlined"
                  multiline
                  rows={15}
                  inputRef={bodyRef}
                  error={!!errors.body}
                  helperText={errors.body}
                  required
                  InputProps={{
                    sx: { fontFamily: 'monospace' }
                  }}
                />
              )}
            </Grid>

            <Grid item xs={12} sx={{ mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={blogMutation.isPending}
                sx={{ 
                  py: 1.5, 
                  bgcolor: '#800020',
                  '&:hover': { bgcolor: '#600018' },
                  '&:disabled': { bgcolor: '#d19caa' }
                }}
              >
                {blogMutation.isPending ? 'Publishing...' : 'Publish Blog Post'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default BlogEditor;