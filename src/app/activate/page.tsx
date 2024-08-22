'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { ActivateUser } from '@/services/users';

const Activate = () => {

    const router = useRouter();

    const [warningMessage, setWarningMessage] = useState<string[]>([]);
    const [code, setCode] = useState('');
    const [open, setOpen] = useState(false);
    const [sending, setSending] = useState(false);

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (code === '') {
            setWarningMessage(['Code is required']);
            return;
        }
        setSending(true);
        ActivateUser(code).then((response) => {
            setOpen(true);
            router.push('/login');
        }).catch((error) => {
            setWarningMessage(['Code is incorrect']);
            setSending(false);
        })
    }

    const handleChange = (e: { target: { value: any; }; }) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setCode(value);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Activate your account
                </Typography>

 
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        id="code"
                        label="Insert the code sent to your email"
                        name="code"
                        value={code}
                        onChange={handleChange}
                        autoFocus
                        required
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={sending}
                    >
                        {sending ? <CircularProgress size={24} /> : 'Activate'}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Activate;
