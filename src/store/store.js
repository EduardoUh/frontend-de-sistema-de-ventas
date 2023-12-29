import { configureStore } from '@reduxjs/toolkit';
import { authSlice, uISlice, paginationSlice } from './';


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        uI: uISlice.reducer,
        pagination: paginationSlice.reducer,
    }
});
