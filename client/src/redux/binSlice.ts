import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type RecyclingInfo = {
  category: string;
  confidence: number;
  environmental_impact: number;
  reward_points: number;
  recycling_tips: string[];
};

interface BinState {
  items: RecyclingInfo[];
}

const initialState: BinState = {
  items: [],
};

const binSlice = createSlice({
  name: "bin",
  initialState,
  reducers: {
    addToBin: (state, action: PayloadAction<RecyclingInfo>) => {
      state.items.push(action.payload);
    },
    clearBin: (state) => {
      state.items = [];
    },
    removeFromBin: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index >= 0 && index < state.items.length) {
        state.items.splice(index, 1);
      }
    },
  },
});

export const { addToBin, clearBin, removeFromBin } = binSlice.actions;
export default binSlice.reducer;
