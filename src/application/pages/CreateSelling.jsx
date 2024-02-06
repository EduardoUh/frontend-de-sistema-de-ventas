import { useCreateSellingStore } from '../../hooks';
import { CreateSellingFormBranchClient, CreateSellingProductsPagination, CreateSellingShoppingCart } from '../components/createSelling';

/*
    {
    "sucursal": "6574b2c69c25e03e7ed43f51",
    "cliente": "657774be8a71541208f0a05b",
    "articulos": [{"producto": "65775da88dde2c511601f204", "cantidad": 3}],
    "total": 31.5,
    "pagoCon": 0,
    "pago": 0,
    "cambio": 0,
    "saldo": 31.5
}
*/
const baseUrl = '/stockProductos/sucursal';

const keyToGetData = 'stockProductos';

export const CreateSelling = ({ permissions, name }) => {
    const { sucursal } = useCreateSellingStore();

    if (!permissions || !Array.isArray(permissions) || Array.isArray(permissions) && permissions.length === 0) return (<div className='text-center font-bold text-3xl'>Sin credenciales en &eacute;ste m&oacute;dulo</div>)

    return (
        <div className='space-y-3'>
            <h2 className='text-center font-bold text-xl'>{name}</h2>
            <CreateSellingFormBranchClient baseUrl={baseUrl} />
            <CreateSellingShoppingCart />
            {
                sucursal.trim().length === 24 &&
                <CreateSellingProductsPagination name={name} baseUrl={baseUrl} keyToGetData={keyToGetData} />
            }
        </div>
    )
}
