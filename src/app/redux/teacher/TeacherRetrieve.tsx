import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


interface Teacher {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

interface TeacherState {
    isLoading: boolean;
    data: Teacher[] | null;
    isError: boolean;
}

export const getTeacherInfo = createAsyncThunk<Teacher[]>('getTeacherInfo', async () => {
    const response = await axios.get(`${process.env.BASE_URL}teacher`);
    return response.data;
});

const initialState: TeacherState = {
    isLoading: false,
    data: null,
    isError: false
};

const teacherRetrieveSlice = createSlice({
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

export default teacherRetrieveSlice.reducer;
