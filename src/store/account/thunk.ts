import { API } from "@/api/cpdefAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
    "account/login",
    async ({ email, password }: { email?: string; password?: string }, {rejectWithValue}) => {
        try {
            const res = await API.login(email, password);
            return res;
        } catch (error: any) {
            throw error;
        }
    }
);

export const logout = createAsyncThunk(
    "account/logout",
    async () => {
        try {
            const res = await API.logout();
            return res;
        } catch (error: any) {
            throw error;
        }
    }
);
