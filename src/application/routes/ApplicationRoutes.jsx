import { Routes, Route, Navigate } from 'react-router-dom';
import { useModules, useUIStore } from '../../hooks/index';
import { Home } from '../pages';
import { NavBar, Header } from '../ui';


export const ApplicationRoutes = () => {
    const { modulesCollection, modulesComponentsCollection } = useModules();
    const { showNavbar } = useUIStore();

    return (
        <>
            <Header />
            <main className="w-full border-2 border-red-500 h-[calc(100vh-64px)] flex">
                <NavBar />
                <section className={`${showNavbar ? "w-6/12 sm:w-10/12" : "w-full"} border-2 border-black p-2 overflow-auto`}>
                    <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route path="*" element={<Navigate to="/sucursales" />} /> {/* //TODO: change the default route */}
                        {
                            modulesComponentsCollection.map((Component, index) => (
                                < Route key={modulesCollection[index]?.nombre} path={modulesCollection[index]?.ruta} element={<Component permissions={modulesCollection[index]?.permisos} />} />
                            ))
                        }
                    </Routes>
                </section>
            </main>
        </>
    )
}
