import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#21647D', // Dark teal from Figma
            light: '#3CB6E3', // Light blue from Figma
            dark: '#235467', // Darker teal for text
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#3CB6E3', // Light blue from Figma
            light: '#EFFAFC', // Very light blue for text
            dark: '#24819E', // Medium teal
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#FFFFFF',
            paper: '#F5F5F5',
        },
        text: {
            primary: '#235467', // Dark teal for text
            secondary: '#adb1b2', // Medium gray for secondary text
        },
        error: {
            main: '#FF5252',
        },
        success: {
            main: '#4CAF50',
        },
    },
    typography: {
        fontFamily: '"Poppins", "Montserrat", "Roboto", sans-serif',
        h1: {
            fontFamily: '"Poppins", sans-serif',
            fontSize: '64px',
            fontWeight: 600,
            lineHeight: '96px',
        },
        h2: {
            fontFamily: '"Poppins", sans-serif',
            fontSize: '48px',
            fontWeight: 700,
            lineHeight: '72px',
        },
        h3: {
            fontFamily: '"Poppins", sans-serif',
            fontSize: '40px',
            fontWeight: 600,
            lineHeight: '60px',
        },
        h4: {
            fontFamily: '"Poppins", sans-serif',
            fontSize: '28px',
            fontWeight: 600,
            lineHeight: '42px',
        },
        body1: {
            fontFamily: '"Poppins", sans-serif',
            fontSize: '28px',
            fontWeight: 600,
            lineHeight: '42px',
        },
        body2: {
            fontFamily: '"Montserrat", sans-serif',
            fontSize: '24px',
            fontWeight: 500,
            lineHeight: '29px',
        },
        button: {
            fontFamily: '"Poppins", sans-serif',
            textTransform: 'none',
            fontWeight: 700,
            fontSize: '28px',
            lineHeight: '42px',
        },
        subtitle1: {
            fontFamily: '"Montserrat", sans-serif',
            fontSize: '28px',
            fontWeight: 500,
            lineHeight: '34px',
        },
    },
    shape: {
        borderRadius: 25,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 100,
                    padding: '20px 40px',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    textTransform: 'none',
                },
                contained: {
                    background: 'linear-gradient(90deg, #21647D 0%, #3CB6E3 100%)',
                    border: '1px solid #2C809D',
                    '&:hover': {
                        background: 'linear-gradient(90deg, #1A5369 0%, #35A3CC 100%)',
                    },
                },
                outlined: {
                    background: 'linear-gradient(90deg, #3CB6E3 0%, #21647D 100%)',
                    border: '1px solid #EFFAFC',
                    color: '#FFFFFF',
                    '&:hover': {
                        background: 'linear-gradient(90deg, #35A3CC 0%, #1A5369 100%)',
                        border: '1px solid #EFFAFC',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    marginBottom: 30,
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    fontFamily: '"Montserrat", sans-serif',
                    fontSize: '28px',
                    fontWeight: 500,
                    lineHeight: '34px',
                    color: '#FFFFFF',
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontFamily: '"Montserrat", sans-serif',
                    fontSize: '28px',
                    fontWeight: 500,
                    lineHeight: '34px',
                    color: '#FFFFFF',
                    '&.Mui-focused': {
                        color: '#FFFFFF',
                    },
                },
            },
        },
    },
});

export default theme; 