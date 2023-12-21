import { useAuthStore, useUIStore } from '../../../hooks';
import { ListItem } from './ListItem';


export const NavBar = () => {
    const { user } = useAuthStore();
    const { showNavbar } = useUIStore();
    console.log(showNavbar);
    return (
        <aside className={`min-w-[13rem] bg-gradient-to-br from-blue-500 to-cyan-500 font-bold text-white text-sm overflow-y-auto ${!showNavbar ? "animate-fade-out" : "animate-fade-in"}`}>
            <ul className="p-3 space-y-3">
                <ListItem route="/home" text="Inicio" />
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
