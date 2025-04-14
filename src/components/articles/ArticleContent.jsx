import { Box, Typography } from '@mui/material';

const ArticleContent = ({ title, featuredImage, content }) => {
  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
        {title}
      </Typography>
      
      {featuredImage && (
        <Box sx={{ mb: 4 }}>
          <img 
            src={featuredImage} 
            alt={title} 
            style={{ 
              width: '100%', 
              maxHeight: '500px', 
              objectFit: 'cover',
              borderRadius: '8px'
            }} 
          />
        </Box>
      )}

      <Box sx={{ 
        '& h2': { mt: 4, mb: 2, fontWeight: 600 },
        '& p': { mb: 3, lineHeight: 1.6 },
        '& a': { color: 'primary.main' }
      }}>
        {content}
      </Box>
    </Box>
  );
};

export default ArticleContent;