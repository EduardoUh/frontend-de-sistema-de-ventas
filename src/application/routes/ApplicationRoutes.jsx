import { Routes, Route, Navigate } from 'react-router-dom';
import { useModules } from '../../hooks/index';
import { Home } from '../pages';
import { NavBar, Header } from '../ui';


export const ApplicationRoutes = () => {
    const { modulesCollection, modulesComponentsCollection } = useModules();

    return (
        <div className="h-screen">
            <Header />
            <main className="border-2 border-red-500 h-[calc(100vh-64px)] flex space-x-1">
                <NavBar />
                // TODO: create a layout to render the modules, set the layout a width based in the nav min width (13rem)
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="*" element={<Navigate to="/home" />} />
                    {
                        modulesComponentsCollection.map((Component, index) => (
                            < Route key={modulesCollection[index].nombre} path={modulesCollection[index].ruta} element={< Component />} />
                        ))
                    }
                </Routes>
            </main>
        </div>
    )
}
