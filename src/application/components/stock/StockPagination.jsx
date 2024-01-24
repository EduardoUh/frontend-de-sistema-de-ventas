import { useRecordsStorePagination } from '../../../hooks';
import { PaginationContainer, CardsContainer, Card, DataContainer } from '../../ui';


export const StockPagination = ({ permissions }) => {
    const { records, isLoading, error, pagesCanBeGenerated, page, nextPage, previousPage } = useRecordsStorePagination();

    return (
        <PaginationContainer data={records} isLoading={isLoading} error={error} pagesCanBeGenerated={pagesCanBeGenerated} page={page} nextPage={nextPage} previousPage={previousPage} >
            <CardsContainer>
                {
                    records?.map(stock => (
                        <Card key={stock.id}>
                            <DataContainer name='Sucursal' data={stock.sucursal?.nombre} />
                            <DataContainer name='Producto' data={stock.producto?.nombre} />
                            <DataContainer name='Existencia' data={stock.existencia} />
                            <DataContainer name='Precio' data={`$${stock.precio}`} />
                            <DataContainer name='Creador' data={stock.creador.nombres} />
                            <DataContainer name='Fecha de creación' data={stock.fechaCreacion} convertToDate={true} />
                            <DataContainer name='Último en modificar' data={stock.ultimoEnModificar.nombres} />
                            <DataContainer name='Fecha de última modificación' data={stock.fechaUltimaModificacion} convertToDate={true} />
                        </Card>
                    )
                    )
                }
            </CardsContainer>
        </PaginationContainer>
    )
}
