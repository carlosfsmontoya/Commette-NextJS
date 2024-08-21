'use client'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from '@/component/Navbar';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { LoginUser } from '@/services/users';
import { LoginFormValidator } from '@/utils/utils';
import Container from '@mui/material/Container'; // Add this line

const defaultTheme = createTheme();

export default function SignInSide() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [warningMessages, setWarningMessages] = useState<string[]>([]);

    // Limpiar localStorage
    useEffect(() => {
        console.log('Cleaning localStorage');
        localStorage.removeItem('token');
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const warnings = LoginFormValidator(email, password);

        if (warnings.length === 0) {
            try {
                const response = await LoginUser({
                    email: email,
                    password: password
                });

                if (response.error) {
                    setWarningMessages([response.error]);
                } else {
                    localStorage.setItem('token', response.idToken);
                    router.push('/');
                }
            } catch (error) {
                setWarningMessages(['Network response was not ok', 'User or password incorrect']);
            }
        } else {
            setWarningMessages(warnings);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Navbar />
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        {warningMessages.length > 0 && (
                            <Box
                                sx={{
                                    mb: 2,
                                    p: 2,
                                    backgroundColor: 'error.main', // Fondo rojo
                                    borderRadius: 1,
                                }}
                            >
                                {warningMessages.map((message, index) => (
                                    <Typography key={index} color="common.white">
                                        {message}
                                    </Typography>
                                ))}
                            </Box>
                        )}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                   
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
