import { useCreateSellingStore, useRecordsStorePagination } from '../../../hooks';
import { Card, DataContainer } from '../../ui';
import { InputComponent } from '../../../utilities';


export const CreateSellingShoppingCart = () => {
    const { articulos, startUpdatingProductAmount, startRemovingProduct } = useCreateSellingStore();
    const { records } = useRecordsStorePagination();

    return (
        <div className='border shadow-md rounded-lg'>
            <h3 className='text-center font-semibold text-2xl'>Canasta</h3>
            <div className='flex flex-col md:flex-row md:justify-between p-2'>
                <div className='overflow-auto md:w-1/2 h-96 border p-1'>
                    {
                        articulos.length > 0
                            ? articulos?.map(shopingCartItem => {
                                const product = records.find(record => record.id === shopingCartItem.producto);
                                return (
                                    <Card key={product.id} className='border'>
                                        <DataContainer name='Producto' data={product.nombre} />
                                        <DataContainer name='Venta por' data={product.ventaPor} />
                                        <DataContainer name='Existencia' data={product.existencia} />
                                        <DataContainer name='Precio' data={product.precio} />
                                        <InputComponent
                                            inputId={`${product.id}Amount`}
                                            inputName='cantidad'
                                            inputType='number'
                                            labelText='Cantidad'
                                            placeholder={product.ventaPor === 'KILOGRAMO' ? 0.01 : 1}
                                            step={product.ventaPor === 'KILOGRAMO' ? 0.01 : 1}
                                            min={product.ventaPor === 'KILOGRAMO' ? 0.01 : 1}
                                            acceptDecimals={product.ventaPor === 'KILOGRAMO' ? true : false}
                                            value={shopingCartItem.cantidad}
                                            handleChange={(e) => startUpdatingProductAmount({ product: product.id, amount: e.target.value })}
                                        />
                                        <button
                                            type="button"
                                            className={`w-full rounded bg-red-600 text-white font-bold p-2  hover:bg-red-800 focus:bg-red-400`}
                                            onClick={() => startRemovingProduct(product.id)}
                                        >
                                            Remover del carrito
                                        </button>
                                    </Card>
                                );
                            })
                            : <div className='font-semibold text-xl text-center'>Carrito vac&iacute;o</div>
                    }
                </div>
                <div className='border md:w-1/2 p-1'>
                    <p>Total:</p>
                    <p>Pago con:</p>
                    <p>pago:</p>
                    <p>cambio</p>
                    <p>Saldo</p>
                </div>
            </div>
        </div>
    )
}
