import { Avatar, Box, Typography } from '@mui/material';
import { format } from 'date-fns';

const AuthorInfo = ({ author, publishedAt }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
      <Avatar 
        src={author.avatar || '/default-avatar.png'} 
        alt={author.name}
        sx={{ width: 56, height: 56, mr: 2 }}
      />
      <Box>
        <Typography variant="h6" fontWeight="medium">
          {author.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {format(new Date(publishedAt), 'MMMM d, yyyy')}
        </Typography>
      </Box>
    </Box>
  );
};

export default AuthorInfo;