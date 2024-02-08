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
    const { articulos, total, pagoCon, startUpdatingProductAmount, startRemovingProduct, startSettingTotal } = useCreateSellingStore();

    useEffect(() => {
        if (articulos.length >= 0) startSettingTotal(calculateTotal(articulos));
    }, [articulos]);

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
                                        handleChange={e => startUpdatingProductAmount({ product: shopingCartItem.producto, amount: parseFloat(e.target.value) })}
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
                    {/* <InputComponent
                        inputId='pagoCon'
                        inputName='pagoCon'
                        inputType='number'
                        labelText='Pago con'
                        placeholder='0.0'
                        step={0.01}
                        acceptDecimals={true}
                        value={pagoCon}
                        handleChange={ }
                    /> */}
                    {/* <InputComponent>Pago con:
                    <InputComponent>pago:
                    <InputComponent>cambio
                    <InputComponent>Saldo */}
                </div>
            </div>
        </div>
    )
}
