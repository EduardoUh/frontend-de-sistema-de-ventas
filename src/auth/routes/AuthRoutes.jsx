import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../pages';


export const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="/auth/*" element={<Login />} />
            <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>
    )
}
