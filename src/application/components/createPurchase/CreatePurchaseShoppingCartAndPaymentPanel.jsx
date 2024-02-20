import { CreatePurchaseShoppingCart } from './CreatePurchaseShoppingCart';


export const CreatePurchaseShoppingCartAndPaymentPanel = () => {
    return (
        <div className='border shadow-md rounded-lg'>
            <h3 className='text-center font-semibold text-2xl'>Canasta</h3>
            <div className='flex flex-col md:flex-row md:justify-between p-2'>
                <CreatePurchaseShoppingCart />
            </div>
        </div>
    )
}
