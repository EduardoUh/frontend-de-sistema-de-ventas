import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../pages';
import { NavBar, Header } from '../ui';


export const ApplicationRoutes = () => {
    return (
        <div className="h-screen">
            <Header />
            <main className="border-2 border-red-500 h-[calc(100vh-64px)] flex space-x-1">
                <NavBar />
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="*" element={<Navigate to="/home" />} />
                </Routes>
            </main>
        </div>
    )
}
