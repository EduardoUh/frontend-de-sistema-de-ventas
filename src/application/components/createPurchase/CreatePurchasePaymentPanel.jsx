import { useEffect } from 'react';
import { useCreatePurchaseStore } from '../../../hooks';
import { InputComponent } from '../../../utilities';


const calculateTotal = (items = []) => items.reduce((accumulated, current) => accumulated += (parseFloat(current.precioCompra) * (/^(?:\d+)?(?:\.\d{1,2})?$/.test(parseFloat(current.cantidad)) ? parseFloat(current.cantidad) : 0)), 0);

const handleClick = (payload, startCreatingPurchase) => {
    for (const item of payload.articulos) {
        delete item.ventaPor;
        delete item.nombre;
        delete item.total;
    }

    startCreatingPurchase(payload);
}

const startClearPayloadExceptBranch = (startClearPayloadExceptBranchAndProvider, startSettingProvider) => {
    startClearPayloadExceptBranchAndProvider();
    startSettingProvider('');
}

export const CreatePurchasePaymentPanel = () => {
    const { payload, articulos, total, isLoading, startSettingTotal, startCreatingPurchase, startClearPayloadExceptBranchAndProvider, startSettingProvider } = useCreatePurchaseStore();

    useEffect(() => {
        startSettingTotal(parseFloat((calculateTotal(articulos)).toFixed(2)));
    }, [articulos]);

    return (
        <div className='border md:w-1/2 p-1'>
            <InputComponent
                inputId='total'
                inputName='total'
                inputType='number'
                labelText='Total'
                placeholder='0.0'
                disabled={true}
                value={total}
            />
            <div className='flex flex-col sm:flex-row justify-center items-center gap-2 my-2'>
                <button
                    type="button"
                    disabled={articulos.length < 1 || isLoading}
                    className={`w-full sm:w-6/12 rounded text-white font-bold p-2 ${articulos.length < 1 || isLoading ? 'bg-indigo-300' : 'bg-indigo-600 hover:bg-indigo-800 focus:bg-indigo-400'}`}
                    onClick={() => handleClick(structuredClone(payload), startCreatingPurchase)}
                >
                    Crear compra
                </button>
                <button
                    type="button"
                    disabled={articulos.length < 1 || isLoading}
                    className={`w-full sm:w-6/12 rounded text-white font-bold p-2 ${articulos.length < 1 || isLoading ? 'bg-red-300' : 'bg-red-600 hover:bg-red-800 focus:bg-red-400'}`}
                    onClick={() => startClearPayloadExceptBranch(startClearPayloadExceptBranchAndProvider, startSettingProvider)}
                >
                    Cancelar compra
                </button>
            </div>
        </div>
    )
}
