import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPage, setUrl, setKeyToGetCollectionOfData, onSetRecords, onClearRecords, clearError, setError, setIsLoading, clearIsLoading, setIsFilteringBySameFilters, clearIsFilteringBySameFilters, } from '../store/records/recordsSlice';
import { api } from '../api/api';


export const useRecordsStorePaginationHooks = () => {
    const { url, keyToGetCollectionOfData, isFilteringBySameFilters, page, startSettingRecords } = useRecordsStorePagination();
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

export const useRecordsStorePagination = () => {
    // ?? Store State
    const { page, url, keyToGetCollectionOfData, records, sucessMessage, error, errors, isLoading, isFilteringBySameFilters, pagesCanBeGenerated } = useSelector(state => state.records);
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

    return {
        // ?? Properties
        url,
        keyToGetCollectionOfData,
        records,
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
    }
}
