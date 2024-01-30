import { useCreateSellingStore, useRecordsStorePaginationHooks, useRecordsStorePagination } from '../../../hooks';
import { PaginationContainer, CardsContainer, Card, DataContainer } from '../../ui';


const baseUrl = '/stockProductos/sucursal';

const keyToGetData = 'stockProductos';

export const CreateSellingProductsPagination = ({ name }) => {
    const { sucursal } = useCreateSellingStore();
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
                        </Card>
                    ))
                }
            </CardsContainer>
        </PaginationContainer>
    )
}
