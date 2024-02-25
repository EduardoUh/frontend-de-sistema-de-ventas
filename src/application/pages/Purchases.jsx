import { useRecordsStorePaginationHooks, useUIStore } from '../../hooks';
import { PurchasesPagination, PurchasesDisplayItems, PurchasesFilters } from '../components/purchases';


const baseUrl = '/compras';

const keyToGetData = 'compras';

export const Purchases = ({ permissions, name }) => {
    useRecordsStorePaginationHooks(name, baseUrl, keyToGetData);
    const { showMoreModalIsOpen } = useUIStore();

    if (!permissions || !Array.isArray(permissions) || Array.isArray(permissions) && permissions.length === 0) return (<div className='text-center font-bold text-3xl'>Sin credenciales en &eacute;ste m&oacute;dulo</div>)

    return (
        <div className='space-y-3'>
            <h2 className='text-center font-bold text-xl'>{name}</h2>
            {
                permissions.find(permission => permission === 'VER') &&
                <>
                    <PurchasesFilters baseUrl={baseUrl} />
                    <PurchasesPagination name={name} />
                </>
            }
            {
                showMoreModalIsOpen && <PurchasesDisplayItems />
            }
        </div>
    )
}
