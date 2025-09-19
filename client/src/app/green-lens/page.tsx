"use client";

import uploadImage from "@/actions/uploadImage";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Container,
  Paper,
  CircularProgress,
  Divider,
  Chip,
  Stack,
  useTheme,
  alpha,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import RecyclingIcon from "@mui/icons-material/Recycling";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

type RecyclingInfo = {
  category: string;
  confidence: number;
  environmental_impact: number;
  reward_points: number;
  recycling_tips: string[];
};

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const theme = useTheme();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const mutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: () => {
      toast.success("Successfully uploaded");
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });

  const handleUpload = () => {
    if (!file) return;
    const form = new FormData();
    form.append("file", file);
    mutation.mutate({ form });
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          py: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            borderRadius: 3,
            overflow: "hidden",
            bgcolor: "transparent",
          }}
        >
          <Box
            sx={{
              p: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
              color: "white",
            }}
          >
            <RecyclingIcon sx={{ mr: 1.5, fontSize: 32 }} />
            <Typography variant="h4" fontWeight="bold">
              Recycle Lens
            </Typography>
          </Box>

          <Box
            sx={{
              p: 4,
              bgcolor: alpha(theme.palette.background.paper, 0.9),
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)",
            }}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mb={4}
            >
              {preview ? (
                <Paper
                  elevation={3}
                  sx={{
                    width: "100%",
                    height: 350,
                    mb: 3,
                    overflow: "hidden",
                    borderRadius: 2,
                    position: "relative",
                  }}
                >
                  <Box
                    component="img"
                    src={preview}
                    alt="Preview"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.03)",
                      },
                    }}
                  />
                </Paper>
              ) : (
                <Paper
                  elevation={2}
                  sx={{
                    width: "100%",
                    height: 350,
                    bgcolor: alpha(theme.palette.grey[200], 0.5),
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color: theme.palette.grey[600],
                    mb: 3,
                    border: `2px dashed ${theme.palette.grey[300]}`,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: alpha(theme.palette.grey[200], 0.7),
                      borderColor: theme.palette.primary.light,
                    },
                  }}
                  component="label"
                >
                  <CloudUploadIcon
                    sx={{
                      fontSize: 60,
                      mb: 2,
                      color: theme.palette.primary.light,
                    }}
                  />
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Drop your image here
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    or click to browse files
                  </Typography>
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleFileChange}
                  />
                </Paper>
              )}

              <Stack direction="row" spacing={2} width="100%">
                {preview && (
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                    sx={{
                      flexGrow: 1,
                      py: 1.5,
                      borderRadius: 2,
                    }}
                  >
                    Change Image
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleFileChange}
                    />
                  </Button>
                )}

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpload}
                  disabled={!file || mutation.isPending}
                  sx={{
                    flexGrow: 2,
                    py: 1.5,
                    borderRadius: 2,
                    bgcolor: theme.palette.success.main,
                    "&:hover": {
                      bgcolor: theme.palette.success.dark,
                    },
                    transition: "all 0.3s ease",
                  }}
                  startIcon={
                    mutation.isPending ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <CheckCircleIcon />
                    )
                  }
                >
                  {mutation.isPending ? "Analyzing..." : "Verify Collection"}
                </Button>
              </Stack>
            </Box>

            {mutation.data && (
              <Card
                sx={{
                  mt: 3,
                  borderRadius: 2,
                  overflow: "hidden",
                  boxShadow: `0 8px 24px ${alpha(
                    theme.palette.success.main,
                    0.15
                  )}`,
                }}
              >
                <Box
                  sx={{
                    bgcolor: theme.palette.success.main,
                    color: "white",
                    py: 1.5,
                    px: 3,
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    Analysis Result
                  </Typography>
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Stack spacing={2}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography fontWeight={500}>
                        Waste Type Match:
                      </Typography>
                      <Chip
                        label={mutation.data.category }
                        color={mutation.data.category ? "success" : "error"}
                        size="small"
                      />
                    </Stack>

                    {/* <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography fontWeight={500}>Quantity Match:</Typography>
                      <Chip label="Yes" color="success" size="small" />
                    </Stack> */}

                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography fontWeight={500}>Confidence:</Typography>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CircularProgress
                          variant="determinate"
                          value={mutation.data.confidence * 100}
                          size={24}
                          sx={{ mr: 1, color: theme.palette.success.main }}
                        />
                        <Typography>
                          {(mutation.data.confidence * 100).toFixed(2)}%
                        </Typography>
                      </Box>
                    </Stack>

                    <Divider />

                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography fontWeight={500}>
                        Environmental Impact:
                      </Typography>
                      <Chip
                        icon={<RecyclingIcon />}
                        label={`${mutation.data.environmental_impact} kg CO₂ saved`}
                        color="primary"
                      />
                    </Stack>

                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography fontWeight={500}>Reward Points:</Typography>
                      <Chip
                        icon={<LocalOfferIcon />}
                        label={mutation.data.reward_points}
                        ></Chip>
                    </Stack>

                    <Box sx={{ mt: 2 }}>
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        gutterBottom
                      >
                        Recycling Tips:
                      </Typography>
                      <List
                        dense
                        sx={{
                          bgcolor: alpha(theme.palette.success.light, 0.1),
                          borderRadius: 1,
                          p: 1.5,
                        }}
                      >
                        {mutation.data.recycling_tips.map(
                          (tip: string, i: number) => (
                            <ListItem key={i} sx={{ px: 1, py: 0.5 }}>
                              <ListItemText
                                primary={tip}
                                primaryTypographyProps={{
                                  fontSize: "0.95rem",
                                  color: theme.palette.text.secondary,
                                }}
                              />
                            </ListItem>
                          )
                        )}
                      </List>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
