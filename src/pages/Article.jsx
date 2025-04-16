import React from 'react';
import { Container, Box, Typography, CircularProgress, Card, CardContent, CardMedia, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getArticleById = async (id) => {
  const res = await axios.get(`http://localhost:3000blogs/${id}`);
  return res.data;
};

const getArticlesByAuthor = async (authorId) => {
  const res = await axios.get(`http://localhost:3000/blogs/author/${authorId}`);
  return res.data;
};

const getAllArticles = async () => {
  const res = await axios.get(`http://localhost:3000/blogs`);
  return res.data;
};

const ArticlePage = () => {
  const { id } = useParams();

  const { data: article, isLoading, isError } = useQuery({
    queryKey: ['article', id],
    queryFn: () => getArticleById(id)
  });

  const { data: authorArticles } = useQuery({
    queryKey: ['authorArticles', article?.author?.id],
    queryFn: () => getArticlesByAuthor(article?.author?.id),
    enabled: !!article,
  });

  const { data: allArticles } = useQuery({
    queryKey: ['allArticles'],
    queryFn: () => getAllArticles(),
    enabled: !authorArticles || authorArticles.length <= 1
  });

  if (isLoading) return <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 4 }} />;
  if (isError) return <Typography color="error">Error loading article...</Typography>;
  if (!article) return <Typography>Article not found</Typography>;

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ maxWidth: '800px', mx: 'auto', mb: 8 }}>
        <Typography variant="h3" gutterBottom>
          {article.title}
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Written by {article.author.name} on {new Date(article.publishedAt).toLocaleDateString()}
        </Typography>
        <Card sx={{ maxWidth: 800, marginBottom: 4 }}>
          <CardMedia
            component="img"
            alt={article.title}
            height="400"
            image={article.featuredImage}
            title={article.title}
          />
          <CardContent>
            <Typography variant="body1" component="p">
              {article.content}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" gutterBottom>
          Related Articles
        </Typography>
        <Grid container spacing={4}>
          {(authorArticles || allArticles).map((relatedArticle) => {
            if (relatedArticle.id === article.id) return null;
            return (
              <Grid item xs={12} sm={6} md={4} key={relatedArticle.id}>
                <Card>
                  <CardMedia
                    component="img"
                    alt={relatedArticle.title}
                    height="200"
                    image={relatedArticle.featuredImage}
                    title={relatedArticle.title}
                  />
                  <CardContent>
                    <Typography variant="h6" component="h6" gutterBottom>
                      {relatedArticle.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {relatedArticle.excerpt}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
};

export default ArticlePage;
