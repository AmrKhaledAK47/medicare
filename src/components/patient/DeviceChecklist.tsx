'use client';

import React from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useThemeContext } from './Sidebar';

// Styled components
const ChecklistContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#2D2D2D',
    border: `1px solid ${theme.palette.mode === 'light' ? '#EEF1F4' : '#444'}`,
    borderRadius: '12px',
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(4),
}));

const ChecklistTitle = styled(Typography)(({ theme }) => ({
    fontSize: '18px',
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    color: theme.palette.mode === 'light' ? '#454747' : '#FFFFFF',
}));

const ChecklistItem = styled(ListItem)<{ completed?: boolean }>(({ theme, completed }) => ({
    padding: theme.spacing(1, 0),
    opacity: completed ? 0.6 : 1,
}));

const ItemText = styled(ListItemText)(({ theme }) => ({
    '& .MuiListItemText-primary': {
        fontSize: '15px',
        fontWeight: 500,
        color: theme.palette.mode === 'light' ? '#454747' : '#FFFFFF',
    },
    '& .MuiListItemText-secondary': {
        fontSize: '13px',
        color: theme.palette.mode === 'light' ? '#6C7A89' : '#B8C7CC',
    },
}));

const CheckIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="#4CAF50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M22 4L12 14.01L9 11.01" stroke="#4CAF50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
);

const CircleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="#267997" stroke-width="2" />
    </svg>
);

const ViewButton = styled(Button)(({ theme }) => ({
    marginLeft: 'auto',
    textTransform: 'none',
    fontSize: '13px',
    color: '#267997',
    padding: '4px 12px',
    borderRadius: '8px',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light' ? 'rgba(38, 121, 151, 0.08)' : 'rgba(38, 121, 151, 0.15)',
    },
}));

interface DeviceChecklistProps {
    connectedDevices: number;
}

const DeviceChecklist: React.FC<DeviceChecklistProps> = ({ connectedDevices = 0 }) => {
    const { mode } = useThemeContext();

    const checklistItems = [
        {
            id: 'connect-devices',
            primary: 'Connect health devices',
            secondary: 'Link your fitness trackers and health monitors',
            completed: connectedDevices > 0,
            hasCta: false,
        },
        {
            id: 'verify-account',
            primary: 'Verify your account',
            secondary: 'Confirm your identity for secure access',
            completed: true,
            hasCta: false,
        },
        {
            id: 'permissions',
            primary: 'Review data permissions',
            secondary: 'Manage what information is shared',
            completed: false,
            hasCta: true,
        },
        {
            id: 'notifications',
            primary: 'Set up notifications',
            secondary: 'Choose how you want to be alerted',
            completed: false,
            hasCta: true,
        }
    ];

    return (
        <ChecklistContainer>
            <ChecklistTitle>Checklist</ChecklistTitle>
            <List disablePadding>
                {checklistItems.map(item => (
                    <ChecklistItem key={item.id} completed={item.completed}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                            {item.completed ? <CheckIcon /> : <CircleIcon />}
                        </ListItemIcon>
                        <ItemText
                            primary={item.primary}
                            secondary={item.secondary}
                        />
                        {item.hasCta && (
                            <ViewButton size="small">
                                {item.completed ? 'Manage' : 'Set up'}
                            </ViewButton>
                        )}
                    </ChecklistItem>
                ))}
            </List>
        </ChecklistContainer>
    );
};

export default DeviceChecklist; 