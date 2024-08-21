'use client'

import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Navbar from '@/component/Navbar';

import { SignUpFormValidator } from "@/utils/utils";
import { Register } from "@/services/users";

const defaultTheme = createTheme();

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [companyName, setCompanyName] = useState('');

    const [warningMessages, setWarningMessages] = useState<string[]>([]);
    const [isSeller, setIsSeller] = useState(false);

    const handleSellerCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsSeller(event.target.checked);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const warnings = SignUpFormValidator(
            email,
            password,
            confirmPassword,
            name,
            lastname,
            username,
            isSeller,
            companyName
        );
        setWarningMessages(warnings);

        if (warnings.length === 0) {
            Register({
                email: email,
                password: password,
                firstname: name,
                lastname: lastname,
                username: username,
                companyName: isSeller ? companyName : null
            }).then((response) => {
                if (response.error) {
                    setWarningMessages([response.error]);
                } else {
                    // Redirigir o mostrar un mensaje de éxito
                }
            }).catch((error) => {
                setWarningMessages(["User already exists"]);
            });
        }
    }

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
                        Sign Up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        {warningMessages.length > 0 && (
                            <Box
                                sx={{
                                    mb: 2,
                                    p: 2,
                                    backgroundColor: 'error.main', // Fondo rojo para advertencias
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
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="confirmPassword"
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    type="password"
                                    autoComplete="new-password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="isSeller"
                                            color="primary"
                                            onChange={handleSellerCheckbox}
                                        />
                                    }
                                    label="Register as a Seller"
                                />
                            </Grid>
                            {isSeller && (
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="companyName"
                                        label="Company Name"
                                        name="companyName"
                                        autoComplete="organization"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                    />
                                </Grid>
                            )}
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 8 }}
                        >
                            Sign Up
                        </Button>
              
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
