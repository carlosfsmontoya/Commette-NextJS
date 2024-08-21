import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    CssBaseline,
    Box,
    Stack
} from "@mui/material";
import Image from "next/image";
import { GetUserInfo } from "../services/users";
import { EvaluateResponse } from "../utils/requestEvaluator";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const [userName, setUserName] = useState<string | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userInfo = await GetUserInfo();
                console.log(userInfo);
                setUserName(userInfo.firstname);
                setUserRole(userInfo.role); // Guardar el rol del usuario
            } catch (error: any) {
                // Asegúrate de que el error tenga una respuesta
                if (error.response) {
                    const evaluatedResponse = EvaluateResponse(error.response);
                    if (evaluatedResponse !== "") {
                        router.push(evaluatedResponse);
                    }
                } else {
                    console.error('Error fetching user info:', error);
                }
            }
        };

        if (typeof window !== "undefined") {
            const token = localStorage.getItem('token');
            if (token) {
                fetchData();
            }
        }
    }, [router]);

    const handleLogout = () => {
        // Remove token from local storage
        localStorage.removeItem('token');
        // Redirect to login page
        router.push('/login');
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "black" }}>
            <CssBaseline />
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                        <Link href="/" passHref>
                            <Image
                                src="/images/horizontal_white.svg"
                                alt="Commette Logo"
                                width={175}
                                height={75}
                            />
                        </Link>
                    </Typography>
                </Box>
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'left' }}>
                    {userName && (
                        <Stack direction="row" spacing={2}>
                            <Link href="/product" passHref>
                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: "purple", '&:hover': { backgroundColor: "darkviolet" } }}
                                >
                                    Products
                                </Button>
                            </Link>
                            {userRole === "Seller" && (
                                <Link href="/product/create" passHref>
                                    <Button
                                        variant="contained"
                                        sx={{ backgroundColor: "purple", '&:hover': { backgroundColor: "darkviolet" } }}
                                    >
                                        Add Product
                                    </Button>
                                </Link>
                            )}
                        </Stack>
                    )}
                </Box>
                <Box>
                    {userName ? (
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Typography variant="h6">{`Welcome, ${userName}`}</Typography>
                            <Button
                                variant="contained"
                                sx={{ backgroundColor: "purple", '&:hover': { backgroundColor: "darkviolet" } }}
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </Stack>
                    ) : (
                        <Stack direction="row" spacing={2}>
                            <Link href="/signup" passHref>
                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: "purple", '&:hover': { backgroundColor: "darkviolet" } }}
                                >
                                    Sign Up
                                </Button>
                            </Link>
                            <Link href="/login" passHref>
                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: "purple", '&:hover': { backgroundColor: "darkviolet" } }}
                                >
                                    Login
                                </Button>
                            </Link>
                        </Stack>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
