import { useEffect } from 'react';
import { useCreateSellingStore, useRecordsStorePaginationHooks, useRecordsStorePagination } from '../../../hooks';
import { PaginationContainer, CardsContainer, Card, DataContainer, Button } from '../../ui';


export const CreateSellingProductsPagination = ({ name, baseUrl, keyToGetData }) => {
    const { sucursal, startAddingProduct, articulos, successMessage } = useCreateSellingStore();
    useRecordsStorePaginationHooks(name, `${baseUrl}/${sucursal}`, keyToGetData);
    const { componentName, records, isLoading, error, pagesCanBeGenerated, page, nextPage, previousPage, startSettingRecords } = useRecordsStorePagination();

    // Logic to trigger a new request to the products in stock for the selected branch
    // took this approach to get the updated stock after creating a selling
    useEffect(() => {
        if (!!successMessage) startSettingRecords(`${baseUrl}/${sucursal}`);
    }, [successMessage]);

    if (componentName !== name) return (<></>);

    return (
        <PaginationContainer data={records} isLoading={isLoading} error={error} pagesCanBeGenerated={pagesCanBeGenerated} page={page} nextPage={nextPage} previousPage={previousPage}>
            <CardsContainer headingTag='h4' title='Artículos en existencia'>
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
                                    handleClick={() => startAddingProduct({ producto: product.id, cantidad: 0, precio: product.precio, existencia: product.existencia, nombre: product.nombre, ventaPor: product.ventaPor })}
                                />
                            }
                        </Card>
                    ))
                }
            </CardsContainer>
        </PaginationContainer>
    )
}
