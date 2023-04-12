import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { accountInitialState } from "./state";
import { login, logout } from "./thunk";

const accountSlice = createSlice({
    name: "account",
    initialState: accountInitialState,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<boolean>) {
            state.isLoggedIn = action.payload;
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(login.fulfilled, (state)=>{
            state.isLoggedIn = true;
        })
        .addCase(logout.fulfilled, (state) => {
            state.isLoggedIn = false;
        })
    }
})

export const {
    setIsLoggedIn
} = accountSlice.actions

export default accountSlice.reducer