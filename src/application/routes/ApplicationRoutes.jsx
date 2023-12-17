import { Routes, Route, Navigate } from 'react-router-dom';
import { Application } from '../pages';


export const ApplicationRoutes = () => {
    return (
        <Routes>
            <Route path="/home" element={<Application />} />
            <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
    )
}
