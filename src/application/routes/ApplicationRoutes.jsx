import { Routes, Route, Navigate } from 'react-router-dom';
import { useModules, useUIStore } from '../../hooks/index';
import { Home } from '../pages';
import { NavBar, Header } from '../ui';


export const ApplicationRoutes = () => {
    const { modulesCollection, modulesComponentsCollection } = useModules();
    const { showNavbar } = useUIStore();

    return (
        <div className="h-screen">
            <Header />
            <main className="w-full border-2 border-red-500 h-[calc(100vh-64px)] flex">
                <NavBar />
                <div className={`${showNavbar ? "w-6/12 sm:w-10/12 ml-1" : "w-full"} overflow-auto`}>
                    <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route path="*" element={<Navigate to="/home" />} />
                        {
                            modulesComponentsCollection.map((Component, index) => (
                                < Route key={modulesCollection[index].nombre} path={modulesCollection[index].ruta} element={< Component />} />
                            ))
                        }
                    </Routes>
                </div>
            </main>
        </div>
    )
}
