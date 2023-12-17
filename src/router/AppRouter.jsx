import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuthStore } from '../hooks';
import { AuthRoutes } from '../auth';
import { ApplicationRoutes } from '../application';


export const AppRouter = () => {
    const { status, checkAuthToken } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, []);

    // TODO: create a component to be rendered when the status is "checking", also midify the checkAuthToken function to change the status to checking so the component work properly

    return (
        <Routes>
            {
                status === 'authenticated'
                    ? (
                        <>
                            <Route path="/*" element={<ApplicationRoutes />} />
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
