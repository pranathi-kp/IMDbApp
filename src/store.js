import { configureStore } from '@reduxjs/toolkit';
import UsersReducer from './features/UsersSlice';
import MoviesReducer from './features/MoviesSlice';
import ModalReducer from './features/ModalSlice';
const store = configureStore({
    reducer:{
        user: UsersReducer,
        movie: MoviesReducer,
        modal: ModalReducer
    },
});

export default store;