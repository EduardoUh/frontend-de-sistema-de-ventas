import { configureStore } from '@reduxjs/toolkit';
import { authSlice, uISlice, recordsSlice } from './';


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        uI: uISlice.reducer,
        records: recordsSlice.reducer,
    }
});
