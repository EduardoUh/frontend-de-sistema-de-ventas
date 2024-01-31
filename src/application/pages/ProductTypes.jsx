import { useRecordsStorePaginationHooks, useUIStore } from '../../hooks';
import { ProductTypesPagination, ProductTypesFilters, ProductTypesUpdateForm, ProductTypesCreateButton, ProductTypesCreateForm } from '../components/productTypes';


const baseUrl = '/tiposProductos';

const keyToGetData = 'tiposProductos';

export const ProductTypes = ({ permissions, name }) => {
    useRecordsStorePaginationHooks(name, baseUrl, keyToGetData);
    const { createModalIsOpen, updateModalIsOpen } = useUIStore();

    if (!permissions || !Array.isArray(permissions) || Array.isArray(permissions) && permissions.length === 0) return (<div className='text-center font-bold text-3xl'>Sin credenciales en &eacute;ste m&oacute;dulo</div>)

    return (
        <div className='space-y-3'>
            <h2 className='text-center font-bold text-xl'>{name}</h2>
            {
                permissions.find(permission => permission === 'CREAR') &&
                <ProductTypesCreateButton />
            }
            {
                permissions.find(permission => permission === 'VER') &&
                <>
                    <ProductTypesFilters baseUrl={baseUrl} />
                    <ProductTypesPagination permissions={permissions} name={name} />
                </>
            }
            {
                createModalIsOpen &&
                <ProductTypesCreateForm baseUrl={baseUrl} />
            }
            {
                updateModalIsOpen &&
                <ProductTypesUpdateForm baseUrl={baseUrl} />
            }
        </div>
    )
}
