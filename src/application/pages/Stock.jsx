import { useRecordsStorePaginationHooks, useUIStore } from '../../hooks';
import { StockPagination, StockFilters, StockUpdateForm, StockCreateButton, StockCreateForm } from '../components/stock';


const baseUrl = '/stockProductos';

const keyToGetData = 'stockProductos';

export const Stock = ({ permissions, name }) => {
    useRecordsStorePaginationHooks(name, baseUrl, keyToGetData);
    const { createModalIsOpen, updateModalIsOpen } = useUIStore();

    if (!permissions || !Array.isArray(permissions) || Array.isArray(permissions) && permissions.length === 0) return (<div className='text-center font-bold text-3xl'>Sin credenciales en &eacute;ste m&oacute;dulo</div>)

    return (
        <div className='space-y-3'>
            <h2 className='text-center font-bold text-xl'>{name}</h2>
            {
                permissions.find(permission => permission === 'CREAR') &&
                <StockCreateButton />
            }
            {
                permissions.find(permission => permission === 'VER') &&
                <>
                    <StockFilters baseUrl={baseUrl} />
                    <StockPagination permissions={permissions} name={name} />
                </>
            }
            {
                createModalIsOpen &&
                <StockCreateForm baseUrl={baseUrl} />
            }
            {
                updateModalIsOpen &&
                <StockUpdateForm baseUrl={baseUrl} />
            }
        </div>
    )
}
