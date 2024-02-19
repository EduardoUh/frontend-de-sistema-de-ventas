import { useCreatePurchaseStore, useRecordsStorePaginationHooks, useRecordsStorePagination, useUIStore } from '../../../hooks';
import { PaginationContainer, CardsContainer, Card, DataContainer, Button } from '../../ui';


/* 
    {
    "sucursal": "6575fffa22029109607ee3b9",
    "proveedor": "65774afbb8a2ba10834d2640",
    "articulos": [
                {
                    "producto":"65775da88dde2c511601f204",
                    "precioSinImpuesto": 10, 
                    "impuesto": 0.16,
                    "precioConImpuesto": 11.6,
                    "precioVenta": 13.6,
                    "cantidad": 100
                }
            ],
    "total": 1160
    }
*/

const handleClick = (startSettingSelectedProduct, productData, startOpenCreateModal) => {
    startSettingSelectedProduct(productData);

    startOpenCreateModal();
}

export const CreatePurchaseProductsPagination = ({ name, baseUrl, keyToGetData }) => {
    const { proveedor, articulos, startSettingSelectedProduct } = useCreatePurchaseStore();
    useRecordsStorePaginationHooks(name, `${baseUrl}?proveedor=${proveedor}`, keyToGetData);
    const { componentName, records, isLoading, error, pagesCanBeGenerated, page, nextPage, previousPage, startSettingRecords } = useRecordsStorePagination();
    const { startOpenCreateModal } = useUIStore();

    if (componentName !== name) return (<></>);

    return (
        <PaginationContainer data={records} isLoading={isLoading} error={error} pagesCanBeGenerated={pagesCanBeGenerated} page={page} nextPage={nextPage} previousPage={previousPage}>
            <CardsContainer>
                {
                    records?.map(product => (
                        <Card key={product?.id}>
                            <DataContainer name='Nombre' data={product?.nombre} />
                            <DataContainer name='Descripción' data={product?.descripcion} />
                            <DataContainer name='Venta por' data={product?.ventaPor} />
                            <DataContainer name='Estatus' data={product?.activo ? 'Activo' : 'Inactivo'} />
                            {
                                !articulos?.find(item => item?.producto === product?.id) &&
                                <Button
                                    type='button'
                                    text='Añadir a lista de compra'
                                    buttonSyles='w-full'
                                    handleClick={() => handleClick(
                                        startSettingSelectedProduct,
                                        {
                                            producto: product?.id,
                                            ventaPor: product?.ventaPor,
                                            nombre: product?.nombre,
                                            precioCompra: 0,
                                            precioVenta: 0,
                                            cantidad: 0,
                                            total: 0
                                        },
                                        startOpenCreateModal
                                    )}
                                />
                            }
                        </Card>
                    ))
                }
            </CardsContainer>
        </PaginationContainer>
    )
}
