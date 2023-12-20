import { useAuthStore } from '../../../hooks';


export const NavBar = () => {
    const { user } = useAuthStore();

    return (
        <aside className="border-2 border-purple-600 bg-[#343a40] font-bold text-gray-200 text-sm overflow-y-auto">
            <ul className="p-3 space-y-3">
                {
                    user.modulos.map(modulo =>
                    (
                        <li key={modulo.nombre}>{modulo.nombre}</li>
                    )
                    )
                }
            </ul>
        </aside>
    )
}
