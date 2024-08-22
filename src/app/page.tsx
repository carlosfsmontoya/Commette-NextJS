'use client'

import Navbar from "@/component/Navbar";
import { createTheme, ThemeProvider, Box, Typography } from "@mui/material";
import Image from 'next/image';

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
          height: 'calc(100vh - 64px)',
          textAlign: 'center',
          paddingTop: 8, 
        }}
      >
        <Typography variant="h4" gutterBottom>
          Site Under Construction
        </Typography>
        <Box
          sx={{
            width: '100%',
            maxWidth: 600, 
            paddingX: 2, 
          }}
        >
          <Image
            src="/images/go-banner.png"
            alt="Site Under Construction"
            layout="responsive"
            width={600}
            height={400} 
            style={{ objectFit: 'contain' }} 
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
