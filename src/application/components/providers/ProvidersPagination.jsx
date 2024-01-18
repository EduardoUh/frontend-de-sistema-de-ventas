import { useRecordsStorePagination } from '../../../hooks';
import { PaginationContainer, CardsContainer, Card, DataContainer } from '../../ui';


export const ProvidersPagination = ({ permissions }) => {
    const { records, isLoading, error, pagesCanBeGenerated, page, nextPage, previousPage } = useRecordsStorePagination();

    return (
        <PaginationContainer data={records} isLoading={isLoading} error={error} pagesCanBeGenerated={pagesCanBeGenerated} page={page} nextPage={nextPage} previousPage={previousPage}>
            <CardsContainer>
                {
                    records?.map(provider => (
                        <Card key={provider.id}>
                            <DataContainer name='Nombre' data={provider.nombre} />
                            <DataContainer name='Dirección' data={provider.direccion} />
                            <DataContainer name='Teléfono' data={provider.numTelefono} />
                            <DataContainer name='Email' data={provider.email} />
                            <DataContainer name='Rfc' data={provider.rfc} />
                            <DataContainer name='Estatus' data={provider.activo ? 'Activo' : 'Inactivo'} />
                            <DataContainer name='Creador' data={provider.creador.nombres} />
                            <DataContainer name='Fecha de creación' data={provider.fechaCreacion} convertToDate={true} />
                            <DataContainer name='Último en modificar' data={provider.ultimoEnModificar.nombres} />
                            <DataContainer name='Fecha de última modificación' data={provider.fechaUltimaModificacion} convertToDate={true} />
                        </Card>
                    ))
                }
            </CardsContainer>
        </PaginationContainer>
    )
}
