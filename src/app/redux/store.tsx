// import slice from './slice'
// import reducer from './slice'
import todoReducer from './teacher/todo';
import { configureStore } from '@reduxjs/toolkit';

// in which we confiure our actions and reducer
export const store = configureStore({
    reducer: {
        todo: todoReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch