import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    payload: {
        sucursal: '',
        proveedor: '',
        articulos: [],
        total: 0
    },
    selectedProduct: null,
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

export const createPurchaseSlice = createSlice({
    name: 'createPurchase',
    initialState,
    reducers: {
        onClearPurchaseState: (state) => {
            state.payload = {
                sucursal: '',
                proveedor: '',
                articulos: [],
                total: 0
            };
            state.isLoading = false;
            state.errors = {
                hasErrors: false,
                messages: null
            };
            state.error = {
                hasError: false,
                message: null
            };
            state.successMessage = null;
        },
        onSetBranch: (state, { payload }) => {
            state.payload.sucursal = payload;
        },
        onSetProvider: (state, { payload }) => {
            state.payload.proveedor = payload;
        },
        onSetSelectedProduct: (state, { payload }) => {
            state.selectedProduct = payload;
        },
        onClearSelectedProduct: (state) => {
            state.selectedProduct = null;
        },
        onAddProduct: (state, { payload }) => {
            state.payload.articulos.push(payload);
        },
        onRemoveProduct: (state, { payload }) => {
            state.payload.articulos = state.payload.articulos.filter(item => item.producto !== payload);
        },
        onClearPayloadExceptBranchAndProvider: (state) => {
            state.payload.articulos = [];
            state.payload.total = 0;
        },
        onUpdateProduct: (state, { payload }) => {
            state.payload.articulos = state.payload.articulos.map(item => item.producto === payload.producto ? payload : item);
        },
        onSetTotal: (state, { payload }) => {
            state.payload.total = payload;
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

export const {
    onClearPurchaseState, onSetBranch, onSetProvider, onSetSelectedProduct, onClearSelectedProduct,
    onAddProduct, onRemoveProduct, onClearPayloadExceptBranchAndProvider,
    onUpdateProduct,
    onSetTotal,
    onSetIsLoading, onClearIsLoading,
    onSetErrors, onClearErrors,
    onSetError, onClearError,
    onSetSuccessMessage, onClearSuccessMessage,
} = createPurchaseSlice.actions;
