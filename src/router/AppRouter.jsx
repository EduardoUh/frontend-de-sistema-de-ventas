import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuthStore } from '../hooks';
import { AuthRoutes } from '../auth';
import { ApplicationRoutes } from '../application';
import { LoadingPage } from '../utilities';


export const AppRouter = () => {
    const { status, checkAuthToken } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, []);

    if (status === 'checking') return <LoadingPage />

    return (
        <Routes>
            {
                status === 'authenticated' &&
                (
                    <>
                        <Route path='/*' element={<ApplicationRoutes />} />
                    </>
                )
            }
            {
                status === 'not-authenticated' && !sessionStorage.getItem('token') &&
                (
                    <>
                        <Route path='/*' element={<AuthRoutes />} />
                    </>
                )
            }
            {
                status === 'not-authenticated' && sessionStorage.getItem('token') &&
                (
                    <>
                        <Route path='/*' element={<LoadingPage />} />
                    </>
                )
            }

        </Routes>
    )
}
