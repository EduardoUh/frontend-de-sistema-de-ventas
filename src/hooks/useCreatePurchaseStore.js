import { useSelector, useDispatch } from 'react-redux';
import {
    onSetBranch,
    onSetProvider,
    onClearPayloadExceptBranchAndProvider,
    onAddProduct,
} from '../store/records/createPurchaseSlice';


export const useCreatePurchaseStore = () => {
    const { payload, isLoading, errors, error, successMessage } = useSelector(state => state.createPurchase);
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

    const startAddingProduct = (product) => {
        dispatch(onAddProduct(product));
    }

    return {
        // ? Properties
        payload,
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
        startAddingProduct,
    }
}
