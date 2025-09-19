"use client";

import { useAppSelector, useAppDispatch } from "@/redux/reduxStore";
import { removeFromBin } from "@/redux/binSlice"; // ✅ add this reducer
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Chip,
  Stack,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
  const bins = useAppSelector((state) => state.bin.items);
  const dispatch = useAppDispatch();
  const token = useAppSelector(state=>state.user.token);

  // store quantities as free text
  const [quantities, setQuantities] = useState<string[]>(
    bins.map(() => "1")
  );

  const handleQuantityChange = (index: number, value: string) => {
    const updated = [...quantities];
    updated[index] = value;
    setQuantities(updated);
  };

  const handlePickupRequest = () => {
    if (bins.length === 0) {
      toast.error("Your bin is empty!");
      return;
    }

    const pickupData = bins.map((item, i) => ({
      ...item,
      quantity: quantities[i],
    }));

    console.log("📦 Pickup Request:", pickupData);

    // 🔜 replace with API call
    toast.success("Pickup request submitted successfully!");
    // dispatch(clearBin());
  };

  if(token === null){
    return <div>
        you need to be logged in;
    </div>
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Checkout Bin
      </Typography>

      {bins.length === 0 ? (
        <Typography>No items in bin yet.</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: "hidden" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>Confidence</TableCell>
                <TableCell>Environmental Impact</TableCell>
                <TableCell>Reward Points</TableCell>
                <TableCell>Recycling Tips</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bins.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Chip
                      label={item.category}
                      color="success"
                      size="small"
                      sx={{ fontWeight: "bold" }}
                    />
                  </TableCell>
                  <TableCell>{(item.confidence * 100).toFixed(1)}%</TableCell>
                  <TableCell>{item.environmental_impact} kg CO₂ saved</TableCell>
                  <TableCell>{item.reward_points}</TableCell>
                  <TableCell>
                    <Stack spacing={0.5}>
                      {item.recycling_tips.map((tip, idx) => (
                        <Typography key={idx} variant="body2" color="textSecondary">
                          • {tip}
                        </Typography>
                      ))}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      value={quantities[i]}
                      onChange={(e) =>
                        handleQuantityChange(i, e.target.value)
                      }
                      placeholder="e.g. 2kg / 5pcs"
                      sx={{ width: 120 }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={() => dispatch(removeFromBin(i))}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      )}
      {/* ✅ Pickup All Button */}
          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<LocalShippingIcon />}
              sx={{
                borderRadius: 2,
                px: 4,
                py: 1.5,
                fontWeight: "bold",
                textTransform: "none",
              }}
              onClick={handlePickupRequest}
            >
              Request Pickup
            </Button>
          </Box>
    </Box>
  );
}
