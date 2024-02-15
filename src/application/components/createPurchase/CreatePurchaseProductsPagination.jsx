import { useCreatePurchaseStore, useRecordsStorePaginationHooks, useRecordsStorePagination } from '../../../hooks';
import { PaginationContainer, CardsContainer, Card, DataContainer, Button } from '../../ui';


export const CreatePurchaseProductsPagination = ({ name, baseUrl, keyToGetData }) => {
    const { proveedor, articulos } = useCreatePurchaseStore();
    useRecordsStorePaginationHooks(name, `${baseUrl}?proveedor=${proveedor}`, keyToGetData);
    const { componentName, records, isLoading, error, pagesCanBeGenerated, page, nextPage, previousPage, startSettingRecords } = useRecordsStorePagination();

    if (componentName !== name) return (<></>);

    return (
        <PaginationContainer data={records} isLoading={isLoading} error={error} pagesCanBeGenerated={pagesCanBeGenerated} page={page} nextPage={nextPage} previousPage={previousPage}>
            <CardsContainer>
                {
                    records?.map(product => (
                        <Card key={product.id}>
                            <DataContainer name='Nombre' data={product?.nombre} />
                            <DataContainer name='Descripción' data={product?.descripcion} />
                            <DataContainer name='Venta por' data={product?.ventaPor} />
                            <DataContainer name='Estatus' data={product?.activo ? 'Activo' : 'Inactivo'} />
                        </Card>
                    ))
                }
            </CardsContainer>
        </PaginationContainer>
    )
}
