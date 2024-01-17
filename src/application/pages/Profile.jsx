import { useAuthStoreUpdateProfile, useUIStore } from '../../hooks';
import { ProfileUpdateForm } from '../components/profile';
import { Card, DataContainer, Button, DisplayModules } from '../ui';


const baseUrl = '/usuarios/mi-perfil';

export const Profile = ({ permissions, name }) => {
    const { user } = useAuthStoreUpdateProfile();
    const { updateModalIsOpen, startOpenUpdateModal } = useUIStore();

    if (!permissions || !Array.isArray(permissions) || Array.isArray(permissions) && permissions.length === 0) return (<div className='text-center font-bold text-3xl'>Sin credenciales en &eacute;ste m&oacute;dulo</div>)

    return (
        <div className='space-y-3'>
            <h2 className='text-center font-bold text-xl'>{name}</h2>
            <Card cardStyles='md:w-1/2 md:mx-auto'>
                <DataContainer name='Nombres' data={user.nombres} />
                <DataContainer name='Apellido paterno' data={user.apellidoPaterno} />
                <DataContainer name='Apellido materno' data={user.apellidoMaterno} />
                <DataContainer name='Rfc' data={user.rfc} />
                <DataContainer name='Email' data={user.email} />
                <DataContainer name='direccion' data={user.direccion} />
                <DataContainer name='Teléfono' data={user.numTelefono} />
                <DataContainer name='Rol' data={user.rol} />
                {
                    user.sucursalNombre && <DataContainer name='Sucursal' data={user.sucursalNombre} />
                }
                <DisplayModules name='Módulos' modules={user.modulos} />
                <div className='flex justify-center items-center'>
                    <Button text='Actualizar perfil' type='button' handleClick={startOpenUpdateModal} />
                </div>
            </Card>
            {
                updateModalIsOpen && <ProfileUpdateForm baseUrl={baseUrl} />
            }
        </div>
    )
}
