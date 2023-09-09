import React from 'react';
import { Typography, TypographyTypeMap } from '@mui/material';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

interface LogoToHomeProps {
  variant: TypographyTypeMap['props']['variant'];
  display: { xs: string; sm: string };
  name: string;
  fontSize: string;
}

const LogoToHome = ({ variant, display, name, fontSize }: LogoToHomeProps) => {
  return (
    <Typography
      variant={variant}
      component="a"
      href="/"
      sx={{
        display,
        alignItems: 'center',
        color: 'black',
        textDecoration: 'none',
        mr: '15px',
      }}
    >
      <ConfirmationNumberIcon sx={{ fontSize, mr: '2px' }} />
      {name}
    </Typography>
  );
};

export default LogoToHome;
