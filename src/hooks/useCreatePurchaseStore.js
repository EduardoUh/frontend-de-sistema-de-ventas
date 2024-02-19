import { useSelector, useDispatch } from 'react-redux';
import {
    onSetBranch,
    onSetProvider,
    onClearPayloadExceptBranchAndProvider,
    onSetSelectedProduct,
    onClearSelectedProduct,
    onAddProduct,
    onSetSuccessMessage, onClearSuccessMessage,
    onSetError, onClearError
} from '../store/records/createPurchaseSlice';


export const useCreatePurchaseStore = () => {
    const { payload, selectedProduct, isLoading, errors, error, successMessage } = useSelector(state => state.createPurchase);
    const dispatch = useDispatch();

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
        startSettingBranch,
        startSettingProvider,
        startClearPayloadExceptBranchAndProvider,
        startSettingSelectedProduct,
        startRemovingSelectedProduct,
        startAddingProduct,
        startSettingSuccessMessage,
        startRemovingSuccessMessage,
        startSettingErrorMessage,
        startRemovingErrorMessage,
    }
}
