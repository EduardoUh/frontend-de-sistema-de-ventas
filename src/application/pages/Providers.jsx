import { useRecordsStorePaginationHooks } from '../../hooks';
import { ProvidersPagination, ProvidersFilters } from '../components/providers';


const baseUrl = '/proveedores';
const keyToGetCollectionOfData = 'proveedores';

export const Providers = ({ permissions, name }) => {
    useRecordsStorePaginationHooks(name, baseUrl, keyToGetCollectionOfData);

    if (!permissions || !Array.isArray(permissions) || Array.isArray(permissions) && permissions.length === 0) return (<div className='text-center font-bold text-3xl'>Sin credenciales en &eacute;ste m&oacute;dulo</div>)

    return (
        <div className='space-y-3'>
            <h2 className='text-center font-bold text-lg'>{name}</h2>
            {
                permissions.find(permission => permission === 'VER') &&
                <>
                    <ProvidersFilters baseUrl={baseUrl} />
                    <ProvidersPagination permissions={permissions} />
                </>
            }
        </div>
    )
}
