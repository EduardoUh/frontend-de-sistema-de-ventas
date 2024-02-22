import { useState } from 'react';
import { api } from '../api/api';


const errorInitialForm = {
    hasError: false,
    errorMessage: null
}

const errorsInitialForm = {
    hasErrors: false,
    errorMessages: null
}

export const useRequest = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(errorInitialForm);
    const [errors, setErrors] = useState(errorsInitialForm);

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

    const postData = async (url, payload) => {
        try {
            error.hasError && setError(errorInitialForm);
            errors.hasErrors && setErrors(errorsInitialForm);
            setIsLoading(true);
            const { data } = await api.post(url, payload);
            setData(data);

        } catch (error) {
            if (error.response.data.message) setError({ hasError: true, errorMessage: error.response.data.message });

            if (error.response.data.errors) setErrors({ hasErrors: true, errorMessages: error.response.data.errors });

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
        errors,
        // ?? Methods
        requestData,
        postData,
    }
}