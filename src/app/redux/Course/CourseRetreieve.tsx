
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import cookies from 'js-cookie';


interface Course {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}
interface CourseState {
    isLoading: boolean;
    data: Course[] | null;
    isError: boolean;
}
export const getCourseInfo = createAsyncThunk<Course[]|any>('getCourseInfo', async () => {
    const token = cookies.get('token')
    const teacherId = localStorage.getItem("teacherId")
    console.log('teacher id from course retruive ',teacherId)
    const response = await axios.get(`${process.env.BASE_URL}teacher-courses/${teacherId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
      
      })
    return response.data;
});

const initialState: CourseState = {
    isLoading: false,
    data: null,
    isError: false
};

const CourseRetrieveSlice = createSlice({
    name: "getCourseinfo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCourseInfo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCourseInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getCourseInfo.rejected, (state, action) => {
                console.log("Error", action.payload);
                state.isError = true;
            });
    }
});

export default CourseRetrieveSlice.reducer;
