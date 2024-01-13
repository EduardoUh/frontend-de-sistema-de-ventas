import { Routes, Route, Navigate } from 'react-router-dom';
import { useModules, useUIStore } from '../../hooks/index';
import { Home } from '../pages';
import { NavBar, Header } from '../ui';
import { NotFound } from '../../utilities/NotFound';


export const ApplicationRoutes = () => {
    const { modulesCollection, modulesComponentsCollection } = useModules();
    const { showNavbar } = useUIStore();

    return (
        <>
            <Header />
            <main className="w-full h-[calc(100vh-64px)] flex">
                <NavBar />
                {/* w-6/12 */}
                <section className={`${showNavbar ? "hidden sm:block sm:w-9/12 md:w-10/12" : "w-full"} p-2 overflow-auto`}>
                    <Routes >
                        <Route path="/auth/login" element={<Navigate to="/inicio" />} />
                        <Route path="/" element={<Navigate to="/inicio" />} />
                        <Route path="/inicio" element={<Home />} />
                        {
                            modulesComponentsCollection.map((Component, index) => (
                                <Route key={modulesCollection[index]?.nombre} path={modulesCollection[index]?.ruta} element={<Component permissions={modulesCollection[index]?.permisos} name={modulesCollection[index]?.nombre} />} />
                            ))
                        }
                        <Route path="/*" element={<NotFound />} />
                    </Routes>
                </section>
            </main >
        </>
    )
}
