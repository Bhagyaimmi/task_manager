
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Task {
    _id: string;
    title: string;
    description?: string;
    status: string;
    priority?: string;
    deadline?: string;
}

interface TaskState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
}

const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: null,
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, { getState }) => {
    const state = getState() as { user: { token: string | null } };
    const response = await axios.get('/api/tasks', {
        headers: { Authorization: `Bearer ${state.user.token}` },
    });
    return response.data;
});

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchTasks.pending, state => {
            state.loading = true;
        });
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state.loading = false;
            state.tasks = action.payload;
            state.error = null;
        });
        builder.addCase(fetchTasks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch tasks';
        });
    },
});

export default taskSlice.reducer;
