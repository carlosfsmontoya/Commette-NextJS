import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    CssBaseline,
    Box,
    Stack,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    useMediaQuery
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import { GetUserInfo } from "../services/users";
import { EvaluateResponse } from "../utils/requestEvaluator";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const [userName, setUserName] = useState<string | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const router = useRouter();
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userInfo = await GetUserInfo();
                console.log(userInfo);
                setUserName(userInfo.firstname);
                setUserRole(userInfo.role);
            } catch (error: any) {
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
        localStorage.removeItem('token');
        router.push('/login');
    };

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const drawerContent = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>


                {userName ? (
                    <>
             
                        <ListItem>
                            <ListItemText primary={`Welcome, ${userName}`} />
                        </ListItem>
                        {userRole === "Seller" && (
                            <>
                               <ListItem button component={Link} href="/panel">
                        <ListItemText primary="Panel" />
                    </ListItem>   
                    <ListItem button component={Link} href="/product/create">
                        <ListItemText primary="Add Product" />
                    </ListItem>
                            </>
                 
                    
                )}
                        <ListItem button component={Link} href="/product">
                    <ListItemText primary="Products" />
                </ListItem>
                        <ListItem button onClick={handleLogout}>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </>
                ) : (
                    <>
                        <ListItem button component={Link} href="/signup">
                            <ListItemText primary="Sign Up" />
                        </ListItem>
                        <ListItem button component={Link} href="/login">
                            <ListItemText primary="Login" />
                        </ListItem>
                    </>
                )}
            </List>
        </Box>
    );

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
                {isSmallScreen ? (
                    <>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleDrawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            anchor="right"
                            open={drawerOpen}
                            onClose={toggleDrawer(false)}
                        >
                            {drawerContent}
                        </Drawer>
                    </>
                ) : (
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
                                    <>
                                            <Link href="/panel" passHref>
                                        <Button
                                            variant="contained"
                                            sx={{ backgroundColor: "purple", '&:hover': { backgroundColor: "darkviolet" } }}
                                        >
                                            Panel
                                        </Button>
                                    </Link>
                                    <Link href="/product/create" passHref>
                                        <Button
                                            variant="contained"
                                            sx={{ backgroundColor: "purple", '&:hover': { backgroundColor: "darkviolet" } }}
                                        >
                                            Add Product
                                        </Button>
                                    </Link>
                                    </>
                            
                                )}
                            </Stack>
                        )}
                    </Box>
                )}
                {!isSmallScreen && (
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
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;