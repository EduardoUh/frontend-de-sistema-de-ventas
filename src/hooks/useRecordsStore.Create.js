import { useSelector, useDispatch } from 'react-redux';
import {
    onSetCreatedRecord, setErrors, setError, clearErrors, clearError, setIsLoading, clearIsLoading,
    setSuccessMessage, clearSuccessMessage
} from '../store/records/recordsSlice';
import { api } from '../api/api';


export const useRecordsStoreCreate = () => {
    const { isLoading, errors, error, sucessMessage } = useSelector(state => state.records);
    const dispatch = useDispatch();

    const clearMessages = () => {
        dispatch(clearErrors());
        dispatch(clearError());
        dispatch(clearSuccessMessage());
    }

    const startCreatingRecord = async (url = null, payload = null, keyToGetData) => {
        if (!url || typeof url !== 'string' || Array.isArray(payload) || !Object.keys(payload).length === 0) return;
        clearMessages();
        dispatch(setIsLoading());

        try {
            const { data } = await api.post(url, payload);

            dispatch(onSetCreatedRecord(data[keyToGetData]));

            dispatch(setSuccessMessage(data.message));

            setTimeout(() => {
                dispatch(clearSuccessMessage());
            }, 4000);

        } catch (error) {
            if (error.response.data.message) dispatch(setError(error.response.data.message));

            if (error.response.data.errors) dispatch(setErrors(error.response.data.errors));

            setTimeout(() => {
                dispatch(clearError());
                dispatch(clearErrors());
            }, 4000);
        }
        finally {
            dispatch(clearIsLoading());
        }
    }

    return {
        // ? Properties
        isLoading,
        errors,
        error,
        sucessMessage,
        // ? Methods
        clearMessages,
        startCreatingRecord,
    }
}
