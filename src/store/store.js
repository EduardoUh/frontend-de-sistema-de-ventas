import { configureStore } from '@reduxjs/toolkit';
import { authSlice, uISlice } from './';


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        uI: uISlice.reducer,
    }
});
