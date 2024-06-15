
import teacherReducer from './teacher/TeacherRetrieve';
import categoryReducer from './Category/CategoryRetriew'
import courseReducer from './Course/CourseRetreieve';
import AllCourseretrieve from './Course/AllCourseretrieve';
import { configureStore } from '@reduxjs/toolkit';


export const store = configureStore({
    reducer: {
        teacher:teacherReducer ,
        category: categoryReducer,
        course: courseReducer,
        allcourse: AllCourseretrieve
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch