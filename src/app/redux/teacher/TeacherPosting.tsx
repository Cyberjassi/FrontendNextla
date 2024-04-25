import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// Interface for the teacher object
interface Teacher {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

// Interface for the new teacher data
interface NewTeacher {
    full_name: string;
    email: string;
    password: string;
    qualification: string;
    mobile_no: string;
    profile_img: string;
    skills: string[];
}

// Interface for the teacher slice state
interface TeacherState {
    isLoading: boolean;
    teacher: Teacher | null; // Changed to single teacher object
    isError: boolean;
}

// Async thunk for adding a new teacher
export const addNewTeacher = createAsyncThunk<Teacher, NewTeacher>('addNewTeacher', async (newTeacher) => {
    const response = await axios.post("http://localhost:8000/api/teacher", newTeacher);
    return response.data;
});

// Initial state for the teacher slice
const initialState: TeacherState = {
    isLoading: false,
    teacher: null, // Changed to single teacher object
    isError: false
};

// Creating the teacher slice
const teacherSlice = createSlice({
    name: "teacher",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addNewTeacher.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addNewTeacher.fulfilled, (state, action) => {
                state.isLoading = false;
                state.teacher = action.payload; // Updated to set single teacher object
            })
            .addCase(addNewTeacher.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    }
});

export default teacherSlice.reducer;
