import { useCreatePurchaseStore, useUIStore } from '../../hooks';
import { CreatePurchaseFormProviderBranch, CreatePurchaseProductsPagination, CreatePurchaseAddProductModal, CreatePurchaseUpdateProductModal, CreatePurchaseShoppingCartAndPaymentPanel } from '../components/createPurchase';


const baseUrl = '/productos';

const keyToGetData = 'productos';

export const CreatePurchase = ({ permissions, name }) => {
    const { proveedor } = useCreatePurchaseStore();
    const { createModalIsOpen, updateModalIsOpen } = useUIStore();

    if (!permissions || !Array.isArray(permissions) || Array.isArray(permissions) && permissions.length === 0) return (<div className='text-center font-bold text-3xl'>Sin credenciales en &eacute;ste m&oacute;dulo</div>)

    return (
        <div className='space-y-3'>
            <h2 className='text-center font-bold text-xl'>{name}</h2>
            <CreatePurchaseFormProviderBranch baseUrl={baseUrl} />
            <CreatePurchaseShoppingCartAndPaymentPanel />
            {
                proveedor.trim().length === 24 &&
                <CreatePurchaseProductsPagination name={name} baseUrl={baseUrl} keyToGetData={keyToGetData} />
            }
            {
                createModalIsOpen && <CreatePurchaseAddProductModal />
            }
            {
                updateModalIsOpen && <CreatePurchaseUpdateProductModal />
            }
        </div>
    )
}
