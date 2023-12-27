import { useState, useEffect } from 'react';
import { useRequest } from './useRequest';


export const usePagination = (baseUrl) => {
    const [page, setPage] = useState(1);
    const [url, setUrl] = useState(`${baseUrl.trim()}?page=${page}`);
    const { requestData, data, error } = useRequest();

    useEffect(() => {
        requestData(url);
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
            newUrl += `${key}=${filters[key]}&`;
        }

        setUrl(emptyFilters === Object.keys(filters).length ?`${newUrl}page=${page}` : `${newUrl}page=1`);
        setPage(current => emptyFilters === Object.keys(filters).length ? current : 1);
    }

    return {
        // ?? properties
        data,
        error,
        page,
        // ?? methods
        nextPage,
        previousPage,
        addFiltersToUrl,
    }
} 