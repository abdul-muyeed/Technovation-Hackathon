import LogoutBtn from '@/components/LogoutBtn';
import { useAppSelector } from '@/redux/reduxStore';
import { AppBar, Toolbar, Typography, Button, Container, Box, Grid, Paper } from '@mui/material'
import Link from 'next/link';


export default function MainAppBar(){
    const token = useAppSelector(state=>state.user.token);
    return (
        <AppBar position="static" color="success" elevation={0}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link
        href='/'
        >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            ♻ RecycleHub
            </Typography>
        </Link>
        <Box sx={{ display: "flex", gap: 2 }}>
            <Link
            href="/login"
            >
            {
                !token && (
                <>
                    <Button color="inherit" sx={{ mr: 2 }}>
                    Login
                    </Button>
                </>
                )
            }
            </Link>
            <Link
            href='/register'
            >
            {
                !token && (
                <>
                    <Button variant="contained" color="secondary">
                    Register
                    </Button>
                </>
                )
            }
            </Link>
            <Link
            href='/green-lens'
            >
            {
                token && (
                <>
                    <Button variant="contained" color="secondary">
                    GreenLens
                    </Button>
                </>
                )
            }
            </Link>
            <Link
            href='/bin-checkout'
            >
            {
                token && (
                <>
                    <Button variant="contained" color="secondary">
                    bin-checkout
                    </Button>
                </>
                )
            }
            </Link>
            {
            token && (
                <>
                <LogoutBtn/>
                </>
            )
            }
        </Box>
        </Toolbar>
      </AppBar>
    );
}