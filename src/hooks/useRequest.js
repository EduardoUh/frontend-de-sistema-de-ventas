import { useState } from 'react';
import { api } from '../api/api';


export const useRequest = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const requestData = async (url) => {
        try {
            const { data } = await api.get(url);
            setData(data);

        }
        catch (error) {
            setError(error.response.data.message);
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