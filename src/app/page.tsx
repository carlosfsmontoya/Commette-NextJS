'use client'

import Navbar from "@/component/Navbar";
import { createTheme, ThemeProvider, Box, Typography } from "@mui/material";

const defaultTheme = createTheme();

export default function Page() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Site Under Construction
        </Typography>
        <img src="/images/go-banner.png" alt="Site Under Construction" />
      </Box>
    </ThemeProvider>
  );
}