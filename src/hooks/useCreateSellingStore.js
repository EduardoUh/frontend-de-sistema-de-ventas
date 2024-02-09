import { useSelector, useDispatch } from 'react-redux';
import {
    onClearSellingState,
    onAddProduct, onRemoveProduct, onClearPayloadExceptBranchAndClient, onUpdateProductAmount,
    onSetTotal, onSetPagoCon, onSetPago, onSetCambio, onSetSaldo,
    onSetBranch, onSetClient,
    onSetIsLoading, onClearIsLoading,
    onSetErrors, onClearErrors,
    onSetError, onClearError,
    onSetSuccessMessage, onClearSuccessMessage,
} from '../store/records/createSellingSlice';
import { api } from '../api/api';


export const useCreateSellingStore = () => {
    const { payload, isLoading, errors, error, successMessage } = useSelector(state => state.createSelling);
    const dispatch = useDispatch();

    const startClearSellingState = () => {
        dispatch(onClearSellingState());
    }

    const startSettingBranch = (branch) => {
        dispatch(onSetBranch(branch));
    }

    const startSettingClient = (client) => {
        dispatch(onSetClient(client));
    }

    const startAddingProduct = (producto) => {
        dispatch(onAddProduct(producto));
    }

    const startRemovingProduct = (id) => {
        dispatch(onRemoveProduct(id));
    }

    const startClearPayloadExceptBranchAndClient = () => {
        dispatch(onClearPayloadExceptBranchAndClient());
    }

    const startUpdatingProductAmount = (product) => {
        dispatch(onUpdateProductAmount(product));
    }

    const startSettingTotal = (total) => {
        dispatch(onSetTotal(total));
    }

    const startSettingPagoCon = (pagoCon) => {
        dispatch(onSetPagoCon(pagoCon));
    }

    const startSettingPago = (pago) => {
        dispatch(onSetPago(pago));
    }

    const startSettingCambio = (cambio) => {
        dispatch(onSetCambio(cambio));
    }

    const startSettingSaldo = (saldo) => {
        dispatch(onSetSaldo(saldo));
    }

    const startSettingError = (errorMessage) => {
        dispatch(onSetError(errorMessage));
    }

    const startClearError = () => {
        dispatch(onClearError());
    }

    return {
        // ?? Properties
        ...payload,
        payload,
        isLoading,
        errors,
        error,
        successMessage,
        // ?? Methods
        startClearSellingState,
        startSettingBranch,
        startSettingClient,
        startAddingProduct,
        startRemovingProduct,
        startClearPayloadExceptBranchAndClient,
        startUpdatingProductAmount,
        startSettingTotal,
        startSettingPagoCon,
        startSettingPago,
        startSettingCambio,
        startSettingSaldo,
        startSettingError,
        startClearError,
    }
}
