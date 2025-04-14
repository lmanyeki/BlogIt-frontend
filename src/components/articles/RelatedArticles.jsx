import { Box, Typography } from '@mui/material';
import ArticleCard from './ArticleCard';

const RelatedArticles = ({ currentArticleId, authorArticles, allArticles }) => {
  const articlesToShow = authorArticles.length > 1 
    ? authorArticles.filter(article => article.id !== currentArticleId)
    : allArticles.slice(0, 5);

  const title = authorArticles.length > 1 
    ? `More articles from this author`
    : `More articles you might like`;

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
        {title}
      </Typography>
      
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
        gap: 3
      }}>
        {articlesToShow.map(article => (
          <ArticleCard 
            key={article.id} 
            article={article}
          />
        ))}
      </Box>
    </Box>
  );
};

export default RelatedArticles;