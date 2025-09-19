"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import loginUser from "@/actions/loginUser";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LoginForm } from "@/types/types";
import { useAppDispatch } from "@/redux/reduxStore";
import { setUser } from "@/redux/userSlice";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const userName = null;
      const token = data['access_token'];
      dispatch(setUser({userName, token}));
      toast.success('login successfull!');
      // setEmail("")
      router.push('/');
    },
    onError: (err:string)=>{
      toast.error(err);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form: LoginForm = {
      username: email,
      password: password,
      role: 'USER',
    }
    console.log(form);
    mutation.mutate({form})
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(180deg, #388e3c 0%, #81c784 100%)",
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            bgcolor: "background.paper",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" mb={2} align="center" fontWeight={600}>
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} width="100%">
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                bgcolor: "#9c27b0",
                color: "#fff",
                boxShadow: 2,
                "&:hover": { bgcolor: "#7b1fa2" },
                fontWeight: 600,
              }}
              disabled = {mutation.isPending}
            >
              {mutation.isPending ? 'Loading...' : 'Login'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
