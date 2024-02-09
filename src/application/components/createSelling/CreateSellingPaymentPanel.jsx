import { useEffect } from 'react';
import { useCreateSellingStore } from '../../../hooks';
import { InputComponent } from '../../../utilities';
import { validateIfAcceptFloatingPointNumbersOrNot, calculateTotal } from '../../../helpers';


export const CreateSellingPaymentPanel = () => {
    const { articulos, total, pagoCon, pago, cliente, cambio, saldo, startSettingTotal, startSettingPagoCon, startSettingPago, startSettingCambio, startSettingSaldo } = useCreateSellingStore();

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
        </div>
    )
}
