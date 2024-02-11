import { useCreateSellingStore } from '../../../hooks';
import { CreateSellingShoppingCart } from './CreateSellingShoppingCart';
import { CreateSellingPaymentPanel } from './CreateSellingPaymentPanel';
import { ShowErrorMessages, ShowErrorMessage, ShowSuccessMessage } from '../../ui';


export const CreateSellingShoppingCartAndPaymentPanel = () => {
    const { error, errors, successMessage } = useCreateSellingStore();

    return (
        <div className='border shadow-md rounded-lg'>
            <h3 className='text-center font-semibold text-2xl'>Canasta</h3>
            <div className="w-5/6">
                <ShowErrorMessages hasErrors={errors.hasErrors} errors={errors.messages} />
                <ShowErrorMessage hasError={error.hasError} error={error.message} />
                <ShowSuccessMessage successMessage={successMessage} />
            </div>
            <div className='flex flex-col md:flex-row md:justify-between p-2'>
                <CreateSellingShoppingCart />
                <CreateSellingPaymentPanel />
            </div>
        </div>
    )
}
