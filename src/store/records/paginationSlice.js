import { createSlice } from '@reduxjs/toolkit';


const initialStateForm = {
    page: 1,
    url: null,
    keyToGetCollectionOfData: null,
    records: null,
    pagesCanBeGenerated: null,
    selectedRecord: null,
    sucessMessage: null,
    error: {
        hasError: false,
        errorMessage: null
    },
    errors: {
        hasErrors: false,
        errors: null,
    },
    isLoading: false,
}

export const paginationSlice = createSlice({
    name: 'pagination',
    initialState: initialStateForm,
    reducers: {
        setPage: (state, { payload }) => {
            state.page = payload;
        },
        setUrl: (state, { payload }) => {
            state.url = payload;
        },
        setKeyToGetCollectionOfData: (state, { payload }) => {
            state.keyToGetCollectionOfData = payload;
        },
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
        setErrors: (state, { payload }) => {
            state.errors.hasErrors = true;
            state.errors.errors = payload;
        },
        clearErrors: (state) => {
            state.errors.hasErrors = false;
            state.errors.errors = null;
        },
        onSetUpdatedRecord: (state, { payload }) => {
            state.records = state.records.map(record => record.id === payload.id ? payload : record);
        },
        setSuccessMessage: (state, { payload }) => {
            state.sucessMessage = payload;
        },
        clearSuccessMessage: (state) => {
            state.sucessMessage = null;
        }
    }
});

export const { setPage, setUrl, setKeyToGetCollectionOfData, onSetRecords, onClearRecords, selectRecord, clearRecord, setIsLoading, clearIsLoading, onSetUpdatedRecord, setError, clearError, setErrors, clearErrors, setSuccessMessage, clearSuccessMessage } = paginationSlice.actions;