import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    payload: {
        sucursal: '',
        cliente: '',
        articulos: [],
        total: 0,
        pagoCon: 0,
        pago: 0,
        cambio: 0,
        saldo: 0
    },
    isLoading: false,
    errors: {
        hasErrors: false,
        messages: null
    },
    error: {
        hasError: false,
        message: null
    },
    successMessage: null
}

export const createSellingSlice = createSlice({
    name: 'createSelling',
    initialState,
    reducers: {
        onAddProduct: (state, { payload }) => {
            state.payload.articulos.push(payload);
        },
        onSetIsLoading: (state) => {
            state.isLoading = true;
        },
        onClearIsLoading: (state) => {
            state.isLoading = false;
        },
        onSetErrors: (state, { payload }) => {
            state.errors.hasErrors = true;
            state.errors.messages = payload;
        },
        onClearErrors: (state) => {
            state.errors.hasErrors = false;
            state.errors.messages = null;
        },
        onSetError: (state, { payload }) => {
            state.error.hasError = true;
            state.error.message = payload;
        },
        onClearError: (state) => {
            state.error.hasError = false;
            state.error.message = null;
        },
        onSetSuccessMessage: (state, { payload }) => {
            state.successMessage = payload;
        },
        onClearSuccessMessage: (state) => {
            state.successMessage = null;
        }
    }
});

export const { onAddProduct, onSetIsLoading, onClearIsLoading, onSetErrors, onClearErrors, onSetError, onClearError, onSetSuccessMessage, onClearSuccessMessage } = createSellingSlice.actions;