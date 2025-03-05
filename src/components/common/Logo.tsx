import React from 'react';
import Image from 'next/image';
import { Box, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

interface LogoProps {
    color?: 'white' | 'blue';
    position?: 'absolute' | 'relative';
}

const LogoContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'position',
})<{ position: 'absolute' | 'relative' }>(({ position }) => ({
    display: 'flex',
    alignItems: 'center',
    position: position,
    width: '200px',
    height: '42px',
}));

const LogoText = styled(Typography, {
    shouldForwardProp: (prop) => prop !== 'color',
})<{ color: string }>(({ color }) => ({
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 700,
    fontSize: '24px',
    lineHeight: '36px',
    marginLeft: '12px',
    color: color,
}));

const Logo: React.FC<LogoProps> = ({
    color = 'white',
    position = 'absolute'
}) => {
    const logoColor = color === 'white' ? '#FFFFFF' : '#21647D';

    return (
        <LogoContainer position={position}>
            <Box position="relative" width="28px" height="34px">
                <Image
                    src={color === 'white' ? "/images/logo-white.svg" : "/images/logo-blue.svg"}
                    alt="Medicare Logo"
                    fill
                    style={{ objectFit: 'contain' }}
                />
            </Box>
            <LogoText color={logoColor}>
                MediCare
            </LogoText>
        </LogoContainer>
    );
};

export default Logo; 