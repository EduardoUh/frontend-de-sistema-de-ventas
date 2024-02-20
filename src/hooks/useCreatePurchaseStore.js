import { useSelector, useDispatch } from 'react-redux';
import {
    onClearPurchaseState,
    onSetBranch,
    onSetProvider,
    onClearPayloadExceptBranchAndProvider,
    onSetSelectedProduct,
    onClearSelectedProduct,
    onAddProduct, onRemoveProduct, onUpdateProduct,
    onSetTotal,
    onSetSuccessMessage, onClearSuccessMessage,
    onSetError, onClearError,
    onSetIsLoading, onClearIsLoading,
    onSetErrors, onClearErrors
} from '../store/records/createPurchaseSlice';
import { api } from '../api/api';


export const useCreatePurchaseStore = () => {
    const { payload, selectedProduct, isLoading, errors, error, successMessage } = useSelector(state => state.createPurchase);
    const dispatch = useDispatch();

    const startClearPurchaseState = () => {
        dispatch(onClearPurchaseState());
    }

    const startSettingBranch = (branchId) => {
        dispatch(onSetBranch(branchId));
    }

    const startSettingProvider = (providerId) => {
        dispatch(onSetProvider(providerId));
    }

    const startClearPayloadExceptBranchAndProvider = () => {
        dispatch(onClearPayloadExceptBranchAndProvider());
    }

    const startSettingSelectedProduct = (product) => {
        dispatch(onSetSelectedProduct(product));
    }

    const startRemovingSelectedProduct = () => {
        dispatch(onClearSelectedProduct());
    }

    const startAddingProduct = (product) => {
        dispatch(onAddProduct(product));
    }

    const startRemovingProduct = (id) => {
        dispatch(onRemoveProduct(id));
    }

    const startUpdatingProduct = (product) => {
        dispatch(onUpdateProduct(product));
    }

    const startSettingTotal = (total) => {
        dispatch(onSetTotal(total));
    }

    const startCreatingPurchase = async (payload) => {
        dispatch(onSetIsLoading());

        try {
            const { data } = await api.post('/compras', payload);

            dispatch(onSetSuccessMessage(data.message));

            dispatch(onSetProvider(''));

            dispatch(onClearPayloadExceptBranchAndProvider());

            setTimeout(() => {
                dispatch(onClearSuccessMessage());
            }, 4000);

        } catch (error) {
            if (error.response.data.message) {
                dispatch(onSetError(error.response.data.message));

                setTimeout(() => {
                    dispatch(onClearError());
                }, 4000);
            }

            if (error.response.data.errors) {
                dispatch(onSetErrors(error.response.data.errors));

                setTimeout(() => {
                    dispatch(onClearErrors());
                }, 4000);
            }
        }
        finally {
            dispatch(onClearIsLoading());
        }
    }

    const startSettingSuccessMessage = (message) => {
        dispatch(onSetSuccessMessage(message));
    }

    const startRemovingSuccessMessage = () => {
        dispatch(onClearSuccessMessage());
    }

    const startSettingErrorMessage = (message) => {
        dispatch(onSetError(message));
    }

    const startRemovingErrorMessage = () => {
        dispatch(onClearError());
    }

    return {
        // ? Properties
        payload,
        selectedProduct,
        isLoading,
        errors,
        error,
        successMessage,
        //...payload,
        sucursal: payload.sucursal,
        proveedor: payload.proveedor,
        articulos: payload.articulos,
        total: payload.total,
        // ? Methods
        startClearPurchaseState,
        startSettingBranch,
        startSettingProvider,
        startClearPayloadExceptBranchAndProvider,
        startSettingSelectedProduct,
        startRemovingSelectedProduct,
        startAddingProduct,
        startRemovingProduct,
        startUpdatingProduct,
        startSettingTotal,
        startCreatingPurchase,
        startSettingSuccessMessage,
        startRemovingSuccessMessage,
        startSettingErrorMessage,
        startRemovingErrorMessage,
    }
}
