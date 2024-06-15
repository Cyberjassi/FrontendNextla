import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Course {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
interface CourseState {
  isLoading: boolean;
  data: Course[] | null | File;
  isError: boolean;
}
export const getAllCourseInfo = createAsyncThunk<Course[]>(
  "getAllCourseInfo",
  async () => {
    const response = await axios.get(`${process.env.BASE_URL}course/`);
    return response.data;
  }
);
const initialState: CourseState = {
  isLoading: false,
  data: null,
  isError: false,
};

const CourseAllRetrieveSlice = createSlice({
  name: "getAllCourseInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCourseInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCourseInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getAllCourseInfo.rejected, (state, action) => {
        console.log("Error", action.payload);
        state.isError = true;
      });
  },
});

export default CourseAllRetrieveSlice.reducer;
