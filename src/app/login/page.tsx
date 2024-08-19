'use client'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from '@/component/Navbar';


import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { LoginUser } from  '@/services/users';
import { LoginFormValidator } from '@/utils/utils';

const defaultTheme = createTheme();

export default function SignInSide() {


    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [warningMessage, setWarningMessage] = useState<string[]>([]);

    //Limpiamos localStorage
    useEffect(() => {
        console.log('Cleaning localStorage');
        localStorage.removeItem('token');
    }, []);

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        console.log('Email:', email);
        console.log(password)
        const warnings = LoginFormValidator(
            email,
            password
        );

        if (warnings.length === 0) {
            LoginUser({
                email: email,
                password: password
            }).then( (response) => {
                if (response.error) {
                    setWarningMessage([response.error] as never[]);
                } else {
                    localStorage.setItem('token', response.idToken);
                    router.push('/');
                }
            }).catch( (error) => {
                setWarningMessage(['Network response was not ok','User or password incorrect']);
            })
        }else{
            setWarningMessage(warnings);
        }
    }




    return (
        <ThemeProvider theme={defaultTheme}>
            <Navbar />
            <Grid container component="main" >
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage:
                            'url("/images/login-bg.png")',

                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'left',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
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
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                onChange={ (e) => setEmail( e.target.value ) }
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
                                onChange={ (e) => setPassword( e.target.value ) }
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}