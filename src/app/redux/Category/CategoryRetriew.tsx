import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


interface Category {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

interface CategoryState {
    isLoading: boolean;
    data: Category[] | null;
    isError: boolean;
}

export const getCategoryInfo = createAsyncThunk<Category[]>('getCategoryInfo', async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/category/");
    return response.data;
});

const initialState: CategoryState = {
    isLoading: false,
    data: null,
    isError: false
};

const categoryRetrieveSlice = createSlice({
    name: "getcategoryinfo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategoryInfo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCategoryInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getCategoryInfo.rejected, (state, action) => {
                console.log("Error", action.payload);
                state.isError = true;
            });
    }
});

export default categoryRetrieveSlice.reducer;
