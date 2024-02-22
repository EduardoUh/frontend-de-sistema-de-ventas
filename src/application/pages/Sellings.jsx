import { useRecordsStorePaginationHooks, useUIStore } from '../../hooks';
import { SellingsPagination, SellingsSeeMoreModal, SellingsFilters, SellingsCreatePaymentModal } from '../components/sellings';


const baseUrl = '/ventas';

const keyToGetCollectionOfData = 'ventas';

export const Sellings = ({ permissions, name }) => {
    useRecordsStorePaginationHooks(name, baseUrl, keyToGetCollectionOfData);
    const { showMoreModalIsOpen, createModalIsOpen } = useUIStore();

    if (!permissions || !Array.isArray(permissions) || Array.isArray(permissions) && permissions.length === 0) return (<div className='text-center font-bold text-3xl'>Sin credenciales en &eacute;ste m&oacute;dulo</div>)

    return (
        <div className='space-y-3'>
            <h2 className='font-bold text-center text-xl'>{name}</h2>
            {
                permissions.find(permission => permission === 'VER') &&
                <>
                    <SellingsFilters baseUrl={baseUrl} />
                    <SellingsPagination name={name} permissions={permissions} />
                </>
            }
            {
                createModalIsOpen && <SellingsCreatePaymentModal />
            }
            {
                showMoreModalIsOpen && <SellingsSeeMoreModal permissions={permissions} />
            }
        </div>
    )
}
