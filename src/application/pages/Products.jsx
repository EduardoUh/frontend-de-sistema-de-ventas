import { useRecordsStorePaginationHooks } from '../../hooks';
import { ProductsPagination, ProductsFilters } from '../components/products';


const baseUrl = '/productos';

const keyToGetData = 'productos';

export const Products = ({ permissions, name }) => {
    useRecordsStorePaginationHooks(name, baseUrl, keyToGetData);

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
        </div>
    )
}
