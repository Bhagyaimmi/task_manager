
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserState {
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    token: null,
    loading: false,
    error: null,
};

export const login = createAsyncThunk('user/login', async (userData: { email: string, password: string }) => {
    const response = await axios.post('/api/users/login', userData);
    return response.data;
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(login.pending, state => {
            state.loading = true;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.token = action.payload.token;
            state.error = null;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to login';
        });
    },
});

export default userSlice.reducer;
