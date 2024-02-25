import { Link } from 'react-router-dom';
import { useAuthStore } from '../../hooks';
import { CardsContainer, Card } from '../ui';


export const Home = () => {
    const { user } = useAuthStore();

    return (
        <div className="space-y-3">
            <h2 className="text-center font-bold text-lg">
                Bienvenido al sistema
            </h2>
            <Card cardStyles='md:w-1/2 md:mx-auto mt-4 shadow-lg'>
                <h3 className="text-center font-bold">
                    Info del usuario
                </h3>
                <p>
                    <span className="font-bold">Nombre:</span> {user.nombres}
                </p>
                <p>
                    <span className="font-bold">Apellido Paterno:</span> {user.apellidoPaterno}
                </p>
                <p>
                    <span className="font-bold">Apellido Materno:</span> {user.apellidoMaterno}
                </p>
                <p>
                    <span className="font-bold">Rol:</span>  {user.rol}
                </p>
            </Card>
            <CardsContainer title='Módulos del usuario' headingTag='h4'>
                {
                    user.modulos.map(modulo => (
                        <Card key={modulo.nombre} cardStyles='flex flex-col justify-center items-center transition duration-500 ease-in-out hover:scale-105'>
                            <p className="font-semibold text-center">{modulo.nombre}</p>
                            <Link className="hover:text-blue-600" to={modulo.ruta}>ir</Link>
                        </Card>
                    ))
                }
            </CardsContainer>
        </div>
    )
}
