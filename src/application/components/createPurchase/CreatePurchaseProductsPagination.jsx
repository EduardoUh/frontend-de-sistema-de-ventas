import { useCreatePurchaseStore, useRecordsStorePaginationHooks, useRecordsStorePagination, useUIStore } from '../../../hooks';
import { PaginationContainer, CardsContainer, Card, DataContainer, Button } from '../../ui';


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
