import { createSlice } from '@reduxjs/toolkit';


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated',
        user: {},
        errorMessage: null,
        errors: {
            hasErrors: false,
            errors: null
        },
        isLoading: false,
        successMessage: null
    },
    reducers: {
        onChecking: (state) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage = null;
        },
        onLogin: (state, { payload }) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = null;
        },
        onLogout: (state, { payload }) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.errorMessage = payload;
        },
        onSetErrorMessage: (state, { payload }) => {
            state.errorMessage = payload;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = null;
        },
        onSetErrors: (state, { payload }) => {
            state.errors.hasErrors = true;
            state.errors.errors = payload;
        },
        onClearErrors: (state) => {
            state.errors.hasErrors = false;
            state.errors.errors = null;
        },
        onSetIsLoading: (state) => {
            state.isLoading = true;
        },
        onClearIsLoading: (state) => {
            state.isLoading = false;
        },
        onSetUpdatedUserInfo: (state, { payload }) => {
            state.user = payload.usuario;
            state.successMessage = payload.message;
            state.errorMessage = null;
            state.errors.hasErrors = false;
            state.errors.errors = null;
            state.isLoading = false;
        },
        onClearSuccessMessage: (state) => {
            state.successMessage = null;
        }
    }
});

export const { onChecking, onLogin, onLogout, onSetErrorMessage, clearErrorMessage, onSetErrors, onClearErrors, onSetIsLoading, onClearIsLoading, onSetUpdatedUserInfo, onClearSuccessMessage } = authSlice.actions;
