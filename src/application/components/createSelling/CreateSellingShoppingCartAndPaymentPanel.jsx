import { useCreateSellingStore } from '../../../hooks';
import { CreateSellingShoppingCart } from './CreateSellingShoppingCart';
import { CreateSellingPaymentPanel } from './CreateSellingPaymentPanel';
import { ShowErrorMessages, ShowErrorMessage, ShowSuccessMessage } from '../../ui';


export const CreateSellingShoppingCartAndPaymentPanel = () => {
    const { error } = useCreateSellingStore();

    return (
        <div className='border shadow-md rounded-lg'>
            <h3 className='text-center font-semibold text-2xl'>Canasta</h3>
            <ShowErrorMessage hasError={error.hasError} error={error.message} />
            <div className='flex flex-col md:flex-row md:justify-between p-2'>
                <CreateSellingShoppingCart />
                <CreateSellingPaymentPanel />
            </div>
        </div>
    )
}
