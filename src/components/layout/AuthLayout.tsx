import React, { ReactNode } from 'react';
import { Box, Container, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import Logo from '../common/Logo';

interface AuthLayoutProps {
    children: ReactNode;
    rightContent: ReactNode;
}

const AuthContainer = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
}));

const AuthCard = styled(Paper)(({ theme }) => ({
    width: '100%',
    overflow: 'hidden',
    borderRadius: 16,
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
}));

const LeftPanel = styled(Grid)(({ theme }) => ({
    padding: theme.spacing(4),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    display: 'flex',
    flexDirection: 'column',
}));

const RightPanel = styled(Grid)(({ theme }) => ({
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
}));

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, rightContent }) => {
    return (
        <AuthContainer>
            <Container maxWidth="lg">
                <AuthCard>
                    <Grid container>
                        <LeftPanel item xs={12} md={6}>
                            <Box mb={4}>
                                <Logo />
                            </Box>
                            {children}
                        </LeftPanel>
                        <RightPanel item xs={12} md={6}>
                            {rightContent}
                        </RightPanel>
                    </Grid>
                </AuthCard>
            </Container>
        </AuthContainer>
    );
};

export default AuthLayout; 