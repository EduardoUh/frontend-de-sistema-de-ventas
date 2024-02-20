import { useCreatePurchaseStore } from '../../../hooks';
import { CreatePurchaseShoppingCart } from './CreatePurchaseShoppingCart';
import { CreatePurchasePaymentPanel } from './CreatePurchasePaymentPanel';
import { ShowErrorMessage, ShowErrorMessages, ShowSuccessMessage } from '../../ui';


export const CreatePurchaseShoppingCartAndPaymentPanel = () => {
    const { error, errors, successMessage } = useCreatePurchaseStore();

    return (
        <div className='border shadow-md rounded-lg'>
            <h3 className='text-center font-semibold text-2xl'>Canasta</h3>
            <div className="flex justify-center items-center">
                <ShowErrorMessages hasErrors={errors.hasErrors} errors={errors.messages} />
                <ShowErrorMessage hasError={error.hasError} error={error.message} />
                <ShowSuccessMessage successMessage={successMessage} />
            </div>
            <div className='flex flex-col md:flex-row md:justify-between p-2'>
                <CreatePurchaseShoppingCart />
                <CreatePurchasePaymentPanel />
            </div>
        </div>
    )
}
