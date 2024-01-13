import { useAuthStore, useUIStore } from '../../../hooks';
import { ListItem } from './ListItem';


export const NavBar = () => {
    const { user } = useAuthStore();
    const { showNavbar } = useUIStore();

    return (
        <aside className={`w-full sm:w-3/12 md:w-2/12 bg-gradient-to-br from-cyan-500 via-blue-400 to-blue-500 font-bold text-white text-sm overflow-y-auto ${!showNavbar ? "animate-fade-out" : "animate-fade-in"}`}>
            <ul className="p-3 space-y-3">
                <ListItem route="/inicio" text="Inicio" />
                {
                    user.modulos.map(modulo =>
                    (
                        <ListItem key={modulo.nombre} route={modulo.ruta} text={modulo.nombre} />
                    )
                    )
                }
            </ul>
        </aside>
    )
}
