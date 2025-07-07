import React from 'react';
import { TextField, TextFieldProps, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useField } from 'formik';

interface InputProps extends Omit<TextFieldProps, 'variant'> {
    endAdornment?: React.ReactNode;
    name: string;
}

const StyledTextField = styled(TextField)(({ theme }) => ({
    marginBottom: theme.spacing(0.25),
    width: '100%',
    maxWidth: '480px',

    '& .MuiInputBase-root': {
        color: '#FFFFFF',
        fontFamily: '"Montserrat", sans-serif',
        fontSize: '14px',
        fontWeight: 400,
        backgroundColor: 'transparent !important',

        '&.Mui-focused': {
            backgroundColor: 'transparent !important',
        },

        '&:before': {
            borderBottom: '1px solid #FFFFFF',
        },

        '&:after': {
            borderBottom: '1px solid #FFFFFF',
        },

        '&:hover:not(.Mui-disabled):before': {
            borderBottom: '1px solid #FFFFFF',
        },

        '& .MuiInputBase-input': {
            padding: '10px 0',
            backgroundColor: 'transparent !important',
            boxShadow: 'none !important',

            '&:focus': {
                backgroundColor: 'transparent !important',
                boxShadow: 'none !important',
            },

            '&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active': {
                WebkitBoxShadow: '0 0 0 30px transparent inset !important',
                boxShadow: '0 0 0 30px transparent inset !important',
                WebkitTextFillColor: '#FFFFFF !important',
                backgroundColor: 'transparent !important',
                background: 'transparent !important',
                transition: 'background-color 9999s ease-out',
                caretColor: '#FFFFFF',
            },
        },
    },

    '& .MuiInputLabel-root': {
        color: '#FFFFFF',
        fontFamily: '"Montserrat", sans-serif',
        fontSize: '16px',
        fontWeight: 400,

        '&.Mui-focused': {
            color: '#FFFFFF',
        },
    },

    '& .MuiFormHelperText-root': {
        fontFamily: '"Montserrat", sans-serif',
        fontSize: '12px',
        marginTop: '4px',
        marginLeft: '0',
        textAlign: 'left',
        width: '100%',
        color: '#ff6b6b',
    },

    '& .MuiInputAdornment-root': {
        color: '#FFFFFF',
        '& .MuiSvgIcon-root': {
            fontSize: '24px',
            color: '#FFFFFF',
        },
        '& .MuiButtonBase-root': {
            color: '#FFFFFF',
        },
    },

    // Disable browser autofill styling
    '& input:-internal-autofill-selected': {
        backgroundColor: 'transparent !important',
        background: 'transparent !important',
        appearance: 'none',
        WebkitBoxShadow: '0 0 0 30px transparent inset !important',
        boxShadow: '0 0 0 30px transparent inset !important',
    },

    '@media (max-width: 1400px)': {
        '& .MuiInputBase-input': {
            fontSize: '16px',
            lineHeight: '26px',
            height: '26px',
        },
        '& .MuiFormLabel-root': {
            fontSize: '16px',
            lineHeight: '26px',
        },
        '& .MuiInputAdornment-root .MuiSvgIcon-root': {
            fontSize: '22px',
        },
    },

    '@media (max-width: 900px)': {
        maxWidth: '100%',
        marginBottom: theme.spacing(2),
        '& .MuiInputBase-input': {
            fontSize: '15px',
            lineHeight: '22px',
            height: '22px',
        },
        '& .MuiFormLabel-root': {
            fontSize: '15px',
            lineHeight: '22px',
        },
        '& .MuiInputAdornment-root .MuiSvgIcon-root': {
            fontSize: '20px',
        },
    },

    '@media (max-width: 600px)': {
        '& .MuiInputBase-input': {
            fontSize: '14px',
            lineHeight: '20px',
            height: '20px',
            padding: '8px 0',
        },
        '& .MuiFormLabel-root': {
            fontSize: '14px',
            lineHeight: '20px',
        },
        '& .MuiInputAdornment-root .MuiSvgIcon-root': {
            fontSize: '18px',
        },
        '& .MuiFormHelperText-root': {
            fontSize: '11px',
            marginTop: '2px',
        },
    },

    // Add touch-friendly adjustments for mobile
    '@media (pointer: coarse)': {
        '& .MuiInputBase-input': {
            padding: '12px 0',
        },
        '& .MuiIconButton-root': {
            padding: '8px',
        },
    },
}));

const Input: React.FC<InputProps> = ({ endAdornment, ...props }) => {
    // Use Formik's useField hook to get field props and meta
    const [field, meta] = useField(props.name);

    const hasError = meta.touched && !!meta.error;

    const inputProps = endAdornment
        ? {
            endAdornment: (
                <InputAdornment position="end">
                    {endAdornment}
                </InputAdornment>
            ),
            autoComplete: "off"
        }
        : {
            autoComplete: "off"
        };

    return (
        <StyledTextField
            variant="standard"
            InputProps={inputProps}
            inputProps={{
                style: {
                    backgroundColor: 'transparent',
                    WebkitBoxShadow: 'none',
                    boxShadow: 'none'
                }
            }}
            error={hasError}
            helperText={hasError ? meta.error : ''}
            {...field}
            {...props}
        />
    );
};

export default Input;