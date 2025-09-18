import { User } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState:User = {
    userName: null,
    token: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const user = action.payload;
            state.userName = user['userName'];
            state.token = user['token']
        },
        resetUser: (state) =>{
            state.userName = null;
            state.token = null;
        }
    }
});

export const {setUser, resetUser} = userSlice.actions;
export default userSlice.reducer;