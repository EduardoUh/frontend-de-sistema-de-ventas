import { createSlice } from '@reduxjs/toolkit';


const initialStateForm = {
    records: null,
    pagesCanBeGenerated: null,
    selectedRecord: null,
    updatedRecord: null,
    sucessMessage: null,
    error: {
        hasError: false,
        errorMessage: null
    },
    isLoading: false,
}

export const paginationSlice = createSlice({
    name: 'pagination',
    initialState: initialStateForm,
    reducers: {
        onSetRecords: (state, { payload }) => {
            state.records = payload.records;
            state.pagesCanBeGenerated = payload.pagesCanBeGenerated;
        },
        onClearRecords: (state) => {
            state.records = null;
            state.pagesCanBeGenerated = null;
        },
        selectRecord: (state, { payload }) => {
            state.selectedRecord = payload;
        },
        clearRecord: (state) => {
            state.selectedRecord = null;
        },
        setIsLoading: (state) => {
            state.isLoading = true;
        },
        clearIsLoading: (state) => {
            state.isLoading = false;
        },
        setError: (state, { payload }) => {
            state.error.hasError = true;
            state.error.errorMessage = payload;
        },
        clearError: (state) => {
            state.error.hasError = false;
            state.error.errorMessage = null;
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

export const { onSetRecords, onClearRecords, selectRecord, clearRecord, setIsLoading, clearIsLoading, onSetUpdatedRecord, onClearUpdatedRecord, setError, clearError, setSuccessMessage, clearSuccessMessage } = paginationSlice.actions;