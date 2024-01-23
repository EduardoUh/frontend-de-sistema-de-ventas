import { useRecordsStorePaginationHooks, useUIStore } from '../../hooks';
import { ProductsPagination, ProductsFilters, ProductsUpdateForm } from '../components/products';


const baseUrl = '/productos';

const keyToGetData = 'productos';

export const Products = ({ permissions, name }) => {
    useRecordsStorePaginationHooks(name, baseUrl, keyToGetData);
    const { updateModalIsOpen } = useUIStore();

    return (
        <div className='space-y-3'>
            <h2 className='text-center font-bold text-xl'>{name}</h2>
            {
                permissions.find(permission => permission === 'VER') &&
                <>
                    <ProductsFilters baseUrl={baseUrl} />
                    <ProductsPagination permissions={permissions} />
                </>
            }
            {
                updateModalIsOpen &&
                <ProductsUpdateForm baseUrl={baseUrl} />
            }
        </div>
    )
}
