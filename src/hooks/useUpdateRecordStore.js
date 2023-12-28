import { useSelector, useDispatch } from 'react-redux';
import { selectRecord, clearRecord, clearError, setError, setIsUpdating, clearIsUpdating, onSetUpdatedRecord, onClearUpdatedRecord } from '../store/records/updateRecordSlice';
import { api } from '../api/api';


export const useUpdateRecordStore = () => {
    const { selectedRecord, updatedRecord, error, isUpdating, } = useSelector(state => state.updateRecord);
    const dispatch = useDispatch();

    const startSelectingRecord = (record = null) => {
        if (record === null || Object.keys(record).length === 0) return;

        dispatch(selectRecord(record));
    }

    const startCleaningRecord = () => {
        dispatch(clearRecord());
    }

    const startUpdatingRecord = async (url = null, payload = null) => {
        if (url === null || typeof url !== 'string' || payload === null || Object.keys(payload).length === 0) return;
        dispatch(setIsUpdating());

        try {
            const { data } = await api.put(url, payload);

            dispatch(onSetUpdatedRecord(data));

        } catch (error) {
            dispatch(setError(err.response.data.message));
            
            setTimeout(() => {
                dispatch(clearError())
            }, 4000);
        }
        finally {
            dispatch(clearIsUpdating());
        }
    }

    const startCleaningUpdatedRecord = () => {
        dispatch(onClearUpdatedRecord());
    }

    return {
        // ?? Properties
        selectedRecord,
        updatedRecord,
        error,
        isUpdating,
        // ?? Methods
        startSelectingRecord,
        startCleaningRecord,
        startUpdatingRecord,
        startCleaningUpdatedRecord,
    }
}
