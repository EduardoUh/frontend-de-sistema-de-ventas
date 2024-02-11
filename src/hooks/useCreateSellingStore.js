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

    const startCreatingSelling = async (payload) => {
        dispatch(onSetIsLoading());

        try {
            const { data } = await api.post('/ventas', payload);

            dispatch(onSetSuccessMessage(data.message));

            dispatch(onSetClient(''));
            dispatch(onClearPayloadExceptBranchAndClient());

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
        startCreatingSelling,
    }
}
