import { useEffect } from 'react';
import { useCreateSellingStore } from '../../../hooks';
import { InputComponent } from '../../../utilities';
import { validateIfAcceptFloatingPointNumbersOrNot, calculateTotal, isValidProductsCollection, floatingPointValuesValidation } from '../../../helpers';


const handleClick = (payload = [], startSettingError, startClearError, startCreatingSelling) => {
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

    if (!floatingPointValuesValidation(payload.pagoCon) || !floatingPointValuesValidation(payload.pago)) {
        return;
    }

    for (const item of payload.articulos) {
        delete item.precio;
        delete item.existencia;
        delete item.nombre;
        delete item.ventaPor;
    }

    if (!payload.cliente) {
        delete payload.cliente;
    }

    startCreatingSelling(payload);
}

const startClearPayloadExceptBranch = (startSettingClient, startClearPayloadExceptBranchAndClient) => {
    startSettingClient('');
    startClearPayloadExceptBranchAndClient();
}

export const CreateSellingPaymentPanel = () => {
    const {
        payload, isLoading, articulos, total, pagoCon, pago, cliente, cambio, saldo,
        startSettingTotal, startSettingPagoCon, startSettingPago, startSettingCambio,
        startSettingSaldo, startSettingError, startClearError,
        startSettingClient, startClearPayloadExceptBranchAndClient,
        startCreatingSelling,
    } = useCreateSellingStore();

    useEffect(() => {
        if (articulos.length >= 0) startSettingTotal(parseFloat((calculateTotal(articulos)).toFixed(2)));
    }, [articulos]);

    useEffect(() => {
        if (cliente.trim() === '') startSettingPago(total);
    }, [total]);

    useEffect(() => {
        startSettingCambio(pagoCon - pago > 0 && total > 0 ? parseFloat((pagoCon - pago).toFixed(2)) : 0);
    }, [pago, pagoCon]);

    useEffect(() => {
        startSettingSaldo(total - pago > 0 ? parseFloat((total - pago).toFixed(2)) : 0);
    }, [total, pago]);

    useEffect(() => {
        if (articulos.length === 0) {
            startSettingTotal(0);
            startSettingPagoCon(0);
            startSettingPago(0);
            startSettingSaldo(0);
            startSettingCambio(0);
        }
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
                handleChange={e => startSettingPagoCon(parseFloat(e.target.value) ? parseFloat(e.target.value) : 0)}
                onBeforeInput={e => validateIfAcceptFloatingPointNumbersOrNot(e, true)}
                hasError={pagoCon < pago || (pagoCon > 0 && !floatingPointValuesValidation(pagoCon))}
                errorMessage={pagoCon < pago ? 'La cantidad con la que se paga no puede ser menor a la cantidad a pagar' : 'Solo se aceptan dos decimales después del punto'}
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
                handleChange={e => startSettingPago(parseFloat(e.target.value) ? parseFloat(e.target.value) : 0)}
                onBeforeInput={e => validateIfAcceptFloatingPointNumbersOrNot(e, true)}
                disabled={cliente.trim() === ''}
                hasError={pago > total || (pago > 0 && !floatingPointValuesValidation(pago))}
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
            <div className='flex flex-col sm:flex-row justify-center items-center gap-2 my-2'>
                <button
                    type="button"
                    disabled={articulos.length < 1 || isLoading}
                    className={`w-full sm:w-6/12 rounded text-white font-bold p-2 ${articulos.length < 1 || isLoading ? 'bg-indigo-300' : 'bg-indigo-600 hover:bg-indigo-800 focus:bg-indigo-400'}`}
                    onClick={() => handleClick(structuredClone(payload), startSettingError, startClearError, startCreatingSelling)}
                >
                    Crear venta
                </button>
                <button
                    type="button"
                    disabled={articulos.length < 1 || isLoading}
                    className={`w-full sm:w-6/12 rounded text-white font-bold p-2 ${articulos.length < 1 || isLoading ? 'bg-red-300' : 'bg-red-600 hover:bg-red-800 focus:bg-red-400'}`}
                    onClick={() => startClearPayloadExceptBranch(startSettingClient, startClearPayloadExceptBranchAndClient)}
                >
                    Cancelar venta
                </button>
            </div>
        </div>
    )
}
