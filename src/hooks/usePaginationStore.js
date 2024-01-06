import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPage, setUrl, setKeyToGetCollectionOfData, onSetRecords, onClearRecords, selectRecord, clearRecord, clearError, setError, setErrors, clearErrors, setIsLoading, clearIsLoading, setIsFilteringBySameFilters, clearIsFilteringBySameFilters, onSetUpdatedRecord, setSuccessMessage, clearSuccessMessage } from '../store/records/paginationSlice';
import { api } from '../api/api';


export const usePaginationStoreHooks = () => {
    const { url, keyToGetCollectionOfData, isFilteringBySameFilters, page, startSettingRecords } = usePaginationStore();
    const dispatch = useDispatch();

    useEffect(() => {
        if (url && keyToGetCollectionOfData) startSettingRecords(url);
    }, [url]);

    useEffect(() => {
        if (isFilteringBySameFilters) startSettingRecords(url);
    }, [isFilteringBySameFilters]);

    useEffect(() => {
        if (url) {
            dispatch(setUrl(`${url.split('page=')[0]}page=${page}`));
        }
    }, [page]);
}

export const usePaginationStore = () => {
    // ?? Store State
    const { page, url, keyToGetCollectionOfData, records, selectedRecord, sucessMessage, error, errors, isLoading, isFilteringBySameFilters, pagesCanBeGenerated } = useSelector(state => state.pagination);
    const dispatch = useDispatch();

    const setBaseUrl = baseUrl => {
        dispatch(setUrl(`${baseUrl.trim()}?page=${page}`));
    }

    const setTheKeyToGetCollectionOfData = (key = '') => {
        dispatch(setKeyToGetCollectionOfData(key));
    }

    const nextPage = () => {
        if (page === pagesCanBeGenerated) return;

        dispatch(setPage(page + 1));
    }

    const previousPage = () => {
        if (page === 1) return;

        dispatch(setPage(page - 1));
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

        if (url.split('page=')[0] !== newUrl) {
            dispatch(setUrl(emptyFilters === Object.keys(filters).length ? `${newUrl}page=${page}` : `${newUrl}page=1`));

            dispatch(setPage(emptyFilters === Object.keys(filters).length ? page : 1));
        }
        else {
            dispatch(setIsFilteringBySameFilters(true));

            setTimeout(() => {
                dispatch(clearIsFilteringBySameFilters(false));
            }, 500);
        }
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
        // ?? Properties
        url,
        keyToGetCollectionOfData,
        records,
        selectedRecord,
        sucessMessage,
        error,
        errors,
        isLoading,
        isFilteringBySameFilters,
        page,
        pagesCanBeGenerated,
        // ?? Methods
        setBaseUrl,
        setTheKeyToGetCollectionOfData,
        nextPage,
        previousPage,
        addFiltersToUrl,
        startSettingRecords,
        startSelectingRecord,
        startCleaningRecord,
        startUpdatingRecord,
    }
}
