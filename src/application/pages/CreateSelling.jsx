import { useCreateSellingStore } from '../../hooks';
import { CreateSellingFormBranchClient, CreateSellingProductsPagination, CreateSellingShoppingCartAndPaymentPanel } from '../components/createSelling';


const baseUrl = '/stockProductos/sucursal';

const keyToGetData = 'stockProductos';

export const CreateSelling = ({ permissions, name }) => {
    const { sucursal } = useCreateSellingStore();

    if (!permissions || !Array.isArray(permissions) || Array.isArray(permissions) && permissions.length === 0) return (<div className='text-center font-bold text-3xl'>Sin credenciales en &eacute;ste m&oacute;dulo</div>)

    return (
        <div className='space-y-3'>
            <h2 className='text-center font-bold text-xl'>{name}</h2>
            <CreateSellingFormBranchClient baseUrl={baseUrl} />
            <CreateSellingShoppingCartAndPaymentPanel />
            {
                sucursal.trim().length === 24 &&
                <CreateSellingProductsPagination name={name} baseUrl={baseUrl} keyToGetData={keyToGetData} />
            }
        </div>
    )
}
