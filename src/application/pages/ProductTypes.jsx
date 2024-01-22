import { useRecordsStorePaginationHooks, useUIStore } from '../../hooks';
import { ProductTypesPagination, ProductTypesFilters, ProductTypesUpdateForm } from '../components/productTypes';


const baseUrl = '/tiposProductos';

const keyToGetData = 'tiposProductos';

export const ProductTypes = ({ permissions, name }) => {
    useRecordsStorePaginationHooks(name, baseUrl, keyToGetData);
    const { updateModalIsOpen } = useUIStore();

    if (!permissions || !Array.isArray(permissions) || Array.isArray(permissions) && permissions.length === 0) return (<div className='text-center font-bold text-3xl'>Sin credenciales en &eacute;ste m&oacute;dulo</div>)

    return (
        <div className='space-y-3'>
            <h2 className='text-center font-bold text-xl'>{name}</h2>
            {
                permissions.find(permission => permission === 'VER') &&
                <>
                    <ProductTypesFilters baseUrl={baseUrl} />
                    <ProductTypesPagination permissions={permissions} />
                </>
            }
            {
                updateModalIsOpen &&
                <ProductTypesUpdateForm baseUrl={baseUrl} />
            }
        </div>
    )
}
