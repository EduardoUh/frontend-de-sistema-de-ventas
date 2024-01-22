import { useRecordsStorePagination } from '../../../hooks';
import { PaginationContainer, CardsContainer, Card, DataContainer } from '../../ui';


export const ProductTypesPagination = ({ permissions }) => {
    const { records, error, isLoading, pagesCanBeGenerated, page, nextPage, previousPage } = useRecordsStorePagination();

    return (
        <PaginationContainer data={records} isLoading={isLoading} error={error} pagesCanBeGenerated={pagesCanBeGenerated} page={page} nextPage={nextPage} previousPage={previousPage} >
            <CardsContainer>
                {
                    records?.map(productType => (
                        <Card key={productType.id}>
                            <DataContainer name='Tipo de producto' data={productType.tipoProducto} />
                            <DataContainer name='Descripción' data={productType.descripcion} />
                            <DataContainer name='Estatus' data={productType.activo ? 'Activo' : 'Inactivo'} />
                            <DataContainer name='Creador' data={productType.creador.nombres} />
                            <DataContainer name='Fecha de creación' data={productType.fechaCreacion} convertToDate={true} />
                            <DataContainer name='Ultimo en modificar' data={productType.ultimoEnModificar.nombres} />
                            <DataContainer name='Fecha de última modificación' data={productType.fechaUltimaModificacion} convertToDate={true} />
                        </Card>
                    ))
                }
            </CardsContainer>
        </PaginationContainer>
    )
}
