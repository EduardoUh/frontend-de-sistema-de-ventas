import { useRecordsStorePaginationHooks } from '../../hooks';
import { SellingsPagination } from '../components/sellings';


const baseUrl = '/ventas';

const ketToGetCollectionOfData = 'ventas';

export const Sellings = ({ permissions, name }) => {
    useRecordsStorePaginationHooks(name, baseUrl, ketToGetCollectionOfData);

    if (!permissions || !Array.isArray(permissions) || Array.isArray(permissions) && permissions.length === 0) return (<div className='text-center font-bold text-3xl'>Sin credenciales en &eacute;ste m&oacute;dulo</div>)

    return (
        <div className='space-y-3'>
            <h2 className='font-bold text-center text-xl'>{name}</h2>
            {
                permissions.find(permission => permission === 'VER') && <SellingsPagination name={name} permissions={permissions} />
            }
        </div>
    )
}
