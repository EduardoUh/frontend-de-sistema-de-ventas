import { useRecordsStorePaginationHooks, useUIStore } from '../../hooks';
import { UsersPagination, UsersFilters, UsersCreateButton, UsersCreateForm, UsersUpdateForm } from '../components/users';


const baseUrl = '/usuarios';

const keyToGetCollectionOfData = 'usuarios';

export const Users = ({ permissions, name }) => {
    useRecordsStorePaginationHooks(name, baseUrl, keyToGetCollectionOfData);
    const { createModalIsOpen, updateModalIsOpen } = useUIStore();

    if (!permissions || !Array.isArray(permissions) || Array.isArray(permissions) && permissions.length === 0) return (<div className='text-center font-bold text-3xl'>Sin credenciales en &eacute;ste m&oacute;dulo</div>)

    return (
        <div className='space-y-3'>
            <h2 className='text-center font-bold text-xl'>{name}</h2>
            {
                permissions.find(permission => permission === 'CREAR') &&
                <UsersCreateButton />
            }
            {
                permissions.find(permission => permission === 'VER') &&
                <>
                    <UsersFilters baseUrl={baseUrl} />
                    <UsersPagination permissions={permissions} name={name} />
                </>
            }
            {
                createModalIsOpen && <UsersCreateForm baseUrl={baseUrl} />
            }
            {
                updateModalIsOpen && <UsersUpdateForm baseUrl={baseUrl} />
            }
        </div>
    )
}
