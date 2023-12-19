import { useAuthStore } from '../../../hooks';


export const NavBar = () => {
    const { user } = useAuthStore();

    return (
        <div className="border-2 border-purple-600 flex justify-start items-start flex-col rounded-e-3xl p-3 space-y-3 bg-blue-900 text-slate-50 text-sm font-bold">
            {
                user.modulos.map(modulo =>
                (
                    <div key={modulo.nombre}>{modulo.nombre}</div>
                )
                )
            }
        </div>
    )
}
