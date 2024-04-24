import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

interface TodoState {
    isLoading: boolean;
    data: Todo[] | null;
    isError: boolean;
}

export const getTeacherInfo = createAsyncThunk<Todo[]>('getTeacherInfo', async () => {
    const response = await axios.get("http://localhost:8000/api/teacher");
    return response.data;
});

const initialState: TodoState = {
    isLoading: false,
    data: null,
    isError: false
};

const todoSlice = createSlice({
    name: "getteacherinfo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTeacherInfo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTeacherInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getTeacherInfo.rejected, (state, action) => {
                console.log("Error", action.payload);
                state.isError = true;
            });
    }
});

export default todoSlice.reducer;
