import { createTheme } from '@mui/material/styles';

// Light theme definition
export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#267997',
        },
        background: {
            default: '#F5F9FA',
            paper: '#ffffff',
        },
        text: {
            primary: '#454747',
            secondary: '#21647D',
        },
    },
    typography: {
        fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
        MuiInputBase: {
            styleOverrides: {
                root: {
                    backgroundColor: 'transparent !important',
                    '&.Mui-focused': {
                        backgroundColor: 'transparent !important',
                    },
                    '& input': {
                        backgroundColor: 'transparent !important',
                        WebkitBoxShadow: 'none !important',
                        boxShadow: 'none !important',
                        '&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active': {
                            WebkitBoxShadow: 'none !important',
                            boxShadow: 'none !important',
                            WebkitTextFillColor: 'inherit !important',
                            transition: 'background-color 9999s ease-out, color 9999s ease-out',
                            backgroundColor: 'transparent !important'
                        }
                    }
                },
                input: {
                    '&:-webkit-autofill': {
                        transition: 'background-color 9999s ease-out, color 9999s ease-out',
                        WebkitTextFillColor: 'inherit !important',
                        WebkitBoxShadow: 'none !important',
                        boxShadow: 'none !important',
                        backgroundColor: 'transparent !important'
                    }
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-root': {
                        backgroundColor: 'transparent !important'
                    },
                    '& .MuiInputBase-input': {
                        backgroundColor: 'transparent !important'
                    }
                }
            }
        }
    }
});

// Dark theme definition
export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#267997',
        },
        background: {
            default: '#1A1A1A',
            paper: '#2B2B2B',
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#B8C7CC',
        },
    },
    typography: {
        fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
        MuiInputBase: {
            styleOverrides: {
                root: {
                    backgroundColor: 'transparent !important',
                    '&.Mui-focused': {
                        backgroundColor: 'transparent !important',
                    },
                    '& input': {
                        backgroundColor: 'transparent !important',
                        WebkitBoxShadow: 'none !important',
                        boxShadow: 'none !important',
                        '&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active': {
                            WebkitBoxShadow: 'none !important',
                            boxShadow: 'none !important',
                            WebkitTextFillColor: 'inherit !important',
                            transition: 'background-color 9999s ease-out, color 9999s ease-out',
                            backgroundColor: 'transparent !important'
                        }
                    }
                },
                input: {
                    '&:-webkit-autofill': {
                        transition: 'background-color 9999s ease-out, color 9999s ease-out',
                        WebkitTextFillColor: 'inherit !important',
                        WebkitBoxShadow: 'none !important',
                        boxShadow: 'none !important',
                        backgroundColor: 'transparent !important'
                    }
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-root': {
                        backgroundColor: 'transparent !important'
                    },
                    '& .MuiInputBase-input': {
                        backgroundColor: 'transparent !important'
                    }
                }
            }
        }
    }
}); 