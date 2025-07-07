'use client';

import React, { useState } from 'react';
import { Box, Typography, Paper, Button, CircularProgress, Alert, TextField, InputAdornment, List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider, IconButton, Tabs, Tab } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useThemeContext } from '@/components/practitioner/Sidebar';
import usePractitionerDashboard from '@/hooks/usePractitionerDashboard';
import { FaSearch, FaPaperPlane, FaRegSmile } from 'react-icons/fa';
import { IoMdAttach } from 'react-icons/io';
import LogoutButton from '@/components/auth/LogoutButton';

const SectionTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    fontSize: '1.5rem',
    marginBottom: theme.spacing(3),
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
    minHeight: 40,
    marginBottom: theme.spacing(3),
    '& .MuiTab-root': {
        textTransform: 'none',
        minHeight: 40,
        fontWeight: 500,
        fontSize: '0.9rem',
        color: theme.palette.mode === 'light' ? '#555' : '#CCC',
        '&.Mui-selected': {
            color: '#21647D',
            fontWeight: 600,
        },
    },
    '& .MuiTabs-indicator': {
        backgroundColor: '#21647D',
    },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
    textTransform: 'none',
    minHeight: 40,
    fontWeight: 500,
    fontSize: '0.9rem',
}));

const MessageBubble = styled(Box)<{ isOutgoing?: boolean }>(({ isOutgoing, theme }) => ({
    backgroundColor: isOutgoing
        ? '#21647D'
        : theme.palette.mode === 'light' ? '#F5F5F5' : '#333',
    color: isOutgoing
        ? '#FFF'
        : theme.palette.mode === 'light' ? '#333' : '#FFF',
    borderRadius: 16,
    padding: theme.spacing(1.5, 2),
    maxWidth: '80%',
    marginBottom: theme.spacing(1),
    alignSelf: isOutgoing ? 'flex-end' : 'flex-start',
    position: 'relative',
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        [isOutgoing ? 'right' : 'left']: -8,
        width: 0,
        height: 0,
        border: '8px solid transparent',
        borderTopColor: isOutgoing
            ? '#21647D'
            : theme.palette.mode === 'light' ? '#F5F5F5' : '#333',
        borderBottom: 0,
        marginBottom: -8,
    },
}));

// Mock conversation data
const mockConversations = [
    {
        id: 'conv-1',
        patient: {
            id: 'patient-1',
            name: 'Alice Smith',
            profileImageUrl: 'https://example.com/profiles/alice-smith.jpg',
        },
        lastMessage: {
            content: 'Thank you for the prescription, doctor.',
            timestamp: new Date(2023, 5, 15, 14, 30),
            isRead: true,
        },
        unreadCount: 0,
    },
    {
        id: 'conv-2',
        patient: {
            id: 'patient-2',
            name: 'Bob Johnson',
            profileImageUrl: 'https://example.com/profiles/bob-johnson.jpg',
        },
        lastMessage: {
            content: 'When should I take the medication?',
            timestamp: new Date(2023, 5, 16, 10, 0),
            isRead: false,
        },
        unreadCount: 2,
    },
    {
        id: 'conv-3',
        patient: {
            id: 'patient-3',
            name: 'Carol Williams',
            profileImageUrl: null,
        },
        lastMessage: {
            content: 'I have a question about my test results.',
            timestamp: new Date(2023, 5, 14, 9, 15),
            isRead: true,
        },
        unreadCount: 0,
    },
];

// Mock messages for the selected conversation
const mockMessages = [
    {
        id: 'msg-1',
        content: 'Hello Dr. Smith, I have a question about my medication.',
        timestamp: new Date(2023, 5, 16, 9, 30),
        isOutgoing: false,
    },
    {
        id: 'msg-2',
        content: 'Of course, what would you like to know?',
        timestamp: new Date(2023, 5, 16, 9, 35),
        isOutgoing: true,
    },
    {
        id: 'msg-3',
        content: 'When should I take the medication? Before or after meals?',
        timestamp: new Date(2023, 5, 16, 9, 40),
        isOutgoing: false,
    },
    {
        id: 'msg-4',
        content: 'You should take it after meals, preferably with a full glass of water.',
        timestamp: new Date(2023, 5, 16, 9, 45),
        isOutgoing: true,
    },
    {
        id: 'msg-5',
        content: 'Thank you, that helps a lot!',
        timestamp: new Date(2023, 5, 16, 9, 50),
        isOutgoing: false,
    },
];

export default function MessagesPage() {
    const { mode } = useThemeContext();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
    const [newMessage, setNewMessage] = useState('');

    const {
        loading,
        error,
        refreshDashboard
    } = usePractitionerDashboard();

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    const handleSelectConversation = (conversation: any) => {
        setSelectedConversation(conversation);
    };

    const handleNewMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(event.target.value);
    };

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            console.log('Sending message:', newMessage);
            // In a real app, we would send the message to the API
            setNewMessage('');
        }
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatDate = (date: Date) => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return formatTime(date);
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
            });
        }
    };

    // Filter conversations based on search
    const filteredConversations = mockConversations.filter(conversation =>
        conversation.patient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <CircularProgress size={60} sx={{ color: '#21647D' }} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
                <Button
                    variant="contained"
                    onClick={refreshDashboard}
                    sx={{
                        backgroundColor: '#21647D',
                        '&:hover': { backgroundColor: '#184C5F' }
                    }}
                >
                    Retry
                </Button>
            </Box>
        );
    }

    return (
        <Box>
            {/* Header section */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <SectionTitle sx={{ color: mode === 'light' ? '#333' : '#FFF' }}>
                    Messages
                </SectionTitle>
                <LogoutButton variant="text" color={mode === 'light' ? '#21647D' : '#B8C7CC'} />
            </Box>

            {/* Messages interface */}
            <Box sx={{ display: 'flex', height: 'calc(100vh - 200px)', minHeight: '500px' }}>
                {/* Conversations list */}
                <Paper
                    elevation={0}
                    sx={{
                        width: '30%',
                        minWidth: '250px',
                        backgroundColor: mode === 'light' ? '#FFFFFF' : '#2B2B2B',
                        border: `1px solid ${mode === 'light' ? '#F0F0F0' : '#3D3D3D'}`,
                        borderRadius: 2,
                        mr: 2,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {/* Search */}
                    <Box sx={{ p: 2 }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Search conversations"
                            size="small"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FaSearch color={mode === 'light' ? '#666' : '#CCC'} size={16} />
                                    </InputAdornment>
                                ),
                                sx: {
                                    borderRadius: 2,
                                    backgroundColor: mode === 'light' ? '#F5F5F5' : '#333',
                                    '& fieldset': { border: 'none' },
                                }
                            }}
                        />
                    </Box>

                    {/* Tabs */}
                    <StyledTabs value={selectedTab} onChange={handleTabChange} sx={{ px: 2 }}>
                        <StyledTab label="All" />
                        <StyledTab label="Unread" />
                        <StyledTab label="Archived" />
                    </StyledTabs>

                    {/* Conversations */}
                    <List sx={{ overflow: 'auto', flexGrow: 1 }}>
                        {filteredConversations.length > 0 ? (
                            filteredConversations.map((conversation) => (
                                <React.Fragment key={conversation.id}>
                                    <ListItem
                                        button
                                        selected={selectedConversation?.id === conversation.id}
                                        onClick={() => handleSelectConversation(conversation)}
                                        sx={{
                                            px: 2,
                                            py: 1.5,
                                            backgroundColor: selectedConversation?.id === conversation.id
                                                ? mode === 'light' ? 'rgba(33, 100, 125, 0.08)' : 'rgba(33, 100, 125, 0.15)'
                                                : 'transparent',
                                            '&:hover': {
                                                backgroundColor: mode === 'light' ? 'rgba(33, 100, 125, 0.05)' : 'rgba(33, 100, 125, 0.1)',
                                            },
                                        }}
                                    >
                                        <ListItemAvatar>
                                            <Avatar
                                                src={conversation.patient.profileImageUrl || undefined}
                                                alt={conversation.patient.name}
                                                sx={{
                                                    width: 48,
                                                    height: 48,
                                                    bgcolor: !conversation.patient.profileImageUrl ? '#21647D' : undefined,
                                                }}
                                            >
                                                {!conversation.patient.profileImageUrl && conversation.patient.name.charAt(0)}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Typography
                                                        variant="subtitle1"
                                                        sx={{
                                                            fontWeight: conversation.unreadCount > 0 ? 700 : 500,
                                                            color: mode === 'light' ? '#333' : '#FFF',
                                                        }}
                                                    >
                                                        {conversation.patient.name}
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            color: mode === 'light' ? '#666' : '#CCC',
                                                        }}
                                                    >
                                                        {formatDate(conversation.lastMessage.timestamp)}
                                                    </Typography>
                                                </Box>
                                            }
                                            secondary={
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color: mode === 'light' ? '#666' : '#CCC',
                                                            fontWeight: conversation.unreadCount > 0 ? 600 : 400,
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            maxWidth: '180px',
                                                        }}
                                                    >
                                                        {conversation.lastMessage.content}
                                                    </Typography>
                                                    {conversation.unreadCount > 0 && (
                                                        <Box
                                                            sx={{
                                                                backgroundColor: '#21647D',
                                                                color: '#FFF',
                                                                borderRadius: '50%',
                                                                width: 20,
                                                                height: 20,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                fontSize: '0.75rem',
                                                                fontWeight: 600,
                                                            }}
                                                        >
                                                            {conversation.unreadCount}
                                                        </Box>
                                                    )}
                                                </Box>
                                            }
                                        />
                                    </ListItem>
                                    <Divider component="li" />
                                </React.Fragment>
                            ))
                        ) : (
                            <Box sx={{ p: 3, textAlign: 'center' }}>
                                <Typography sx={{ color: mode === 'light' ? '#666' : '#CCC' }}>
                                    No conversations found
                                </Typography>
                            </Box>
                        )}
                    </List>
                </Paper>

                {/* Chat area */}
                <Paper
                    elevation={0}
                    sx={{
                        flexGrow: 1,
                        backgroundColor: mode === 'light' ? '#FFFFFF' : '#2B2B2B',
                        border: `1px solid ${mode === 'light' ? '#F0F0F0' : '#3D3D3D'}`,
                        borderRadius: 2,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {/* Chat header */}
                    <Box
                        sx={{
                            p: 2,
                            borderBottom: `1px solid ${mode === 'light' ? '#F0F0F0' : '#3D3D3D'}`,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        {selectedConversation && (
                            <>
                                <Avatar
                                    src={selectedConversation.patient.profileImageUrl || undefined}
                                    alt={selectedConversation.patient.name}
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        mr: 1.5,
                                        bgcolor: !selectedConversation.patient.profileImageUrl ? '#21647D' : undefined,
                                    }}
                                >
                                    {!selectedConversation.patient.profileImageUrl && selectedConversation.patient.name.charAt(0)}
                                </Avatar>
                                <Box>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            fontWeight: 600,
                                            color: mode === 'light' ? '#333' : '#FFF',
                                        }}
                                    >
                                        {selectedConversation.patient.name}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: mode === 'light' ? '#666' : '#CCC',
                                        }}
                                    >
                                        Patient
                                    </Typography>
                                </Box>
                            </>
                        )}
                    </Box>

                    {/* Messages */}
                    <Box
                        sx={{
                            p: 2,
                            flexGrow: 1,
                            overflow: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: mode === 'light' ? '#F8FAFC' : '#1A1A1A',
                        }}
                    >
                        {mockMessages.map((message) => (
                            <Box
                                key={message.id}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: message.isOutgoing ? 'flex-end' : 'flex-start',
                                    mb: 2,
                                }}
                            >
                                <MessageBubble isOutgoing={message.isOutgoing}>
                                    {message.content}
                                </MessageBubble>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: mode === 'light' ? '#888' : '#AAA',
                                        ml: message.isOutgoing ? 0 : 1,
                                        mr: message.isOutgoing ? 1 : 0,
                                    }}
                                >
                                    {formatTime(message.timestamp)}
                                </Typography>
                            </Box>
                        ))}
                    </Box>

                    {/* Message input */}
                    <Box
                        sx={{
                            p: 2,
                            borderTop: `1px solid ${mode === 'light' ? '#F0F0F0' : '#3D3D3D'}`,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <IconButton
                            sx={{
                                color: '#21647D',
                                mr: 1,
                            }}
                        >
                            <IoMdAttach size={20} />
                        </IconButton>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Type a message..."
                            size="small"
                            value={newMessage}
                            onChange={handleNewMessageChange}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage();
                                }
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            sx={{
                                                color: '#21647D',
                                            }}
                                        >
                                            <FaRegSmile size={18} />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                sx: {
                                    borderRadius: 4,
                                    backgroundColor: mode === 'light' ? '#F5F5F5' : '#333',
                                    '& fieldset': { border: 'none' },
                                }
                            }}
                        />
                        <Button
                            variant="contained"
                            onClick={handleSendMessage}
                            disabled={!newMessage.trim()}
                            sx={{
                                ml: 1,
                                minWidth: 'auto',
                                width: 48,
                                height: 40,
                                borderRadius: 4,
                                backgroundColor: '#21647D',
                                '&:hover': { backgroundColor: '#184C5F' },
                                '&.Mui-disabled': {
                                    backgroundColor: mode === 'light' ? '#E0E0E0' : '#555',
                                },
                            }}
                        >
                            <FaPaperPlane size={16} />
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
} 