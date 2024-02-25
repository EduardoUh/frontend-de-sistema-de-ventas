import { useCreatePurchaseStore, useUIStore } from '../../../hooks';
import { Card, DataContainer } from '../../ui';


const handleClick = (startSettingSelectedProduct, productData, startOpenUpdateModal) => {
    startSettingSelectedProduct(productData);

    startOpenUpdateModal();
}

export const CreatePurchaseShoppingCart = () => {
    const { articulos, startRemovingProduct, startSettingSelectedProduct } = useCreatePurchaseStore();
    const { startOpenUpdateModal } = useUIStore();

    return (
        <div className='overflow-auto md:w-1/2 h-96 border p-1'>
            {
                articulos.length > 0
                    ? articulos?.map(shopingCartItem =>
                    (
                        <Card key={shopingCartItem.producto} className='border'>
                            <DataContainer name='Producto' data={shopingCartItem.nombre} />
                            <DataContainer name='Venta por' data={shopingCartItem.ventaPor} />
                            <DataContainer name='Precio de compra' data={shopingCartItem.precioCompra} />
                            <DataContainer name='Precio de venta' data={shopingCartItem.precioVenta} />
                            <DataContainer name='Cantidad' data={shopingCartItem.cantidad} />
                            <DataContainer name='Total' data={shopingCartItem.total} />
                            <button
                                type="button"
                                className={`w-full rounded bg-indigo-600 text-white font-bold p-2  hover:bg-indigo-800 focus:bg-indigo-400`}
                                onClick={() => handleClick(startSettingSelectedProduct, shopingCartItem, startOpenUpdateModal)}
                            >
                                Editar
                            </button>
                            <button
                                type="button"
                                className={`w-full rounded bg-red-600 text-white font-bold p-2  hover:bg-red-800 focus:bg-red-400`}
                                onClick={() => startRemovingProduct(shopingCartItem.producto)}
                            >
                                Remover producto
                            </button>
                        </Card>
                    ))
                    : <div className='font-semibold text-xl text-center'>Carrito vac&iacute;o</div>
            }
        </div>
    )
}
