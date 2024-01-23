import { useRecordsStorePagination } from '../../../hooks';
import { PaginationContainer, CardsContainer, Card, DataContainer } from '../../ui';


export const ProductsPagination = ({ permissions }) => {
    const { records, isLoading, error, pagesCanBeGenerated, page, nextPage, previousPage } = useRecordsStorePagination();

    return (
        <PaginationContainer data={records} isLoading={isLoading} error={error} pagesCanBeGenerated={pagesCanBeGenerated} page={page} nextPage={nextPage} previousPage={previousPage}>
            <CardsContainer>
                {
                    records?.map(product => (
                        <Card key={product.id}>
                            <DataContainer name='Nombre' data={product.nombre} />
                            <DataContainer name='Descripción' data={product.descripcion} />
                            <DataContainer name='Tipo de producto' data={product.tipoProducto?.tipoProducto} />
                            <DataContainer name='Proveedor' data={product.proveedor?.nombre} />
                            <DataContainer name='Venta por' data={product.ventaPor} />
                            <DataContainer name='Creador' data={product.creador?.nombres} />
                            <DataContainer name='Fecha de creación' data={product.fechaCreacion} convertToDate={true} />
                            <DataContainer name='Último en modificar' data={product.ultimoEnModificar?.nombres} />
                            <DataContainer name='Fecha de última modificación' data={product.fechaUltimaModificacion} />
                        </Card>
                    ))
                }
            </CardsContainer>
        </PaginationContainer>
    )
}
