import { configureStore } from '@reduxjs/toolkit';
import { authSlice, uISlice, recordsSlice, createSellingSlice, createPurchaseSlice } from './';


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        uI: uISlice.reducer,
        records: recordsSlice.reducer,
        createSelling: createSellingSlice.reducer,
        createPurchase: createSellingSlice.reducer,
    }
});
