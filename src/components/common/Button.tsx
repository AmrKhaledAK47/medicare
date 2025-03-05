import React from 'react';
import { Button as MuiButton, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(MuiButton)(({ theme }) => ({
  borderRadius: 25,
  padding: '12px 24px',
  textTransform: 'none',
  fontWeight: 500,
  
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.15)',
  },
}));

const Button: React.FC<ButtonProps> = (props) => {
  return <StyledButton {...props} />;
};

export default Button; 