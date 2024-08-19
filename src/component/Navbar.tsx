import React from "react";
import Link from "next/link";
import { AppBar, Toolbar, Typography, Button, createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { Css } from "@mui/icons-material";

const defaultTheme = createTheme();


const Navbar = () => (

    <AppBar position="static" sx={{ backgroundColor: "black" }}>
        <CssBaseline></CssBaseline>
        <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                <Link href="/" passHref>
                <Button variant="text">Commette</Button>
                </Link>
            </Typography>
            <Link href="/signup" passHref>
                <Button variant="contained" sx={{ marginRight: 2 }}>
                    Sign Up
                </Button>
            </Link>
            <Link href="/login" passHref>
                <Button variant="contained">Login</Button>
            </Link>
        </Toolbar>
    </AppBar>

);

export default Navbar;
