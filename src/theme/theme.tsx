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