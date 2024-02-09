import { useEffect } from 'react';
import { useCreateSellingStore } from '../../../hooks';
import { InputComponent } from '../../../utilities';
import { validateIfAcceptFloatingPointNumbersOrNot, calculateTotal, isValidProductsCollection } from '../../../helpers';


const handleClick = (payload = [], startSettingError, startClearError) => {
    if (!isValidProductsCollection(payload.articulos)) {
        startSettingError('Error en la cantidad de piezas o kilogramos');
        setTimeout(() => {
            startClearError();
        }, 5000);
        return;
    }

    if (!payload.cliente && payload.pagoCon < payload.total) {
        startSettingError('La cantidad con la que se paga no puede ser menor al total de la compra');
        setTimeout(() => {
            startClearError();
        }, 5000);
        return;
    }

    if (!payload.cliente && payload.pago < payload.total) {
        startSettingError('La cantidad a pagar no puede ser menor al total de la compra');
        setTimeout(() => {
            startClearError();
        }, 5000);
        return;
    }

    if (payload.cliente && payload.pagoCon < payload.pago) {
        startSettingError('La cantidad con la que se paga no puede ser menor a la cantidad a pagar');
        setTimeout(() => {
            startClearError();
        }, 5000);
        return;
    }

    if (payload.cliente && payload.total < payload.pago) {
        startSettingError('La cantidad a pagar no puede ser mayor al total');
        setTimeout(() => {
            startClearError();
        }, 5000);
        return;
    }

    console.log(payload);
}

export const CreateSellingPaymentPanel = () => {
    const {
        payload, isLoading, articulos, total, pagoCon, pago, cliente, cambio, saldo,
        startSettingTotal, startSettingPagoCon, startSettingPago, startSettingCambio,
        startSettingSaldo, startSettingError, startClearError
    } = useCreateSellingStore();

    useEffect(() => {
        if (articulos.length >= 0) startSettingTotal(calculateTotal(articulos));
    }, [articulos]);

    useEffect(() => {
        if (cliente.trim() === '') startSettingPago(total);
    }, [total]);

    useEffect(() => {
        startSettingCambio(pagoCon - pago > 0 ? pagoCon - pago : 0);
    }, [pago, pagoCon]);

    useEffect(() => {
        startSettingSaldo(total - pago > 0 ? total - pago : 0);
    });

    useEffect(() => {
        if (articulos.length === 0) {
            startSettingTotal(0);
            startSettingPagoCon(0);
            startSettingPago(0);
            startSettingSaldo(0);
            startSettingCambio(0);
        }
    });

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
            <InputComponent
                inputId='pagoCon'
                inputName='pagoCon'
                inputType='number'
                labelText='Paga con la cantidad'
                placeholder='0.0'
                step={0.01}
                min={cliente.trim() === '' ? total : 0}
                acceptDecimals={true}
                value={pagoCon}
                handleChange={e => startSettingPagoCon(/^(?:\d+)?(?:\.\d{1,2})?$/.test(parseFloat(e.target.value)) ? parseFloat(e.target.value) : 0)}
                onBeforeInput={e => validateIfAcceptFloatingPointNumbersOrNot(e, true)}
                hasError={pagoCon < pago}
                errorMessage='La cantidad con la que se paga no puede ser menor a la cantidad a pagar'
            />
            <InputComponent
                inputId='pago'
                inputName='pago'
                inputType='number'
                labelText='Paga la cantidad de'
                placeholder='0.0'
                step={0.01}
                min={cliente.trim() === '' ? total : 0}
                acceptDecimals={true}
                value={pago}
                handleChange={e => startSettingPago(/^(?:\d+)?(?:\.\d{1,2})?$/.test(parseFloat(e.target.value)) ? parseFloat(e.target.value) : 0)}
                onBeforeInput={e => validateIfAcceptFloatingPointNumbersOrNot(e, true)}
                disabled={cliente.trim() === ''}
                hasError={pago > total}
                errorMessage='La cantidad a pagar no puede ser mayor al total'
            />
            <InputComponent
                inputId='cambio'
                inputName='cambio'
                inputType='number'
                labelText='Cambio'
                placeholder='0.0'
                step={0.01}
                min={0}
                acceptDecimals={true}
                value={cambio}
                handleChange={() => { }}
                disabled={true}
            />
            <InputComponent
                inputId='saldo'
                inputName='saldo'
                inputType='number'
                labelText='Saldo'
                placeholder='0.0'
                step={0.01}
                min={0}
                acceptDecimals={true}
                value={saldo}
                handleChange={() => { }}
                disabled={true}
            />
            <div className='flex justify-center items-center my-2'>
                <button
                    type="button"
                    disabled={articulos.length < 1 || isLoading}
                    className={`w-4/5 sm:w-1/3 rounded text-white font-bold p-2 ${articulos.length < 1 || isLoading ? 'bg-indigo-300' : 'bg-indigo-600 hover:bg-indigo-800 focus:bg-indigo-400'}`}
                    onClick={() => handleClick(payload, startSettingError, startClearError)}
                >
                    Crear venta
                </button>
            </div>
        </div>
    )
}
