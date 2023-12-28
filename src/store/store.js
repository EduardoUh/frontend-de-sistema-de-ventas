import { configureStore } from '@reduxjs/toolkit';
import { authSlice, uISlice, updateRecordSlice } from './';


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        uI: uISlice.reducer,
        updateRecord: updateRecordSlice.reducer,
    }
});
