import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Paper,
  Grid,
  Avatar,
  Divider,
  Card,
  CardMedia,
  CardContent,
  CircularProgress
} from '@mui/material';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import moment from 'moment';
import useUserStore from '../store/userStore';
import apiUrl from '../utils/api_url';

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [authorArticles, setAuthorArticles] = useState([]);
  const [otherArticles, setOtherArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useUserStore((state) => state);

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        setLoading(true);

        const articleResponse = await axios.get(`${apiUrl}/blogs/${id}`, {
          withCredentials: true
        });
        setArticle(articleResponse.data);
       if (articleResponse.data.author_id) {
          const authorArticlesResponse = await axios.get(
            `${apiUrl}/blogs/author/${articleResponse.data.author_id}?exclude=${id}&limit=5`,
            { withCredentials: true }
          );
          setAuthorArticles(authorArticlesResponse.data);
        }
        if (!authorArticlesResponse?.data?.length || authorArticlesResponse?.data?.length < 5) {
          const otherArticlesResponse = await axios.get(
            `${apiUrl}/blogs?exclude=${id}&limit=${5 - (authorArticlesResponse?.data?.length || 0)}`,
            { withCredentials: true }
          );
          setOtherArticles(otherArticlesResponse.data);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching article data:', err);
        setError('Failed to load article. Please try again later.');
        setLoading(false);
      }
    };

    fetchArticleData();
  }, [id]);

  const formatDate = (dateString) => {
    return moment(dateString).format('MMMM DD, YYYY');
  };
const BlogPreviewCard = ({ blog }) => {
    return (
      <Card sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 3
        }
      }}>
        <CardMedia
          component="img"
          height="140"
          image={blog.featuredImage || '/placeholder-image.jpg'}
          alt={blog.title}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div" gutterBottom noWrap>
            {blog.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {blog.excerpt}
          </Typography>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center">
              <Avatar 
                src={blog.authorProfilePic} 
                alt={blog.authorName} 
                sx={{ width: 24, height: 24, mr: 1 }} 
              />
              <Typography variant="caption" color="text.secondary">
                {blog.authorName}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              {formatDate(blog.updatedAt || blog.createdAt)}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress sx={{ color: '#800020' }} />
      </Box>
    );
  }

  if (error || !article) {
    return (
      <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
        <Typography variant="h5" color="error" align="center">
          {error || 'Article not found'}
        </Typography>
      </Container>
    );
  }

  const relatedArticles = [...(authorArticles || []), ...(otherArticles || [])].slice(0, 5);
  const hasAuthorArticles = authorArticles && authorArticles.length > 0;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 2 }}>
      
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ 
            color: '#800020', 
            fontWeight: 'bold', 
            textAlign: 'center', 
            mb: 3,
            fontSize: { xs: '2rem', md: '3rem' }
          }}
        >
          {article.title}
        </Typography>
        
        <Box 
          display="flex" 
          alignItems="center" 
          justifyContent="center"
          sx={{ mb: 4 }}
        >
          <Avatar 
            src={article.authorProfilePic} 
            alt={article.authorName} 
            sx={{ width: 48, height: 48, mr: 2 }} 
          />
          <Box>
            <Typography variant="subtitle1" fontWeight="medium">
              {article.authorName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {formatDate(article.updatedAt || article.createdAt)}
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ mb: 4, width: '100%', display: 'flex', justifyContent: 'center' }}>
          <img 
            src={article.featuredImage} 
            alt={article.title}
            style={{ 
              maxWidth: '100%', 
              width: '100%',
              maxHeight: '500px',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
        </Box>
        
        <Box sx={{ 
          typography: 'body1', 
          mb: 6, 
          '& h1, & h2, & h3': { 
            color: '#800020',
            fontWeight: 'bold',
            mt: 4,
            mb: 2
          },
          '& a': {
            color: '#800020',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline'
            }
          },
          '& blockquote': {
            borderLeft: '4px solid #800020',
            pl: 2,
            fontStyle: 'italic',
            color: 'text.secondary',
          },
          '& pre': {
            backgroundColor: '#f5f5f5',
            p: 2,
            borderRadius: 1,
            overflowX: 'auto'
          },
          '& img': {
            maxWidth: '100%',
            height: 'auto',
            borderRadius: 1,
            my: 2
          },
          '& p': {
            mb: 2,
            lineHeight: 1.8
          },
          '& ul, & ol': {
            pl: 4,
            mb: 2
          }
        }}>
          <ReactMarkdown>{article.body}</ReactMarkdown>
        </Box>
    
        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 3 }}>
          <Typography 
            variant="h5" 
            component="h2" 
            gutterBottom
            sx={{ color: '#800020', fontWeight: 'bold' }}
          >
            {hasAuthorArticles 
              ? `More articles from ${article.authorName}`
              : "More articles"
            }
          </Typography>
          
          {relatedArticles.length > 0 ? (
            <Grid container spacing={3}>
              {relatedArticles.map((blog) => (
                <Grid item xs={12} sm={6} md={4} key={blog.id}>
                  <Link to={`/blog/${blog.id}`} style={{ textDecoration: 'none' }}>
                    <BlogPreviewCard blog={blog} />
                  </Link>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1" color="text.secondary">
              No more articles available at the moment.
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default ArticlePage;