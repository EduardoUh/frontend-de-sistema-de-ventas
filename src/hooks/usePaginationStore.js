import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { onSetRecords, onClearRecords, selectRecord, clearRecord, clearError, setError, setErrors, clearErrors, setIsLoading, clearIsLoading, onSetUpdatedRecord, setSuccessMessage, clearSuccessMessage } from '../store/records/paginationSlice';
import { api } from '../api/api';


export const usePaginationStore = (baseUrl = '', keyToGetCollectionOfData = '') => {
    // ?? Local State
    const [page, setPage] = useState(1);
    const [url, setUrl] = useState(`${baseUrl.trim()}?page=${page}`);
    // ?? Store State
    const { records, selectedRecord, sucessMessage, error, errors,isLoading, pagesCanBeGenerated } = useSelector(state => state.pagination);
    const dispatch = useDispatch();

    useEffect(() => {
        startSettingRecords(url);
    }, [url]);

    useEffect(() => {
        setUrl(current => `${current.split('page=')[0]}page=${page}`);
    }, [page]);

    const nextPage = () => {
        if (!data || page === data.pagesCanBeGenerated) return;

        setPage(current => current + 1);
    }

    const previousPage = () => {
        if (!data || page === 1) return;

        setPage(current => current - 1);
    }

    const addFiltersToUrl = (baseUrl = '', filters = {}) => {
        let emptyFilters = 0;

        if (typeof baseUrl !== 'string' || typeof filters !== 'object' || Array.isArray(filters) || Object.keys(filters).length < 1) return;

        if (baseUrl.lastIndexOf('?') === -1) baseUrl += '?';

        let newUrl = baseUrl;

        for (const key in filters) {
            if (filters[key].trim().length === 0) {
                emptyFilters += 1;
                continue;
            }
            newUrl += `${key}=${encodeURIComponent(filters[key].trim())}&`;
        }

        setUrl(emptyFilters === Object.keys(filters).length ? `${newUrl}page=${page}` : `${newUrl}page=1`);

        setPage(current => emptyFilters === Object.keys(filters).length ? current : 1);
    }

    // ?? Using store
    const startSettingRecords = async (url) => {
        try {
            dispatch(clearError());
            dispatch(setIsLoading());

            const { data } = await api.get(url);

            dispatch(onSetRecords({ records: data[keyToGetCollectionOfData], pagesCanBeGenerated: data.pagesCanBeGenerated }));

        } catch (error) {
            dispatch(onClearRecords());

            dispatch(setError(error.response.data.message));

        }
        finally {
            dispatch(clearIsLoading());
        }
    }

    const startSelectingRecord = (record = null) => {
        if (record === null || Object.keys(record).length === 0) return;

        dispatch(selectRecord(record));
    }

    const startCleaningRecord = () => {
        dispatch(clearRecord());
    }

    const startUpdatingRecord = async (url = null, payload = null, keyToGetData = '') => {
        if (url === null || typeof url !== 'string' || payload === null || Object.keys(payload).length === 0) return;
        dispatch(clearError());
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
                dispatch(setErrors({...error.response.data.errors}));
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
        // ?? Properties
        records,
        selectedRecord,
        sucessMessage,
        error,
        errors,
        isLoading,
        page,
        pagesCanBeGenerated,
        // ?? Methods
        nextPage,
        previousPage,
        addFiltersToUrl,
        startSelectingRecord,
        startCleaningRecord,
        startUpdatingRecord,
    }
}
