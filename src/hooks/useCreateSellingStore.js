import { useSelector, useDispatch } from 'react-redux';
import {
    onAddProduct, onSetBranch, onSetClient,
    onSetIsLoading, onClearIsLoading,
    onSetErrors, onClearErrors,
    onSetError, onClearError,
    onSetSuccessMessage, onClearSuccessMessage,
} from '../store/records/createSellingSlice';
import { api } from '../api/api';


export const useCreateSellingStore = () => {
    const { payload, isLoading, errors, error, successMessage } = useSelector(state => state.createSelling);
    const dispatch = useDispatch();

    const startSettingBranch = (branch) => {
        dispatch(onSetBranch(branch));
    }

    const startSettingClient = (client) => {
        dispatch(onSetClient(client));
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
        startSettingBranch,
        startSettingClient,
    }
}
