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
        setUrl(`${baseUrl.trim()}?page=${page}`);
    }, [page]);

    const nextPage = () => {
        if (!data || page === data.pagesCanBeGenerated) return;

        setPage(current => current + 1);
    }

    const previousPage = () => {
        if (!data || page === 1) return;

        setPage(current => current - 1);
    }

    const addFiltersToUrl = (url = '', filters = {}) => {

    }

    return {
        // ?? properties
        data,
        error,
        page,
        // ?? methods
        nextPage,
        previousPage,
    }
} 