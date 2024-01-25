import { useRecordsStorePaginationHooks, useUIStore } from '../../hooks';
import { ProductsPagination, ProductsFilters, ProductsUpdateForm, ProductsCreateButton, ProductsCreateForm } from '../components/products';


const baseUrl = '/productos';

const keyToGetData = 'productos';

export const Products = ({ permissions, name }) => {
    useRecordsStorePaginationHooks(name, baseUrl, keyToGetData);
    const { createModalIsOpen, updateModalIsOpen } = useUIStore();

    if (!permissions || !Array.isArray(permissions) || Array.isArray(permissions) && permissions.length === 0) return (<div className='text-center font-bold text-3xl'>Sin credenciales en &eacute;ste m&oacute;dulo</div>)

    return (
        <div className='space-y-3'>
            <h2 className='text-center font-bold text-xl'>{name}</h2>
            {
                permissions.find(permission => permission === 'CREAR') &&
                <ProductsCreateButton />
            }
            {
                permissions.find(permission => permission === 'VER') &&
                <>
                    <ProductsFilters baseUrl={baseUrl} />
                    <ProductsPagination permissions={permissions} />
                </>
            }
            {
                createModalIsOpen &&
                <ProductsCreateForm baseUrl={baseUrl} />
            }
            {
                updateModalIsOpen &&
                <ProductsUpdateForm baseUrl={baseUrl} />
            }
        </div>
    )
}
