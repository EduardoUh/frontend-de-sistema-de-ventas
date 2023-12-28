import { createSlice } from '@reduxjs/toolkit';


export const updateRecordSlice = createSlice({
    name: 'updateRecord',
    initialState: {
        selectedRecord: null,
        updatedRecord: null,
        error: null,
        isUpdating: false,
    },
    reducers: {
        selectRecord: (state, { payload }) => {
            state.selectedRecord = payload;
        },
        clearRecord: (state) => {
            state.selectedRecord = null;
        },
        setError: (state, { payload }) => {
            state.error = payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        setIsUpdating: (state) => {
            state.isUpdating = true;
        },
        clearIsUpdating: (state) => {
            state.isUpdating = false;
        },
        onSetUpdatedRecord: (state, { payload }) => {
            state.updatedRecord = payload;
        },
        onClearUpdatedRecord: (state) => {
            state.updatedRecord = null;
        },
    }
});

export const { selectRecord, clearRecord, setIsUpdating, clearIsUpdating, onSetUpdatedRecord, onClearUpdatedRecord, setError, clearError } = updateRecordSlice.actions;