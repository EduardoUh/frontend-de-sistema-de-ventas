import { useEffect, useState } from 'react';
import { api } from '../api/api';


const errorInitialForm = {
    hasError: false,
    errorMessage: null
}

export const useRequest = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(errorInitialForm);

    const requestData = async (url) => {
        try {
            const { data } = await api.get(url);
            setData(data);
            setError(errorInitialForm);

        }
        catch (error) {
            setError({ hasError: true, errorMessage: error.response.data.message });
            setData(null);
        }
    }

    return {
        // ?? Properties
        data,
        error,
        // ?? Methods
        requestData
    }
}