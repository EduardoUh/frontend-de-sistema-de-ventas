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
        onRemoveProduct: (state, { payload }) => {
            state.payload.articulos = state.payload.articulos.filter(item => item.product === payload);
        },
        onClearPayloadExceptBranchAndClient: (state) => {
            state.payload.articulos = [];
            state.payload.total = 0;
            state.payload.pagoCon = 0;
            state.payload.pago = 0;
            state.payload.cambio = 0;
            state.payload.saldo = 0;
        },
        onSetBranch: (state, { payload }) => {
            state.payload.sucursal = payload;
        },
        onSetClient: (state, { payload }) => {
            state.payload.cliente = payload;
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

export const { onAddProduct, onRemoveProduct, onClearPayloadExceptBranchAndClient, onSetBranch, onSetClient, onSetIsLoading, onClearIsLoading, onSetErrors, onClearErrors, onSetError, onClearError, onSetSuccessMessage, onClearSuccessMessage } = createSellingSlice.actions;