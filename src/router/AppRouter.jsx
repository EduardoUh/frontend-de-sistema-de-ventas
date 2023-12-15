import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '../hooks';
import { AuthRoutes } from '../auth';
import { ApplicationRoutes } from '../application';


export const AppRouter = () => {
    const { status, checkAuthToken } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, []);

    return (
        <Routes>
            {
                status === 'authenticated'
                    ? (
                        <>
                            <Route path="/" element={<ApplicationRoutes />} />
                            <Route path="/*" element={<Navigate to="/" />} />
                        </>
                    )
                    :
                    (
                        <>
                            <Route path="/*" element={<AuthRoutes />} />
                        </>
                    )
            }
        </Routes>
    )
}
