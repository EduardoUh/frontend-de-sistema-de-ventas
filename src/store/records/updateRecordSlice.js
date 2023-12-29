import { createSlice } from '@reduxjs/toolkit';


const initialStateForm = {
    selectedRecord: null,
    updatedRecord: null,
    sucessMessage: null,
    error: null,
    isUpdating: false,
}

export const updateRecordSlice = createSlice({
    name: 'updateRecord',
    initialState: initialStateForm,
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
        setSuccessMessage: (state, { payload }) => {
            state.sucessMessage = payload;
        },
        clearSuccessMessage: (state) => {
            state.sucessMessage = null;
        }
    }
});

export const { selectRecord, clearRecord, setIsUpdating, clearIsUpdating, onSetUpdatedRecord, onClearUpdatedRecord, setError, clearError, setSuccessMessage, clearSuccessMessage } = updateRecordSlice.actions;