"use client";

import LogoutBtn from '@/components/LogoutBtn';
import { useAppSelector } from '@/redux/reduxStore';
import { AppBar, Toolbar, Typography, Button, Container, Box, Grid, Paper } from '@mui/material'
import Link from 'next/link';

export default function Home() {
  const token = useAppSelector(state => state.user.token);
  return (
    <div>
      {/* Header */}
      <AppBar position="static" color="success" elevation={0}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            ♻ RecycleHub
          </Typography>
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

      {/* Hero Section */}
      <Box
        sx={{
          py: 10,
          textAlign: "center",
          background: "linear-gradient(135deg, #4caf50, #81c784)",
          color: "white",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" gutterBottom fontWeight="bold">
            Welcome to RecycleHub
          </Typography>
          <Typography variant="h6" paragraph>
            Your eco-friendly companion for recycling smarter and living greener.
          </Typography>
          <Button size="large" variant="contained" color="secondary">
            Get Started
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {[
            {
              title: "Track Recycling",
              desc: "Easily monitor your recycling habits and progress.",
            },
            {
              title: "Eco Challenges",
              desc: "Participate in fun challenges to make a bigger impact.",
            },
            {
              title: "Community",
              desc: "Connect with like-minded people working for a greener planet.",
            },
          ].map((feature, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: 3,
                  height: "100%",
                }}
              >
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  {feature.title}
                </Typography>
                <Typography variant="body1">{feature.desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{ py: 3, textAlign: "center", bgcolor: "grey.100", mt: 5 }}>
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} RecycleHub. All rights reserved.
        </Typography>
      </Box>
    </div>
  );
}
