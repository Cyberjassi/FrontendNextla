// import slice from './slice'
// import reducer from './slice'
import teacherReducer from './teacher/TeacherRetrieve';
import categoryReducer from './Category/CategoryRetriew'
import courseReducer from './Course/CourseRetreieve';
import AllCourseretrieve from './Course/AllCourseretrieve';
import { configureStore } from '@reduxjs/toolkit';


// in which we confiure our actions and reducer
export const store = configureStore({
    reducer: {
        teacher:teacherReducer ,
        category: categoryReducer,
        course: courseReducer,
        allcourse: AllCourseretrieve
    },
});

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch