import { useDispatch, useSelector } from 'react-redux';
import { selectRecord, clearRecord, setError, clearError, setErrors, clearErrors, setIsLoading, clearIsLoading, onSetUpdatedRecord, setSuccessMessage, clearSuccessMessage } from '../store/records/recordsSlice';
import { api } from '../api/api';


export const useRecordsStoreUpdate = () => {
    const { selectedRecord, errors, error, sucessMessage, isLoading, } = useSelector(state => state.records);
    const dispatch = useDispatch();

    const startSelectingRecord = (record = null) => {
        if (record === null || Object.keys(record).length === 0) return;

        dispatch(selectRecord(record));
        dispatch(clearErrors());
        dispatch(clearError());
        dispatch(clearSuccessMessage());
    }

    const startCleaningRecord = () => {
        dispatch(clearRecord());
    }

    const startUpdatingRecord = async (url = null, payload = null, keyToGetData = '') => {
        if (url === null || typeof url !== 'string' || payload === null || Object.keys(payload).length === 0) return;
        dispatch(clearErrors());
        dispatch(clearError());
        dispatch(clearSuccessMessage());
        dispatch(setIsLoading());

        try {
            const { data } = await api.put(`${url}/${selectedRecord.id}`, payload);

            dispatch(onSetUpdatedRecord(data[keyToGetData]));

            dispatch(setSuccessMessage(data.message));

            setTimeout(() => {
                dispatch(clearSuccessMessage());
            }, 10000);

        } catch (error) {
            if (error.response.data.message) {
                dispatch(setError(error.response.data.message));
            }

            if (error.response.data.errors) {
                dispatch(setErrors({ ...error.response.data.errors }));
            }

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
        selectedRecord,
        errors,
        error,
        sucessMessage,
        isLoading,
        // ? Methods
        startSelectingRecord,
        startCleaningRecord,
        startUpdatingRecord,
    }
}
