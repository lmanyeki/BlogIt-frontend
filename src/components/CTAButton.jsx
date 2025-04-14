import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const CTAButton = ({ variant, to, children, ...props }) => {
  return (
    <Button
      component={Link}
      to={to}
      variant={variant}
      size="large"
      sx={{
        px: 4,
        py: 1.5,
        fontSize: '1rem',
        fontWeight: 600,
        borderRadius: 2,
        ...(variant === 'contained' && {
          bgcolor: '#D4AF37',
          color: 'white',
          '&:hover': { bgcolor: '#c1931a' }
        }),
        ...(variant === 'outlined' && {
          borderColor: 'white',
          color: 'white',
          '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
        }),
        ...props.sx
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CTAButton;