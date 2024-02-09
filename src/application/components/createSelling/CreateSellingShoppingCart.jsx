import { useCreateSellingStore } from '../../../hooks';
import { Card, DataContainer } from '../../ui';
import { InputComponent } from '../../../utilities';
import { validateIfAcceptFloatingPointNumbersOrNot } from '../../../helpers';


export const CreateSellingShoppingCart = () => {
    const { articulos, startUpdatingProductAmount, startRemovingProduct } = useCreateSellingStore();

    return (
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
                                onBeforeInput={e => validateIfAcceptFloatingPointNumbersOrNot(e, shopingCartItem.ventaPor === 'KILOGRAMO')}
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
    )
}
