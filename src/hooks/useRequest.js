import { useState } from 'react';
import { api } from '../api/api';


const errorInitialForm = {
    hasError: false,
    errorMessage: null
}

export const useRequest = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(errorInitialForm);

    const requestData = async (url) => {
        try {
            error.hasError && setError(errorInitialForm);
            setIsLoading(true);
            const { data } = await api.get(url);
            setData(data);

        }
        catch (error) {
            setError({ hasError: true, errorMessage: error.response.data.message });
            setData(null);

        }
        finally {
            setIsLoading(false);
        }
    }

    return {
        // ?? Properties
        data,
        isLoading,
        error,
        // ?? Methods
        requestData
    }
}