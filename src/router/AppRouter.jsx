import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '../hooks';
import { AuthPage } from '../auth';
import { Application } from '../application';


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
                            <Route path="/" element={<Application />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </>
                    )
                    :
                    (
                        <>
                            <Route path="/auth/*" element={<AuthPage />} />
                            <Route path="/*" element={<Navigate to="/auth/login" />} />
                        </>
                    )
            }
        </Routes>
    )
}
