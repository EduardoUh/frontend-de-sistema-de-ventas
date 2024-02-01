import { useCreateSellingStore, useRecordsStorePaginationHooks, useRecordsStorePagination } from '../../../hooks';
import { PaginationContainer, CardsContainer, Card, DataContainer, Button } from '../../ui';


export const CreateSellingProductsPagination = ({ name, baseUrl, keyToGetData }) => {
    const { sucursal, startAddingProduct, articulos } = useCreateSellingStore();
    useRecordsStorePaginationHooks(name, `${baseUrl}/${sucursal}`, keyToGetData);
    const { records, isLoading, error, pagesCanBeGenerated, page, nextPage, previousPage } = useRecordsStorePagination();

    return (
        <PaginationContainer data={records} isLoading={isLoading} error={error} pagesCanBeGenerated={pagesCanBeGenerated} page={page} nextPage={nextPage} previousPage={previousPage}>
            <CardsContainer>
                {
                    records?.map(product => (
                        <Card key={product?.id}>
                            <DataContainer name='Nombre' data={product?.nombre} />
                            <DataContainer name='Descripción' data={product?.descripcion} />
                            <DataContainer name='Venta por' data={product?.ventaPor} />
                            <DataContainer name='Existencia' data={product?.existencia} />
                            <DataContainer name='Precio' data={product?.precio} />
                            {
                                !articulos?.find(item => item?.producto === product?.id) &&
                                <Button
                                    text='Añadir a canasta'
                                    type='button'
                                    buttonSyles='w-full'
                                    handleClick={() => startAddingProduct({ producto: product.id, cantidad: 0 })}
                                />
                            }
                        </Card>
                    ))
                }
            </CardsContainer>
        </PaginationContainer>
    )
}
