import { useCreatePurchaseStore } from '../../hooks';
import { CreatePurchaseFormProviderBranch, CreatePurchaseProductsPagination } from '../components/createPurchase';


const baseUrl = '/productos';

const keyToGetData = 'productos';

export const CreatePurchase = ({ permissions, name }) => {
    const { proveedor } = useCreatePurchaseStore();

    if (!permissions || !Array.isArray(permissions) || Array.isArray(permissions) && permissions.length === 0) return (<div className='text-center font-bold text-3xl'>Sin credenciales en &eacute;ste m&oacute;dulo</div>)

    return (
        <div className='space-y-3'>
            <h2 className='text-center font-bold text-xl'>{name}</h2>
            <CreatePurchaseFormProviderBranch baseUrl={baseUrl} />
            {
                proveedor.trim().length === 24 &&
                <CreatePurchaseProductsPagination name={name} baseUrl={baseUrl} keyToGetData={keyToGetData} />
            }
        </div>
    )
}
