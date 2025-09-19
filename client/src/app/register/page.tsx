"use client";
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import registerUser from "@/actions/registerUser";
import toast from "react-hot-toast";
import { RegisterForm } from "@/types/types";

export default function Page() {
  const [form, setForm] = useState<RegisterForm>({
    firstName: null,
    lastName: null,
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const router = useRouter();
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data:string)=>{
      toast.success(data);
      router.push('/login');
    },
    onError: (err:string)=>{
      toast.error(err);
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: handle registration logic
    mutation.mutate({form});
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(180deg, rgba(56,142,60,1) 0%, rgba(129,199,132,1) 100%)",
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
          <Typography
            variant="h5"
            mb={2}
            align="center"
            fontWeight={600}
            color="#9c27b0"
          >
            Register
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <TextField
              label="First Name"
              name="firstName"
              value={form.firstName ?? ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={form.lastName ?? ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
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
            >
              Register
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
    