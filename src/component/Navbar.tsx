import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    CssBaseline,
} from "@mui/material";
import Image from "next/image";
import { GetUserInfo } from "../services/users";
import { EvaluateResponse } from "../utils/requestEvaluator";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const [userName, setUserName] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userInfo = await GetUserInfo();
                console.log(userInfo);
                setUserName(userInfo.firstname);
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

    return (
        <AppBar position="static" sx={{ backgroundColor: "black" }}>
            <CssBaseline />
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    <Link href="/" passHref>
                        <Image
                            src="/images/horizontal_white.svg"
                            alt="Commette Logo"
                            width={175}
                            height={75}
                        />
                    </Link>
                </Typography>
                {userName ? (
                    <Typography variant="h6">{`Welcome, ${userName}`}</Typography>
                ) : (
                    <>
                        <Link href="/signup" passHref>
                            <Button
                                variant="contained"
                                sx={{ marginRight: 2, backgroundColor: "purple", '&:hover': { backgroundColor: "darkviolet" } }}
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
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
