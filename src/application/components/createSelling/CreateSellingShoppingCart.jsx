import { useCreateSellingStore } from '../../../hooks';
import { Card, DataContainer } from '../../ui';
import { InputComponent } from '../../../utilities';
import { useEffect } from 'react';


const calculateTotal = (shoppingCartItems = []) => shoppingCartItems.reduce((accumulated, current) => accumulated += (parseFloat(current.precio) * (/^(?:\d+)?(?:\.\d{1,2})?$/.test(parseFloat(current.cantidad)) ? parseFloat(current.cantidad) : 0)), 0);

const handleBeforeInput = (e, acceptDecimals) => {
    if (acceptDecimals && !/^\d*$/.test(e.data) && e.data !== '.') {
        e.preventDefault();
    }
    if (!acceptDecimals && !/^\d*$/.test(e.data)) {
        e.preventDefault();
    }
}

export const CreateSellingShoppingCart = () => {
    const { articulos, total, pagoCon, pago, cliente, cambio, saldo, startUpdatingProductAmount, startRemovingProduct, startSettingTotal, startSettingPagoCon, startSettingPago, startSettingCambio, startSettingSaldo } = useCreateSellingStore();

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

    return (
        <div className='border shadow-md rounded-lg'>
            <h3 className='text-center font-semibold text-2xl'>Canasta</h3>
            <div className='flex flex-col md:flex-row md:justify-between p-2'>
                <div className='overflow-auto md:w-1/2 h-96 border p-1'>
                    {
                        articulos.length > 0
                            ? articulos?.map(shopingCartItem =>
                            (
                                <Card key={shopingCartItem.producto} className='border'>
                                    <DataContainer name='Producto' data={shopingCartItem.nombre} />
                                    <DataContainer name='Venta por' data={shopingCartItem.ventaPor} />
                                    <DataContainer name='Existencia' data={shopingCartItem.existencia} />
                                    <DataContainer name='Precio' data={shopingCartItem.precio} />
                                    <InputComponent
                                        inputId={`${shopingCartItem.producto}Amount`}
                                        inputName='cantidad'
                                        inputType='number'
                                        labelText='Cantidad'
                                        placeholder={shopingCartItem.ventaPor === 'KILOGRAMO' ? 0.01 : 1}
                                        step={shopingCartItem.ventaPor === 'KILOGRAMO' ? 0.01 : 1}
                                        min={shopingCartItem.ventaPor === 'KILOGRAMO' ? 0.01 : 1}
                                        acceptDecimals={shopingCartItem.ventaPor === 'KILOGRAMO' ? true : false}
                                        value={shopingCartItem.cantidad}
                                        handleChange={e => startUpdatingProductAmount({ product: shopingCartItem.producto, amount: /^(?:\d+)?(?:\.\d{1,2})?$/.test(parseFloat(e.target.value)) ? parseFloat(e.target.value) : 0 })}
                                        onBeforeInput={e => handleBeforeInput(e, shopingCartItem.ventaPor === 'KILOGRAMO')}
                                        hasError={shopingCartItem.cantidad > shopingCartItem.existencia}
                                        errorMessage='La cantidad no puede exceder a la existencia'
                                    />
                                    <button
                                        type="button"
                                        className={`w-full rounded bg-red-600 text-white font-bold p-2  hover:bg-red-800 focus:bg-red-400`}
                                        onClick={() => startRemovingProduct(shopingCartItem.producto)}
                                    >
                                        Remover del carrito
                                    </button>
                                </Card>
                            ))
                            : <div className='font-semibold text-xl text-center'>Carrito vac&iacute;o</div>
                    }
                </div>
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
                        onBeforeInput={e => handleBeforeInput(e, true)}
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
                        onBeforeInput={e => handleBeforeInput(e, true)}
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
            </div>
        </div>
    )
}
