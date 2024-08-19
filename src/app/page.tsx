'use client'

import Navbar from "@/component/Navbar";
import { createTheme, ThemeProvider } from "@mui/material";

const defaultTheme = createTheme();


export default function Page() {

return (
  <ThemeProvider theme={defaultTheme}>
    <Navbar />

    </ ThemeProvider>

)
}