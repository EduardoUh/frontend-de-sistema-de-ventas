import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../pages';


export const AuthRoutes = () => {
    return (
        <Routes>
            <Route path='/auth/login' element={<Login />} />
            <Route path="/auth/*" element={<Navigate to='/login' />} />
            <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>
    )
}
